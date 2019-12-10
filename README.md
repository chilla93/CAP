# CAP

I want to create gifs* This is an excuse to create a custom solution for that.  This is a simple console application that allows me to capture your screen content and convert it to a video or gif. It is a NodeJS application built on top of the powerful ffmpeg library.

**Obscure letterkeny gifs, to be specific, are lacking in Giphy at the time of this creation, and they are wonderful works of expression*

# Table of Contents
- [CAP](#cap)
- [Table of Contents](#table-of-contents)
- [Project definitions](#project-definitions)
- [Options](#options)
- [Good to remember](#good-to-remember)
- [FFMPEG](#ffmpeg)
  - [Commands](#commands)
    - [Example 1: General Recording](#example-1-general-recording)
    - [Example 2: Encoding livestream to an output using a constant bitrate](#example-2-encoding-livestream-to-an-output-using-a-constant-bitrate)
  - [H.264 Encoding](#h264-encoding)
    - [Rate Control](#rate-control)
      - [Constant Rate Factor](#constant-rate-factor)
      - [Two-pass ABR](#two-pass-abr)

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

# Good to remember

- in order to have correct filesystem permissions to run the file directly, run `chmod +x bin/cap` or `chmod u+x bin/cap`, if you would like it to be user specific

# FFMPEG

## Commands

### Example 1: General Recording

```bash
$ ffmpeg -y -f avfoundation -i "1:0" -vcodec libx264 -preset fast -pix_fmt yuv420p -crf 17 -r 30 out.mp4
```

Use avfoundation to capture video device with index 1 and audio device of index 0. Use the video encoding tool libx264. preset fast with a control rate factor of 17. control framerate output framerate at 30fps.

### Example 2: Encoding livestream to an output using a constant bitrate

```bash
$ ffmpeg -y -f avfoundation -i "1:0" -vcodec libx264 -preset fast -pix_fmt yuv420p -r 30 -b:v 1500k -bufsize 1500k -maxrate 7000k out.mp4
```

## H.264 Encoding

### Rate Control

Rate control decides how many bits will be used for each frame. This will determine the file size and also how quality is distributed. There are 2 options:

#### Constant Rate Factor
Attempts to achieve and maintain a certain output quality level.
Disadvantage with this method is the size of the output can not be controlled. Not ideal for streaming content

- CRF Value
0 - 51. 0 is lossless. 23 default. 51 is the worst quality possible.

subjectively sane range is 17–28. 

Consider 17 or 18 to be visually lossless or nearly so; it should look the same or nearly the same as the input but it isn't technically lossless.

The range is exponential. +6 results in roughly 0.5x the bitrate, while -6 leads to roughly 2x the bitrate.

- Preset

Preset => collection of encoding speed to compression ratio. compression => quality/filesize. 
if you want certain filesize/bitrate, use slower preset.

Presets (some) in descending order of speeds `ultrafast, superfast, veryfast, faster, fast, medium (default), slower, slow, veryslow, placebo`

- Tune

Used to state the expected input type. Useful for increasing encoding effeciency. Few Examples:
    - film |  use for high quality movie content; lowers deblocking
    - animation | good for cartoons; uses higher deblocking and more reference frames
    - grain | preserves the grain structure in old, grainy film material
    - stillimage | good for slideshow-like content

- Example

This command encodes a video with good quality, using slower preset to achieve better compression:

```bash
$ ffmpeg -i input.avi -c:v libx264 -preset slow -crf 22 -c:a copy output.mkv
```

*Note: the audio is copied and not encoded*


#### Two-pass ABR

Use this method if you are targeting a specific output file size

- Desired Bitrate calculation

 Your video is 10 minutes (600 seconds) long and an output of 200 MiB is desired.

 Calculate desired encoding bitrate given specific filesize and duration of video. define `bitrate = fileSize/duration`

 ```bash
(200 MiB * 8192 [converts MiB to kBit]) / 600 seconds = ~2730 kBit/s total bitrate
2730 - 128 kBit/s (desired audio bitrate) = 2602 kBit/s video bitrate
 ```

- Encoding using Two-pass

 Below describe the steps for a two-pass control mode:
  - In pass 1 and 2, use the `-pass 1` and `-pass 2` options, respectively.
  - In pass 1, output to a null file descriptor, not an actual file. (This will generate a logfile that ffmpeg needs for the second pass.)
  - In pass 1, you need to specify an output format (with `-f`) that matches the output format you will use in pass 2.
  - In pass 1, you can leave audio out by specifying `-an`

 Terminal:
  ```bash
  $ ffmpeg -y -i input -c:v libx264 -b:v 2600k -pass 1 -an -f mp4 /dev/null && \
  ffmpeg -i input -c:v libx264 -b:v 2600k -pass 2 -c:a aac -b:a 128k output.mp4
  ```




