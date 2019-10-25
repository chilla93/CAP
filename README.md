# CAP

I want to create gifs* This is an excuse to create a custom solution for that.  This is a simple console application that allows me to capture your screen content and convert it to a video or gif. It is a NodeJS application built on top of the powerful ffmpeg library.

**Obscure letterkeny gifs, to be specific, are lacking in Giphy at the time of this creation, and they are wonderful works of expression*

# Table of Contents
- [CAP](#cap)
- [Table of Contents](#table-of-contents)
- [Project definitions](#project-definitions)
- [Options](#options)

# Project definitions

To create short and quick shareable content.

- screen capture/recording
- define recorded screen real estate
- no audio support.
- 1080p max video resolution output
- under 1mb gif size for 10 seconds?
- focus on mobile-supported video codec
- application needs to work as a standalone. (no system dependencies)
- support multiple screens
- support timers (delay start time)

# Options

The application user defined options when creating/capturing content

- output folder location (or use default location)
- video (webm/hx264) or gif
- resolution (low, medium, high).
  - defined by file size, or resolution size. (will be defined by the resolution of the content at first)
- define start time offset
- define duration