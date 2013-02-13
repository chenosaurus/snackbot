#!/bin/sh

mjpg_streamer -b -i "/usr/local/lib/input_uvc.so -n -f 3 -r 320x240" -o "/usr/local/lib/output_http.so -n -p 8000"
