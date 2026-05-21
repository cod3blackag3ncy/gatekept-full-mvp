# Gatekept Video Upload System

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Client    │────▶│  Cloudflare  │────▶│   R2/S3     │
│  Recorder   │     │    Stream    │     │   Storage   │
└─────────────┘     └──────────────┘     └─────────────┘
       │                                            │
       │                                            │
       ▼                                            ▼
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   API       │────▶│   Webhook    │────▶│  Database   │
│   Server    │     │  Processing  │     │   (Prisma)  │
└─────────────┘     └──────────────┘     └─────────────┘
```

## Components

### 1. Client-side Video Recorder
- Native MediaRecorder API
- Constraints: max 30 seconds, vertical orientation
- Real-time preview
- Retake capability

### 2. Video Upload Service
- Signed URL generation
- Direct-to-R2 upload (bypass server)
- Progress tracking
- Chunked upload for reliability

### 3. Video Processing
- Cloudflare Stream (adaptive bitrate)
- Thumbnail generation
- Webhook on completion
- Video metadata extraction

### 4. Storage & Lifecycle
- R2 bucket with lifecycle rules
- 72-hour auto-delete for messages
- Quarantine folder for reports
- CDN distribution

## Environment Variables

```bash
# Cloudflare
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_API_TOKEN=
R2_BUCKET_NAME=gatekept-videos
R2_PUBLIC_URL=https://videos.gatekept.app

# Cloudflare Stream (optional - for adaptive bitrate)
STREAM_API_TOKEN=

# Database
DATABASE_URL=
```

## API Endpoints

```
POST /api/videos/upload-url
- Generate signed URL for direct upload
- Returns: { uploadURL, videoId }

POST /api/videos/webhook
- Cloudflare webhook callback
- Updates video status in database

POST /api/videos/confirm
- Confirm upload complete
- Creates video record in DB

DELETE /api/videos/:id
- Delete video (owner only)
- Soft delete for reports
```

## Video Constraints

- **Duration:** 15-30 seconds for profiles, 10-15 for messages
- **Resolution:** Vertical 9:16 (1080x1920 max)
- **Format:** MP4 (H.264)
- **Size:** Max 50MB
- **Orientation:** Portrait only

## Security

- Signed URLs expire in 1 hour
- Rate limiting: 10 uploads/hour per user
- Content-type validation
- Virus scanning (optional via ClamAV)

## 72-Hour Auto-Delete

```sql
-- Lifecycle rule for message videos
CREATE EVENT delete_expired_videos
ON SCHEDULE EVERY 1 HOUR
DO
  DELETE FROM videos 
  WHERE type = 'message' 
  AND created_at < NOW() - INTERVAL 72 HOUR
  AND is_reported = false;
```

## Quarantine System

When a video is reported:
1. Set `is_reported = true`
2. Copy to `/quarantine/` folder
3. Skip lifecycle deletion
4. Alert moderators
5. Review within 24 hours

## Implementation Status

- [x] Architecture design
- [ ] Client recorder component
- [ ] Upload URL generation
- [ ] Webhook handler
- [ ] Database schema
- [ ] Lifecycle rules
- [ ] Quarantine system
- [ ] Content moderation
