### Usage

##### Add

```
<div class="[any selector]">
</div>
```
##### JS mit Jquery:
```
$(".[any selecor]").slider(sliderData)
```

##### Slider data example:
```
[{
  bcgUrl: 'path to slider img',
  btnClassName: 'any classname',
  btnName: 'Btn name',
  /* Also you can add overlay links if needed */
  overlayGroup: [ 
    {
        left: "50px",
        top: "50px",
        title: "Title1",
        description: "decription1"
    },
    {
        left: "200px",
        top: "50px",
        title: "Title2",
        description: "decription2"
    },
    ...
  ]
}, ...]
```


