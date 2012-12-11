#!/bin/sh

mjpg_streamer -b -i "/usr/local/lib/input_uvc.so -n -f 15 -r 640x480" -o "/usr/local/lib/output_http.so -n -p 8000"
