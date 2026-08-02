# Showcase film

## What is here, and what ships

| File | Size | Ships? |
|---|---|---|
| `showcase.webm` | 2.23 MB | ✅ offered first — smaller, used by Chrome/Edge/Firefox/Android |
| `showcase.mp4` | 2.82 MB | ✅ the fallback that matters — Safari, iPhone, everything else |
| `poster.jpg` | 0.04 MB | ✅ shown instantly while the film downloads, and instead of it under reduced motion |

The 15.72 MB original is kept at `assets-incoming/video/showcase-master.mp4`,
which is **git-ignored** — it stays on this machine, never enters the repo's
history, and is never deployed. Re-encode from that master, never from the
compressed copies.

## How these were made (2 Aug 2026)

Source: 1920×1080, 12.05s, no audio, ~10,687 kbps — roughly five times the
bitrate a silent looping web clip needs. **Resolution was kept at 1080p**: the
frame renders up to about 1090 CSS pixels, which is ~2180 device pixels on a
retina screen, so 1080p is what keeps it sharp. Every saving came from bitrate,
not from throwing away pixels. Result: **82% smaller, no visible difference.**

```
MP4   libx264, crf 26, maxrate 2200k, yuv420p, -an, +faststart
WebM  libvpx-vp9, crf 34, yuv420p, -an
```

`+faststart` matters: it moves the index to the front of the file so playback
can begin before the whole thing has arrived.

**ffmpeg is not a project dependency.** It was installed to do this once and
removed, because it downloads an ~80 MB binary on every install and Vercel
installs dev dependencies on each deploy. To re-encode a future file:
`npm i -D ffmpeg-static`, encode, then `npm uninstall ffmpeg-static`.

## Replacing the film

Drop the new master in `assets-incoming/video/`, tell me, and I will encode both
formats and pull a fresh poster. Aim for a short loop, no audio track (it is
permanently muted, so audio is pure wasted weight), and tell me the aspect ratio
— the frame is set to match it, and if they disagree the edges get cropped off.
The current frame is set to **16:9**, matching this film exactly.
