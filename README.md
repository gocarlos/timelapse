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

```bash
# convert from timestamp.jpeg to yyyy-mm-dd-HHMMSS.jpeg
for f in *;do
    if [[ -f "$f" && $f == *.jpeg  ]]
    then
        # echo "$f";
        suffix=".jpeg"
        # suffix_removed_String=`${$f/%$suffix}`
        # suffix_removed_String=`"$f"%"$suffix"`
        suffix_removed_String=${f%.jpeg}
        # echo $suffix_removed_String
        ts=`date +'%Y-%m-%d-%H%M%S' -d "UTC 1970-01-01 $suffix_removed_String secs"`
        echo "$f"
        echo "$ts.jpeg"
        mv $f "$ts.jpeg"
    fi
done
```

