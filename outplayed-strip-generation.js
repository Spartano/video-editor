var ET = (function (e) {
  (0, me.Z)(r, e);
  var t,
    n = MT(r);
  function r(e) {
    var t;
    return (
      (0, pe.Z)(this, r),
      ((t = n.call(this, e))._canvasRef = (0, be.createRef)()),
      (t._canvasCtx = null),
      (t._spriteIndex = 0),
      (t._numberOfFrames = 0),
      (t._timeGap = 0),
      (t._spritesRef = (0, be.createRef)()),
      (t._createStrip = t._createStrip.bind((0, he.Z)(t))),
      (t._createSprites = t._createSprites.bind((0, he.Z)(t))),
      (t._onDummyVideoSeek = t._onDummyVideoSeek.bind((0, he.Z)(t))),
      (t._queueCreateSprites = t._queueCreateSprites.bind((0, he.Z)(t))),
      (t._dequeueCreateSprites = t._dequeueCreateSprites.bind((0, he.Z)(t))),
      (t._onCreateSpritesCompleted = t._onCreateSpritesCompleted.bind(
        (0, he.Z)(t)
      )),
      (t._onDummyVideoLoaded = t._onDummyVideoLoaded.bind((0, he.Z)(t))),
      (t._resizeObserver = new ResizeObserver(t._createStrip)),
      t
    );
  }
  return (
    (0, fe.Z)(r, [
      {
        key: "render",
        value: function () {
          var e = this.props.className;
          return (0, ur.jsx)("canvas", {
            ref: this._canvasRef,
            className: e,
          });
        },
      },
      {
        key: "componentDidMount",
        value: function () {
          var e = this._canvasRef.current;
          (this._canvasCtx = e.getContext("2d")),
            (this._dummyVideoElement = document.createElement("video")),
            (this._dummyVideoElement.display = "none"),
            (this._dummyVideoElement.muted = !0),
            this._dummyVideoElement.addEventListener(
              "error",
              this._dequeueCreateSprites
            ),
            this._resizeObserver.observe(e.parentElement);
        },
      },
      {
        key: "componentDidUpdate",
        value:
          ((t = de(
            ye().mark(function e(t) {
              return ye().wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        !this.props.onlyPlaceholder &&
                          t.onlyPlaceholder &&
                          this._createStrip();

                      case 2:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                this
              );
            })
          )),
          function (e) {
            return t.apply(this, arguments);
          }),
      },
      {
        key: "componentWillUnmount",
        value: function () {
          this._resizeObserver.disconnect(),
            this._dequeueCreateSprites(),
            (this._dummyVideoElement = null),
            (this._canvasCtx = null);
        },
      },
      {
        key: "_clearVideoElement",
        value: function () {
          this._dummyVideoElement.removeEventListener(
            "canplaythrough",
            this._onDummyVideoLoaded
          ),
            this._dummyVideoElement.removeEventListener(
              "seeked",
              this._onDummyVideoSeek
            ),
            this._dummyVideoElement.pause(),
            this._dummyVideoElement.removeAttribute("src"),
            this._dummyVideoElement.load();
        },
      },
      {
        key: "_createStrip",
        value: function () {
          var e = this.props.onlyPlaceholder;
          this._dequeueCreateSprites();
          var t = this._canvasRef.current;
          this._canvasCtx.clearRect(0, 0, t.width, t.height),
            e || this._queueCreateSprites();
        },
      },
      {
        key: "_queueCreateSprites",
        value: function () {
          var e = r._createSpritesQueue;
          e.push(this._createSprites), 1 === e.length && e[0]();
        },
      },
      {
        key: "_onCreateSpritesCompleted",
        value: function () {
          this._clearVideoElement();
          var e = r._createSpritesQueue;
          0 !== e.length
            ? e.shift() === this._createSprites
              ? e.length > 0 && e[0]()
              : console.error(
                  "[VideoEditorSpritesStrip] Invalid state: wrong task removed on complete"
                )
            : console.error(
                "[VideoEditorSpritesStrip] Invalid state: queue is empty on complete"
              );
        },
      },
      {
        key: "_dequeueCreateSprites",
        value: function () {
          this._clearVideoElement();
          var e = r._createSpritesQueue,
            t = e.indexOf(this._createSprites);
          t < 0 || (e.splice(t, 1), 0 === t && e.length > 0 && e[0]());
        },
      },
      {
        key: "_createSprites",
        value: function () {
          var e = this.props.path;
          (this._dummyVideoElement.src = e),
            this._dummyVideoElement.addEventListener(
              "canplaythrough",
              this._onDummyVideoLoaded
            );
        },
      },
      {
        key: "_onDummyVideoLoaded",
        value: function () {
          if (this._dummyVideoElement.duration) {
            this._dummyVideoElement.removeEventListener(
              "canplaythrough",
              this._onDummyVideoLoaded
            );
            var e = this.props,
              t = e.frameWidth,
              n = e.inTime,
              r = e.outTime - n,
              i = this._canvasRef.current;
            this._resizeCanvasToDisplaySize(i),
              (this._spriteIndex = 0),
              (this._numberOfFrames = Math.max(
                1,
                Math.ceil(i.width / (t + 2))
              )),
              (this._timeGap =
                this._numberOfFrames > 1 ? r / (this._numberOfFrames - 1) : 0),
              this._dummyVideoElement.addEventListener(
                "seeked",
                this._onDummyVideoSeek
              ),
              (this._dummyVideoElement.currentTime =
                (n + this._spriteIndex * this._timeGap) / 1e3);
          }
        },
      },
      {
        key: "_onDummyVideoSeek",
        value: function () {
          if (
            (this._createSpriteFrame(),
            this._spriteIndex++,
            this._spriteIndex < this._numberOfFrames)
          ) {
            var e = this.props.inTime;
            this._dummyVideoElement.currentTime =
              (e + this._spriteIndex * this._timeGap) / 1e3;
          } else
            this._dummyVideoElement.removeEventListener(
              "seeked",
              this._onDummyVideoSeek
            ),
              this._onCreateSpritesCompleted();
        },
      },
      {
        key: "_createSpriteFrame",
        value: function () {
          var e = this.props,
            t = e.frameHeight,
            n = e.frameWidth,
            r = this._spriteIndex * n + 2 * this._spriteIndex,
            i = this._dummyVideoElement,
            a = i.videoWidth,
            s = i.videoHeight,
            o = n / t,
            c = s * o,
            l = s;
          a < s && ((c = a), (l = a * o));
          var u = (a - c) / 2,
            d = (s - l) / 2;
          this._canvasCtx.drawImage(
            this._dummyVideoElement,
            u,
            d,
            c,
            l,
            r,
            0,
            n,
            t
          );
        },
      },
      {
        key: "_resizeCanvasToDisplaySize",
        value: function (e) {
          var t = e.getBoundingClientRect(),
            n = t.width,
            r = t.height;
          if (e.width !== n || e.height !== r) {
            var i = window.devicePixelRatio,
              a = void 0 === i ? 1 : i;
            return (
              (e.width = n * a),
              (e.height = r * a),
              this._canvasCtx.scale(a, a),
              !0
            );
          }
          return !1;
        },
      },
    ]),
    r
  );
})(be.PureComponent);
