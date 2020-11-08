# timelapse

construction timelapse

## deps

```bash
sudo apt-get install fswebcam
```

## stats

```
curl localhost:300
df -Bm
ls -l --block-size=k ./images
```


```
 ffmpeg -framerate 15 -pattern_type glob -i '*.jpeg' -c:v libx264 -strict -2 -preset slow -pix_fmt yuv420p -f mp4 out.mp4
```
