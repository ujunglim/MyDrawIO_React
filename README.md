# MyDrawIO Rect ver

## React, TS, svg

The first change of React version is changing `view` part to `React Function Component(RFC)`.
In canvas js version, we used `CanvasView.js` class as view part.
</br>
How has it changed?
</br>
</br>

![img](./rfc.png)

# Move properties of class to RFC (Board.js)

When state changes, RFC will `rerender`, so change `class properties` to `state`.
Globally can access to Controller class.

```js
function Board() {
  const [rects, setRects] = useState([]);

  useEffect(() => {
    setRects(DrawControllerInstance.rects);
  }, []);
}
```

# How pass setState to class?

Give setState to `Controller class` by using `useRef`

```js
function Board() {
  const boardRef = useRef(null);

  useEffect(() => {
    boardRef.setRects = setRects;

    if (boardRef && boardRef.current) {
      DrawControllerInstance.init(boardRef);
    }
  }, [boardRef]);
}
```

# Change render part

Now, controller got `setState` so we just need to use it to rerender.

```js
class DrawController {
  init(boardRef) {
    this.rects = [];
    this.boardRef = boardRef;
  }
  render() {
    this.boardRef.setRects([...this.rects]);
  }
}
```

# Draw Line by using svg

```js
{
  lines.map((line) => {
    const {
      id,
      startPort: {
        globalPos: { x: x1, y: y1 },
      },
      endPort: {
        globalPos: { x: x2, y: y2 },
      },
    } = line;
    const gap = constants.PORT_SIZE / 2;
    return (
      <svg
        key={id}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      >
        <line
          x1={x1 + gap}
          y1={y1 + gap}
          x2={x2 + gap}
          y2={y2 + gap}
          stroke="black"
        />
      </svg>
    );
  });
}
```

# canvas

moveTo(x, y): move current point to x, y without drawing a line.
lineTo(x, y): draw straight line from current position to x, y

# TODO

less
