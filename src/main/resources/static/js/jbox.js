function jBoxWrapper(O) {
    function a(t, i) {
        return this.options = {
            id: null,
            width: "auto",
            height: "auto",
            minWidth: null,
            minHeight: null,
            maxWidth: null,
            maxHeight: null,
            responsiveWidth: !0,
            responsiveHeight: !0,
            responsiveMinWidth: 100,
            responsiveMinHeight: 100,
            attach: null,
            trigger: "click",
            preventDefault: !1,
            content: null,
            getContent: null,
            title: null,
            getTitle: null,
            footer: null,
            isolateScroll: !0,
            ajax: {
                url: null,
                data: "",
                reload: !1,
                getURL: "data-url",
                getData: "data-ajax",
                setContent: !0,
                loadingClass: !0,
                spinner: !0,
                spinnerDelay: 300,
                spinnerReposition: !0
            },
            cancelAjaxOnClose: !0,
            target: null,
            position: {
                x: "center",
                y: "center"
            },
            outside: null,
            offset: 0,
            attributes: {
                x: "left",
                y: "top"
            },
            fixed: !1,
            adjustPosition: !0,
            adjustTracker: !1,
            adjustDistance: 5,
            reposition: !0,
            repositionOnOpen: !0,
            repositionOnContent: !0,
            holdPosition: !0,
            pointer: !1,
            pointTo: "target",
            fade: 180,
            animation: null,
            theme: "Default",
            addClass: null,
            overlay: !1,
            overlayClass: null,
            zIndex: 1e4,
            delayOpen: 0,
            delayClose: 0,
            closeOnEsc: !1,
            closeOnClick: !1,
            closeOnMouseleave: !1,
            closeButton: !1,
            appendTo: O("body"),
            createOnInit: !1,
            blockScroll: !1,
            blockScrollAdjust: !0,
            draggable: !1,
            dragOver: !0,
            autoClose: !1,
            delayOnHover: !1,
            showCountdown: !1,
            preloadAudio: !0,
            audio: null,
            volume: 100,
            onInit: null,
            onAttach: null,
            onPosition: null,
            onCreated: null,
            onOpen: null,
            onClose: null,
            onCloseComplete: null,
            onDragStart: null,
            onDragEnd: null
        }, this._pluginOptions = {
            Tooltip: {
                getContent: "title",
                trigger: "mouseenter",
                position: {
                    x: "center",
                    y: "top"
                },
                outside: "y",
                pointer: !0
            },
            Mouse: {
                responsiveWidth: !1,
                responsiveHeight: !1,
                adjustPosition: "flip",
                target: "mouse",
                trigger: "mouseenter",
                position: {
                    x: "right",
                    y: "bottom"
                },
                outside: "xy",
                offset: 5
            },
            Modal: {
                target: O(window),
                fixed: !0,
                blockScroll: !0,
                closeOnEsc: !0,
                closeOnClick: "overlay",
                closeButton: !0,
                overlay: !0,
                animation: "zoomIn"
            }
        }, this.options = O.extend(!0, this.options, this._pluginOptions[t] ? this._pluginOptions[t] : a._pluginOptions[t], i), "string" == O.type(t) && (this.type = t), this.isTouchDevice = function() {
            var t = " -webkit- -moz- -o- -ms- ".split(" ");
            if ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch) return !0;
            var i, o = ["(", t.join("touch-enabled),("), "heartz", ")"].join("");
            return i = o, window.matchMedia(i).matches
        }(), this.isTouchDevice && "mouseenter" === this.options.trigger && !1 === this.options.closeOnClick && (this.options.closeOnClick = "body"), this._fireEvent = function(t, i) {
            this.options["_" + t] && this.options["_" + t].bind(this)(i), this.options[t] && this.options[t].bind(this)(i)
        }, null === this.options.id && (this.options.id = "jBox" + a._getUniqueID()), this.id = this.options.id, ("center" == this.options.position.x && "x" == this.options.outside || "center" == this.options.position.y && "y" == this.options.outside) && (this.options.outside = null), "target" != this.options.pointTo || this.options.outside && "xy" != this.options.outside || (this.options.pointer = !1), "object" != O.type(this.options.offset) ? this.options.offset = {
            x: this.options.offset,
            y: this.options.offset
        } : this.options.offset = O.extend({
            x: 0,
            y: 0
        }, this.options.offset), "object" != O.type(this.options.adjustDistance) ? this.options.adjustDistance = {
            top: this.options.adjustDistance,
            right: this.options.adjustDistance,
            bottom: this.options.adjustDistance,
            left: this.options.adjustDistance
        } : this.options.adjustDistance = O.extend({
            top: 5,
            left: 5,
            right: 5,
            bottom: 5
        }, this.options.adjustDistance), this.outside = !(!this.options.outside || "xy" == this.options.outside) && this.options.position[this.options.outside], this.align = this.outside ? this.outside : "center" != this.options.position.y && "number" != O.type(this.options.position.y) ? this.options.position.x : "center" != this.options.position.x && "number" != O.type(this.options.position.x) ? this.options.position.y : this.options.attributes.x, a.zIndexMax = Math.max(a.zIndexMax || 0, "auto" === this.options.zIndex ? 1e4 : this.options.zIndex), "auto" === this.options.zIndex && (this.adjustZIndexOnOpen = !0, a.zIndexMax += 2, this.options.zIndex = a.zIndexMax, this.trueModal = this.options.overlay), this._getOpp = function(t) {
            return {
                left: "right",
                right: "left",
                top: "bottom",
                bottom: "top",
                x: "y",
                y: "x"
            } [t]
        }, this._getXY = function(t) {
            return {
                left: "x",
                right: "x",
                top: "y",
                bottom: "y",
                center: "x"
            } [t]
        }, this._getTL = function(t) {
            return {
                left: "left",
                right: "left",
                top: "top",
                bottom: "top",
                center: "left",
                x: "left",
                y: "top"
            } [t]
        }, this._getInt = function(t, i) {
            return "auto" == t ? "auto" : t && "string" == O.type(t) && "%" == t.slice(-1) ? O(window)["height" == i ? "innerHeight" : "innerWidth"]() * parseInt(t.replace("%", "")) / 100 : t
        }, this._createSVG = function(t, i) {
            var o = document.createElementNS("http://www.w3.org/2000/svg", t);
            return O.each(i, function(t, i) {
                o.setAttribute(i[0], i[1] || "")
            }), o
        }, this._isolateScroll = function(e) {
            e && e.length && e.on("DOMMouseScroll.jBoxIsolateScroll mousewheel.jBoxIsolateScroll", function(t) {
                var i = t.wheelDelta || t.originalEvent && t.originalEvent.wheelDelta || -t.detail,
                    o = 0 <= this.scrollTop + e.outerHeight() - this.scrollHeight,
                    s = this.scrollTop <= 0;
                (i < 0 && o || 0 < i && s) && t.preventDefault()
            })
        }, this._setTitleWidth = function() {
            if (!this.titleContainer || "auto" == this.content[0].style.width && !this.content[0].style.maxWidth) return null;
            if ("none" == this.wrapper.css("display")) {
                this.wrapper.css("display", "block");
                var t = this.content.outerWidth();
                this.wrapper.css("display", "none")
            } else t = this.content.outerWidth();
            this.titleContainer.css({
                maxWidth: Math.max(t, parseInt(this.content[0].style.maxWidth)) || null
            })
        }, this._draggable = function() {
            if (!this.options.draggable) return !1;
            var t = "title" == this.options.draggable ? this.titleContainer : this.options.draggable instanceof O ? this.options.draggable : "string" == O.type(this.options.draggable) ? O(this.options.draggable) : this.wrapper;
            return !(!(t && t instanceof O && t.length) || t.data("jBox-draggable")) && (t.addClass("jBox-draggable").data("jBox-draggable", !0).on("touchstart mousedown", function(t) {
                if (2 != t.button && !O(t.target).hasClass("jBox-noDrag") && !O(t.target).parents(".jBox-noDrag").length) {
                    this.draggingStartX = t.pageX, this.draggingStartY = t.pageY, this.options.dragOver && !this.trueModal && parseInt(this.wrapper.css("zIndex"), 10) <= a.zIndexMaxDragover && (a.zIndexMaxDragover += 1, this.wrapper.css("zIndex", a.zIndexMaxDragover));
                    var i = this.wrapper.outerHeight(),
                        o = this.wrapper.outerWidth(),
                        s = this.wrapper.offset().top + i - t.pageY,
                        e = this.wrapper.offset().left + o - t.pageX;
                    O(document).on("touchmove.jBox-draggable-" + this.id + " mousemove.jBox-draggable-" + this.id, function(t) {
                        this.dragging || this.draggingStartX == t.pageX || this.draggingStartY == t.pageY || (this._fireEvent("onDragStart"), this.dragging = !0), this.wrapper.offset({
                            top: t.pageY + s - i,
                            left: t.pageX + e - o
                        })
                    }.bind(this)), t.preventDefault()
                }
            }.bind(this)).on("touchend mouseup", function() {
                if (O(document).off("touchmove.jBox-draggable-" + this.id + " mousemove.jBox-draggable-" + this.id), this.dragging && this._fireEvent("onDragEnd"), this.dragging = !1, ("Modal" == this.type || "Confirm" == this.type) && this.options.holdPosition) {
                    var t = O("#" + this.id).offset(),
                        i = {
                            x: t.left - O(document).scrollLeft(),
                            y: t.top - O(document).scrollTop()
                        };
                    this.position({
                        position: i,
                        offset: {
                            x: 0,
                            y: 0
                        }
                    })
                }
            }.bind(this)), this.trueModal || (a.zIndexMaxDragover = a.zIndexMaxDragover ? Math.max(a.zIndexMaxDragover, this.options.zIndex) : this.options.zIndex), this)
        }, this._create = function() {
            if (!this.wrapper) {
                if (this.wrapper = O("<div/>", {
                        id: this.id,
                        class: "jBox-wrapper" + (this.type ? " jBox-" + this.type : "") + (this.options.theme ? " jBox-" + this.options.theme : "") + (this.options.addClass ? " " + this.options.addClass : "")
                    }).css({
                        position: this.options.fixed ? "fixed" : "absolute",
                        display: "none",
                        opacity: 0,
                        zIndex: this.options.zIndex
                    }).data("jBox", this), this.options.closeOnMouseleave && this.wrapper.on("mouseleave", function(t) {
                        !this.source || t.relatedTarget != this.source[0] && -1 === O.inArray(this.source[0], O(t.relatedTarget).parents("*")) && this.close()
                    }.bind(this)), "box" == this.options.closeOnClick && this.wrapper.on("click", function() {
                        this.close({
                            ignoreDelay: !0
                        })
                    }.bind(this)), this.container = O('<div class="jBox-container"/>').appendTo(this.wrapper), this.content = O('<div class="jBox-content"/>').appendTo(this.container), this.options.footer && (this.footer = O('<div class="jBox-footer"/>').append(this.options.footer).appendTo(this.container)), this.options.isolateScroll && this._isolateScroll(this.content), this.options.closeButton) {
                    var t = this._createSVG("svg", [
                        ["viewBox", "0 0 24 24"]
                    ]);
                    t.appendChild(this._createSVG("path", [
                        ["d", "M22.2,4c0,0,0.5,0.6,0,1.1l-6.8,6.8l6.9,6.9c0.5,0.5,0,1.1,0,1.1L20,22.3c0,0-0.6,0.5-1.1,0L12,15.4l-6.9,6.9c-0.5,0.5-1.1,0-1.1,0L1.7,20c0,0-0.5-0.6,0-1.1L8.6,12L1.7,5.1C1.2,4.6,1.7,4,1.7,4L4,1.7c0,0,0.6-0.5,1.1,0L12,8.5l6.8-6.8c0.5-0.5,1.1,0,1.1,0L22.2,4z"]
                    ])), this.closeButton = O('<div class="jBox-closeButton jBox-noDrag"/>').on("click", function(t) {
                        this.close({
                            ignoreDelay: !0
                        })
                    }.bind(this)).append(t), "box" != this.options.closeButton && (!0 !== this.options.closeButton || this.options.overlay || this.options.title || this.options.getTitle) || (this.wrapper.addClass("jBox-closeButton-box"), this.closeButton.appendTo(this.container))
                }
                if (this.wrapper.appendTo(this.options.appendTo), this.wrapper.find(".jBox-closeButton").length && O.each(["top", "right", "bottom", "left"], function(t, i) {
                        this.wrapper.find(".jBox-closeButton").css(i) && "auto" != this.wrapper.find(".jBox-closeButton").css(i) && (this.options.adjustDistance[i] = Math.max(this.options.adjustDistance[i], this.options.adjustDistance[i] + -1 * ((parseInt(this.wrapper.find(".jBox-closeButton").css(i)) || 0) + (parseInt(this.container.css("border-" + i + "-width")) || 0))))
                    }.bind(this)), this.options.pointer) {
                    if (this.pointer = {
                            position: "target" != this.options.pointTo ? this.options.pointTo : this._getOpp(this.outside),
                            xy: "target" != this.options.pointTo ? this._getXY(this.options.pointTo) : this._getXY(this.outside),
                            align: "center",
                            offset: 0
                        }, this.pointer.element = O('<div class="jBox-pointer jBox-pointer-' + this.pointer.position + '"/>').appendTo(this.wrapper), this.pointer.dimensions = {
                            x: this.pointer.element.outerWidth(),
                            y: this.pointer.element.outerHeight()
                        }, "string" == O.type(this.options.pointer)) {
                        var i = this.options.pointer.split(":");
                        i[0] && (this.pointer.align = i[0]), i[1] && (this.pointer.offset = parseInt(i[1]))
                    }
                    this.pointer.alignAttribute = "x" == this.pointer.xy ? "bottom" == this.pointer.align ? "bottom" : "top" : "right" == this.pointer.align ? "right" : "left", this.wrapper.css("padding-" + this.pointer.position, this.pointer.dimensions[this.pointer.xy]), this.pointer.element.css(this.pointer.alignAttribute, "center" == this.pointer.align ? "50%" : 0).css("margin-" + this.pointer.alignAttribute, this.pointer.offset), this.pointer.margin = {}, this.pointer.margin["margin-" + this.pointer.alignAttribute] = this.pointer.offset, "center" == this.pointer.align && this.pointer.element.css("transform", "translate(" + ("y" == this.pointer.xy ? -.5 * this.pointer.dimensions.x + "px" : 0) + ", " + ("x" == this.pointer.xy ? -.5 * this.pointer.dimensions.y + "px" : 0) + ")"), this.pointer.element.css("x" == this.pointer.xy ? "width" : "height", parseInt(this.pointer.dimensions[this.pointer.xy]) + parseInt(this.container.css("border-" + this.pointer.alignAttribute + "-width"))), this.wrapper.addClass("jBox-pointerPosition-" + this.pointer.position)
                }
                this.setContent(this.options.content, !0), this.setTitle(this.options.title, !0), this.options.draggable && this._draggable(), this._fireEvent("onCreated")
            }
        }, this.options.createOnInit && this._create(), this.options.attach && this.attach(), this._attachEvents = function() {
            this.options.delayOnHover && O("#" + this.id).on("mouseenter", function(t) {
                this.isHovered = !0
            }.bind(this)), this.options.delayOnHover && O("#" + this.id).on("mouseleave", function(t) {
                this.isHovered = !1
            }.bind(this)), (this.options.adjustPosition || this.options.reposition) && !this.fixed && this.outside && (this.options.adjustTracker && O(window).on("scroll.jBox-" + this.id, function(t) {
                this.position()
            }.bind(this)), (this.options.adjustPosition || this.options.reposition) && O(window).on("resize.jBox-" + this.id, function(t) {
                this.position()
            }.bind(this))), "mouse" == this.options.target && O("body").on("mousemove.jBox-" + this.id, function(t) {
                this.position({
                    mouseTarget: {
                        top: t.pageY,
                        left: t.pageX
                    }
                })
            }.bind(this))
        }, this._detachEvents = function() {
            this.options.closeOnEsc && O(document).off("keyup.jBox-" + this.id), !0 !== this.options.closeOnClick && "body" != this.options.closeOnClick || O(document).off("click.jBox-" + this.id), this.options.adjustTracker && O(window).off("scroll.jBox-" + this.id), (this.options.adjustPosition || this.options.reposition) && O(window).off("resize.jBox-" + this.id), "mouse" == this.options.target && O("body").off("mousemove.jBox-" + this.id)
        }, this._showOverlay = function() {
            this.overlay || (this.overlay = O('<div id="' + this.id + '-overlay"/>').addClass("jBox-overlay" + (this.type ? " jBox-overlay-" + this.type : "")).css({
                display: "none",
                opacity: 0,
                zIndex: this.options.zIndex - 1
            }).appendTo(this.options.appendTo), this.options.overlayClass && this.overlay.addClass(this.options.overlayClass), "overlay" != this.options.closeButton && !0 !== this.options.closeButton || this.overlay.append(this.closeButton), "overlay" == this.options.closeOnClick && this.overlay.on("click", function() {
                this.close({
                    ignoreDelay: !0
                })
            }.bind(this)), O("#" + this.id + "-overlay .jBox-closeButton").length && (this.options.adjustDistance.top = Math.max(O("#" + this.id + "-overlay .jBox-closeButton").outerHeight(), this.options.adjustDistance.top))), !0 === this.adjustZIndexOnOpen && this.overlay.css("zIndex", parseInt(this.wrapper.css("zIndex"), 10) - 1), "block" != this.overlay.css("display") && (this.options.fade ? this.overlay.stop() && this.overlay.animate({
                opacity: 1
            }, {
                queue: !1,
                duration: this.options.fade,
                start: function() {
                    this.overlay.css({
                        display: "block"
                    })
                }.bind(this)
            }) : this.overlay.css({
                display: "block",
                opacity: 1
            }))
        }, this._hideOverlay = function() {
            this.overlay && (this.options.fade ? this.overlay.stop() && this.overlay.animate({
                opacity: 0
            }, {
                queue: !1,
                duration: this.options.fade,
                complete: function() {
                    this.overlay.css({
                        display: "none"
                    })
                }.bind(this)
            }) : this.overlay.css({
                display: "none",
                opacity: 0
            }))
        }, this._exposeDimensions = function() {
            this.wrapper.css({
                top: -1e4,
                left: -1e4,
                right: "auto",
                bottom: "auto"
            });
            var t = {
                x: this.wrapper.outerWidth(),
                y: this.wrapper.outerHeight()
            };
            return this.wrapper.css({
                top: "auto",
                left: "auto"
            }), t
        }, this._generateAnimationCSS = function() {
            if ("object" != O.type(this.options.animation) && (this.options.animation = {
                    pulse: {
                        open: "pulse",
                        close: "zoomOut"
                    },
                    zoomIn: {
                        open: "zoomIn",
                        close: "zoomIn"
                    },
                    zoomOut: {
                        open: "zoomOut",
                        close: "zoomOut"
                    },
                    move: {
                        open: "move",
                        close: "move"
                    },
                    slide: {
                        open: "slide",
                        close: "slide"
                    },
                    flip: {
                        open: "flip",
                        close: "flip"
                    },
                    tada: {
                        open: "tada",
                        close: "zoomOut"
                    }
                } [this.options.animation]), !this.options.animation) return null;
            this.options.animation.open && (this.options.animation.open = this.options.animation.open.split(":")), this.options.animation.close && (this.options.animation.close = this.options.animation.close.split(":")), this.options.animation.openDirection = this.options.animation.open[1] ? this.options.animation.open[1] : null, this.options.animation.closeDirection = this.options.animation.close[1] ? this.options.animation.close[1] : null, this.options.animation.open && (this.options.animation.open = this.options.animation.open[0]), this.options.animation.close && (this.options.animation.close = this.options.animation.close[0]), this.options.animation.open && (this.options.animation.open += "Open"), this.options.animation.close && (this.options.animation.close += "Close");
            var n = {
                pulse: {
                    duration: 350,
                    css: [
                        ["0%", "scale(1)"],
                        ["50%", "scale(1.1)"],
                        ["100%", "scale(1)"]
                    ]
                },
                zoomInOpen: {
                    duration: this.options.fade || 180,
                    css: [
                        ["0%", "scale(0.9)"],
                        ["100%", "scale(1)"]
                    ]
                },
                zoomInClose: {
                    duration: this.options.fade || 180,
                    css: [
                        ["0%", "scale(1)"],
                        ["100%", "scale(0.9)"]
                    ]
                },
                zoomOutOpen: {
                    duration: this.options.fade || 180,
                    css: [
                        ["0%", "scale(1.1)"],
                        ["100%", "scale(1)"]
                    ]
                },
                zoomOutClose: {
                    duration: this.options.fade || 180,
                    css: [
                        ["0%", "scale(1)"],
                        ["100%", "scale(1.1)"]
                    ]
                },
                moveOpen: {
                    duration: this.options.fade || 180,
                    positions: {
                        top: {
                            "0%": -12
                        },
                        right: {
                            "0%": 12
                        },
                        bottom: {
                            "0%": 12
                        },
                        left: {
                            "0%": -12
                        }
                    },
                    css: [
                        ["0%", "translate%XY(%Vpx)"],
                        ["100%", "translate%XY(0px)"]
                    ]
                },
                moveClose: {
                    duration: this.options.fade || 180,
                    timing: "ease-in",
                    positions: {
                        top: {
                            "100%": -12
                        },
                        right: {
                            "100%": 12
                        },
                        bottom: {
                            "100%": 12
                        },
                        left: {
                            "100%": -12
                        }
                    },
                    css: [
                        ["0%", "translate%XY(0px)"],
                        ["100%", "translate%XY(%Vpx)"]
                    ]
                },
                slideOpen: {
                    duration: 400,
                    positions: {
                        top: {
                            "0%": -400
                        },
                        right: {
                            "0%": 400
                        },
                        bottom: {
                            "0%": 400
                        },
                        left: {
                            "0%": -400
                        }
                    },
                    css: [
                        ["0%", "translate%XY(%Vpx)"],
                        ["100%", "translate%XY(0px)"]
                    ]
                },
                slideClose: {
                    duration: 400,
                    timing: "ease-in",
                    positions: {
                        top: {
                            "100%": -400
                        },
                        right: {
                            "100%": 400
                        },
                        bottom: {
                            "100%": 400
                        },
                        left: {
                            "100%": -400
                        }
                    },
                    css: [
                        ["0%", "translate%XY(0px)"],
                        ["100%", "translate%XY(%Vpx)"]
                    ]
                },
                flipOpen: {
                    duration: 600,
                    css: [
                        ["0%", "perspective(400px) rotateX(90deg)"],
                        ["40%", "perspective(400px) rotateX(-15deg)"],
                        ["70%", "perspective(400px) rotateX(15deg)"],
                        ["100%", "perspective(400px) rotateX(0deg)"]
                    ]
                },
                flipClose: {
                    duration: this.options.fade || 300,
                    css: [
                        ["0%", "perspective(400px) rotateX(0deg)"],
                        ["100%", "perspective(400px) rotateX(90deg)"]
                    ]
                },
                tada: {
                    duration: 800,
                    css: [
                        ["0%", "scale(1)"],
                        ["10%, 20%", "scale(0.9) rotate(-3deg)"],
                        ["30%, 50%, 70%, 90%", "scale(1.1) rotate(3deg)"],
                        ["40%, 60%, 80%", "scale(1.1) rotate(-3deg)"],
                        ["100%", "scale(1) rotate(0)"]
                    ]
                }
            };
            O.each(["pulse", "tada"], function(t, i) {
                n[i + "Open"] = n[i + "Close"] = n[i]
            });
            var s = function(s, e) {
                return keyframe_css = "@keyframes jBox-" + this.id + "-animation-" + this.options.animation[s] + "-" + s + (e ? "-" + e : "") + " {", O.each(n[this.options.animation[s]].css, function(t, i) {
                    var o = e ? i[1].replace("%XY", this._getXY(e).toUpperCase()) : i[1];
                    n[this.options.animation[s]].positions && (o = o.replace("%V", n[this.options.animation[s]].positions[e][i[0]])), keyframe_css += i[0] + " {transform:" + o + ";}"
                }.bind(this)), keyframe_css += "}", keyframe_css += ".jBox-" + this.id + "-animation-" + this.options.animation[s] + "-" + s + (e ? "-" + e : "") + " {", keyframe_css += "animation-duration: " + n[this.options.animation[s]].duration + "ms;", keyframe_css += "animation-name: jBox-" + this.id + "-animation-" + this.options.animation[s] + "-" + s + (e ? "-" + e : "") + ";", keyframe_css += n[this.options.animation[s]].timing ? "animation-timing-function: " + n[this.options.animation[s]].timing + ";" : "", keyframe_css += "}", keyframe_css
            }.bind(this);
            this._animationCSS = "", O.each(["open", "close"], function(t, o) {
                if (!this.options.animation[o] || !n[this.options.animation[o]] || "close" == o && !this.options.fade) return "";
                n[this.options.animation[o]].positions ? O.each(["top", "right", "bottom", "left"], function(t, i) {
                    this._animationCSS += s(o, i)
                }.bind(this)) : this._animationCSS += s(o)
            }.bind(this))
        }, this.options.animation && this._generateAnimationCSS(), this._blockBodyClick = function() {
            this.blockBodyClick = !0, setTimeout(function() {
                this.blockBodyClick = !1
            }.bind(this), 10)
        }, this._animate = function(t) {
            if (t = t || (this.isOpen ? "open" : "close"), !this.options.fade && "close" == t) return null;
            var i = this.options.animation[t + "Direction"] || ("center" != this.align ? this.align : this.options.attributes.x);
            this.flipped && this._getXY(i) == this._getXY(this.align) && (i = this._getOpp(i));
            var o = "jBox-" + this.id + "-animation-" + this.options.animation[t] + "-" + t + " jBox-" + this.id + "-animation-" + this.options.animation[t] + "-" + t + "-" + i;
            this.wrapper.addClass(o);
            var s = 1e3 * parseFloat(this.wrapper.css("animation-duration"));
            "close" == t && (s = Math.min(s, this.options.fade)), setTimeout(function() {
                this.wrapper.removeClass(o)
            }.bind(this), s)
        }, this._abortAnimation = function() {
            var t = this.wrapper.attr("class").split(" ").filter(function(t) {
                return 0 !== t.lastIndexOf("jBox-" + this.id + "-animation", 0)
            }.bind(this));
            this.wrapper.attr("class", t.join(" "))
        }, (this.options.responsiveWidth || this.options.responsiveHeight) && O(window).on("resize.responsivejBox-" + this.id, function(t) {
            this.isOpen && this.position()
        }.bind(this)), "string" === O.type(this.options.preloadAudio) && (this.options.preloadAudio = [this.options.preloadAudio]), "string" === O.type(this.options.audio) && (this.options.audio = {
            open: this.options.audio
        }), "number" === O.type(this.options.volume) && (this.options.volume = {
            open: this.options.volume,
            close: this.options.volume
        }), !0 === this.options.preloadAudio && this.options.audio && (this.options.preloadAudio = [], O.each(this.options.audio, function(t, i) {
            this.options.preloadAudio.push(i + ".mp3"), this.options.preloadAudio.push(i + ".ogg")
        }.bind(this))), this.options.preloadAudio.length && O.each(this.options.preloadAudio, function(t, i) {
            var o = new Audio;
            o.src = i, o.preload = "auto"
        }), this._fireEvent("onInit"), this
    }
    var t, i;
    return a.prototype.attach = function(t, s) {
        return t = t || this.options.attach, "string" == O.type(t) && (t = O(t)), s = s || this.options.trigger, t && t.length && O.each(t, function(t, o) {
            (o = O(o)).data("jBox-attached-" + this.id) || ("title" == this.options.getContent && null != o.attr("title") && o.data("jBox-getContent", o.attr("title")).removeAttr("title"), this.attachedElements || (this.attachedElements = []), this.attachedElements.push(o[0]), o.on(s + ".jBox-attach-" + this.id, function(t) {
                if (this.timer && clearTimeout(this.timer), "mouseenter" != s || !this.isOpen || this.source[0] != o[0]) {
                    if (this.isOpen && this.source && this.source[0] != o[0]) var i = !0;
                    this.source = o, this.options.target || (this.target = o), "click" == s && this.options.preventDefault && t.preventDefault(), this["click" != s || i ? "open" : "toggle"]()
                }
            }.bind(this)), "mouseenter" == this.options.trigger && o.on("mouseleave", function(t) {
                if (!this.wrapper) return null;
                this.options.closeOnMouseleave && (t.relatedTarget == this.wrapper[0] || O(t.relatedTarget).parents("#" + this.id).length) || this.close()
            }.bind(this)), o.data("jBox-attached-" + this.id, s), this._fireEvent("onAttach", o))
        }.bind(this)), this
    }, a.prototype.detach = function(t) {
        return (t = t || (this.attachedElements || [])) && t.length && O.each(t, function(t, i) {
            (i = O(i)).data("jBox-attached-" + this.id) && (i.off(i.data("jBox-attached-" + this.id) + ".jBox-attach-" + this.id), i.data("jBox-attached-" + this.id, null)), this.attachedElements = O.grep(this.attachedElements, function(t) {
                return t != i[0]
            })
        }.bind(this)), this
    }, a.prototype.setTitle = function(t, i) {
        if (null == t || null == t) return this;
        this.wrapper || this._create();
        var o = this.wrapper.outerHeight(),
            s = this.wrapper.outerWidth();
        return this.title || (this.titleContainer = O('<div class="jBox-title"/>'), this.title = O("<div/>").appendTo(this.titleContainer), "title" != this.options.closeButton && (!0 !== this.options.closeButton || this.options.overlay) || (this.wrapper.addClass("jBox-closeButton-title"), this.closeButton.appendTo(this.titleContainer)), this.titleContainer.insertBefore(this.content), this._setTitleWidth()), this.wrapper[t ? "addClass" : "removeClass"]("jBox-hasTitle"), this.title.html(t), s != this.wrapper.outerWidth() && this._setTitleWidth(), this.options.draggable && this._draggable(), i || !this.options.repositionOnContent || o == this.wrapper.outerHeight() && s == this.wrapper.outerWidth() || this.position(), this
    }, a.prototype.setContent = function(t, i) {
        if (null == t || null == t) return this;
        this.wrapper || this._create();
        var o = this.wrapper.outerHeight(),
            s = this.wrapper.outerWidth();
        switch (this.content.children("[data-jbox-content-appended]").appendTo("body").css({
            display: "none"
        }), O.type(t)) {
            case "string":
                this.content.html(t);
                break;
            case "object":
                t && (t instanceof O || t.constructor.prototype.jquery) ? (this.content.html(""), t.attr("data-jbox-content-appended", 1).appendTo(this.content).css({
                    display: "block"
                })) : this.content.html(JSON.stringify(t))
        }
        return s != this.wrapper.outerWidth() && this._setTitleWidth(), this.options.draggable && this._draggable(), i || !this.options.repositionOnContent || o == this.wrapper.outerHeight() && s == this.wrapper.outerWidth() || this.position(), this
    }, a.prototype.setDimensions = function(t, i, o) {
        this.wrapper || this._create(), null == i && (i = "auto"), this.content.css(t, this._getInt(i)), "width" == t && this._setTitleWidth(), this.options[t] = i, null != o && !o || this.position()
    }, a.prototype.setWidth = function(t, i) {
        this.setDimensions("width", t, i)
    }, a.prototype.setHeight = function(t, i) {
        this.setDimensions("height", t, i)
    }, a.prototype.position = function(o) {
        if (o = o || {}, o = O.extend(!0, this.options, o), this.target = o.target || this.target || O(window), this.target instanceof O || "mouse" == this.target || (this.target = O(this.target)), !this.target.length) return this;
        this.content.css({
            width: this._getInt(o.width, "width"),
            height: this._getInt(o.height, "height"),
            minWidth: this._getInt(o.minWidth, "width"),
            minHeight: this._getInt(o.minHeight, "height"),
            maxWidth: this._getInt(o.maxWidth, "width"),
            maxHeight: this._getInt(o.maxHeight, "height")
        }), this._setTitleWidth();
        var s = this._exposeDimensions();
        "mouse" == this.target || this.target.data("jBox-" + this.id + "-fixed") || this.target.data("jBox-" + this.id + "-fixed", this.target[0] != O(window)[0] && ("fixed" == this.target.css("position") || 0 < this.target.parents().filter(function() {
            return "fixed" == O(this).css("position")
        }).length) ? "fixed" : "static");
        var t = {
            x: O(window).outerWidth(),
            y: O(window).outerHeight(),
            top: o.fixed && this.target.data("jBox-" + this.id + "-fixed") ? 0 : O(window).scrollTop(),
            left: o.fixed && this.target.data("jBox-" + this.id + "-fixed") ? 0 : O(window).scrollLeft()
        };
        t.bottom = t.top + t.y, t.right = t.left + t.x;
        try {
            var i = this.target.offset()
        } catch (t) {
            i = {
                top: 0,
                left: 0
            }
        }
        "mouse" != this.target && "fixed" == this.target.data("jBox-" + this.id + "-fixed") && o.fixed && (i.top = i.top - O(window).scrollTop(), i.left = i.left - O(window).scrollLeft());
        var e = {
                x: "mouse" == this.target ? 12 : this.target.outerWidth(),
                y: "mouse" == this.target ? 20 : this.target.outerHeight(),
                top: "mouse" == this.target && o.mouseTarget ? o.mouseTarget.top : i ? i.top : 0,
                left: "mouse" == this.target && o.mouseTarget ? o.mouseTarget.left : i ? i.left : 0
            },
            n = o.outside && !("center" == o.position.x && "center" == o.position.y),
            a = {
                x: t.x - o.adjustDistance.left - o.adjustDistance.right,
                y: t.y - o.adjustDistance.top - o.adjustDistance.bottom,
                left: n ? e.left - O(window).scrollLeft() - o.adjustDistance.left : 0,
                right: n ? t.x - e.left + O(window).scrollLeft() - e.x - o.adjustDistance.right : 0,
                top: n ? e.top - O(window).scrollTop() - this.options.adjustDistance.top : 0,
                bottom: n ? t.y - e.top + O(window).scrollTop() - e.y - o.adjustDistance.bottom : 0
            },
            r = {
                x: "x" != o.outside && "xy" != o.outside || "number" == O.type(o.position.x) ? null : o.position.x,
                y: "y" != o.outside && "xy" != o.outside || "number" == O.type(o.position.y) ? null : o.position.y
            },
            h = {
                x: !1,
                y: !1
            };
        if (r.x && s.x > a[r.x] && a[this._getOpp(r.x)] > a[r.x] && (r.x = this._getOpp(r.x)) && (h.x = !0), r.y && s.y > a[r.y] && a[this._getOpp(r.y)] > a[r.y] && (r.y = this._getOpp(r.y)) && (h.y = !0), o.responsiveWidth || o.responsiveHeight) {
            var p = function() {
                if (o.responsiveWidth && s.x > a[r.x || "x"]) {
                    var t = a[r.x || "x"] - (this.pointer && n && "x" == o.outside ? this.pointer.dimensions.x : 0) - parseInt(this.container.css("border-left-width")) - parseInt(this.container.css("border-right-width"));
                    this.content.css({
                        width: t > this.options.responsiveMinWidth ? t : null,
                        minWidth: t < parseInt(this.content.css("minWidth")) ? 0 : null
                    }), this._setTitleWidth()
                }
                s = this._exposeDimensions()
            }.bind(this);
            o.responsiveWidth && p(), o.responsiveWidth && !h.y && r.y && s.y > a[r.y] && a[this._getOpp(r.y)] > a[r.y] && (r.y = this._getOpp(r.y)) && (h.y = !0);
            var l = function() {
                if (o.responsiveHeight && s.y > a[r.y || "y"]) {
                    var t = function() {
                            if (!this.titleContainer && !this.footer) return 0;
                            if ("none" == this.wrapper.css("display")) {
                                this.wrapper.css("display", "block");
                                var t = (this.titleContainer ? this.titleContainer.outerHeight() : 0) + (this.footer ? this.footer.outerHeight() : 0);
                                this.wrapper.css("display", "none")
                            } else t = (this.titleContainer ? this.titleContainer.outerHeight() : 0) + (this.footer ? this.footer.outerHeight() : 0);
                            return t || 0
                        }.bind(this),
                        i = a[r.y || "y"] - (this.pointer && n && "y" == o.outside ? this.pointer.dimensions.y : 0) - t() - parseInt(this.container.css("border-top-width")) - parseInt(this.container.css("border-bottom-width"));
                    this.content.css({
                        height: i > this.options.responsiveMinHeight ? i : null
                    }), this._setTitleWidth()
                }
                s = this._exposeDimensions()
            }.bind(this);
            o.responsiveHeight && l(), o.responsiveHeight && !h.x && r.x && s.x > a[r.x] && a[this._getOpp(r.x)] > a[r.x] && (r.x = this._getOpp(r.x)) && (h.x = !0), o.adjustPosition && "move" != o.adjustPosition && (h.x && p(), h.y && l())
        }
        var d = {},
            c = function(t) {
                if ("number" != O.type(o.position[t])) {
                    var i = o.attributes[t] = "x" == t ? "left" : "top";
                    if (d[i] = e[i], "center" == o.position[t]) return d[i] += Math.ceil((e[t] - s[t]) / 2), void("mouse" != this.target && this.target[0] && this.target[0] == O(window)[0] && (d[i] += .5 * (o.adjustDistance[i] - o.adjustDistance[this._getOpp(i)])));
                    i != o.position[t] && (d[i] += e[t] - s[t]), o.outside != t && "xy" != o.outside || (d[i] += s[t] * (i != o.position[t] ? 1 : -1))
                } else d[o.attributes[t]] = o.position[t]
            }.bind(this);
        if (c("x"), c("y"), this.pointer && "target" == o.pointTo && "number" != O.type(o.position.x) && "number" != O.type(o.position.y)) {
            var u = 0;
            switch (this.pointer.align) {
                case "center":
                    "center" != o.position[this._getOpp(o.outside)] && (u += s[this._getOpp(o.outside)] / 2);
                    break;
                default:
                    switch (o.position[this._getOpp(o.outside)]) {
                        case "center":
                            u += (s[this._getOpp(o.outside)] / 2 - this.pointer.dimensions[this._getOpp(o.outside)] / 2) * (this.pointer.align == this._getTL(this.pointer.align) ? 1 : -1);
                            break;
                        default:
                            u += this.pointer.align != o.position[this._getOpp(o.outside)] ? this.dimensions[this._getOpp(o.outside)] * (-1 !== O.inArray(this.pointer.align, ["top", "left"]) ? 1 : -1) + this.pointer.dimensions[this._getOpp(o.outside)] / 2 * (-1 !== O.inArray(this.pointer.align, ["top", "left"]) ? -1 : 1) : this.pointer.dimensions[this._getOpp(o.outside)] / 2 * (-1 !== O.inArray(this.pointer.align, ["top", "left"]) ? 1 : -1)
                    }
            }
            u *= o.position[this._getOpp(o.outside)] == this.pointer.alignAttribute ? -1 : 1, u += this.pointer.offset * (this.pointer.align == this._getOpp(this._getTL(this.pointer.align)) ? 1 : -1), d[this._getTL(this._getOpp(this.pointer.xy))] += u
        }
        if (d[o.attributes.x] += o.offset.x, d[o.attributes.y] += o.offset.y, this.wrapper.css(d), o.adjustPosition) {
            this.positionAdjusted && (this.pointer && this.wrapper.css("padding", 0).css("padding-" + this._getOpp(this.outside), this.pointer.dimensions[this._getXY(this.outside)]).removeClass("jBox-pointerPosition-" + this._getOpp(this.pointer.position)).addClass("jBox-pointerPosition-" + this.pointer.position), this.pointer && this.pointer.element.attr("class", "jBox-pointer jBox-pointer-" + this._getOpp(this.outside)).css(this.pointer.margin), this.positionAdjusted = !1, this.flipped = !1);
            var g = t.top > d.top - (o.adjustDistance.top || 0),
                m = t.right < d.left + s.x + (o.adjustDistance.right || 0),
                f = t.bottom < d.top + s.y + (o.adjustDistance.bottom || 0),
                x = t.left > d.left - (o.adjustDistance.left || 0),
                y = x ? "left" : m ? "right" : null,
                b = g ? "top" : f ? "bottom" : null;
            if (y || b) {
                if (("Modal" == this.type || "Confirm" == this.type) && "number" == O.type(this.options.position.x) && "number" == O.type(this.options.position.y)) {
                    var v = 0,
                        j = 0;
                    return this.options.holdPosition && (x ? v = t.left - (d.left - (o.adjustDistance.left || 0)) : m && (v = t.right - (d.left + s.x + (o.adjustDistance.right || 0))), g ? j = t.top - (d.top - (o.adjustDistance.top || 0)) : f && (j = t.bottom - (d.top + s.y + (o.adjustDistance.bottom || 0))), this.options.position.x = Math.max(t.top, this.options.position.x + v), this.options.position.y = Math.max(t.left, this.options.position.y + j), c("x"), c("y"), this.wrapper.css(d)), this._fireEvent("onPosition"), this
                }
                if (!0 === o.adjustPosition || "flip" === o.adjustPosition) {
                    var w = function(t) {
                        this.wrapper.css(this._getTL(t), d[this._getTL(t)] + (s[this._getXY(t)] + o.offset[this._getXY(t)] * ("top" == t || "left" == t ? -2 : 2) + e[this._getXY(t)]) * ("top" == t || "left" == t ? 1 : -1)), this.pointer && this.wrapper.removeClass("jBox-pointerPosition-" + this.pointer.position).addClass("jBox-pointerPosition-" + this._getOpp(this.pointer.position)).css("padding", 0).css("padding-" + t, this.pointer.dimensions[this._getXY(t)]), this.pointer && this.pointer.element.attr("class", "jBox-pointer jBox-pointer-" + t), this.positionAdjusted = !0, this.flipped = !0
                    }.bind(this);
                    h.x && w(this.options.position.x), h.y && w(this.options.position.y)
                }
                var B = "x" == this._getXY(this.outside) ? b : y;
                if (this.pointer && "target" == o.pointTo && "flip" != o.adjustPosition && this._getXY(B) == this._getOpp(this._getXY(this.outside))) {
                    if ("center" == this.pointer.align) var C = s[this._getXY(B)] / 2 - this.pointer.dimensions[this._getOpp(this.pointer.xy)] / 2 - parseInt(this.pointer.element.css("margin-" + this.pointer.alignAttribute)) * (B != this._getTL(B) ? -1 : 1);
                    else C = B == this.pointer.alignAttribute ? parseInt(this.pointer.element.css("margin-" + this.pointer.alignAttribute)) : s[this._getXY(B)] - parseInt(this.pointer.element.css("margin-" + this.pointer.alignAttribute)) - this.pointer.dimensions[this._getXY(B)];
                    var _ = B == this._getTL(B) ? t[this._getTL(B)] - d[this._getTL(B)] + o.adjustDistance[B] : -1 * (t[this._getOpp(this._getTL(B))] - d[this._getTL(B)] - o.adjustDistance[B] - s[this._getXY(B)]);
                    B == this._getOpp(this._getTL(B)) && d[this._getTL(B)] - _ < t[this._getTL(B)] + o.adjustDistance[this._getTL(B)] && (_ -= t[this._getTL(B)] + o.adjustDistance[this._getTL(B)] - (d[this._getTL(B)] - _)), (_ = Math.min(_, C)) <= C && 0 < _ && (this.pointer.element.css("margin-" + this.pointer.alignAttribute, parseInt(this.pointer.element.css("margin-" + this.pointer.alignAttribute)) - _ * (B != this.pointer.alignAttribute ? -1 : 1)), this.wrapper.css(this._getTL(B), d[this._getTL(B)] + _ * (B != this._getTL(B) ? -1 : 1)), this.positionAdjusted = !0)
                }
            }
        }
        return this._fireEvent("onPosition"), this
    }, (a.prototype.unscroll = function(t) {
        if (this.set = function(t, i) {
                window.unscrollStore || (window.unscrollStore = {}), window.unscrollStore[t] = i
            }, this.get = function(t) {
                return window.unscrollStore ? window.unscrollStore[t] : null
            }, this.getScrollbarWidth = function() {
                if (this.get("scrollbarWidth")) return this.get("scrollbarWidth") + "px";
                var t = document.createElement("div");
                t.style.width = "100px", t.style.height = "100px", t.style.overflow = "scroll", t.style.position = "absolute", t.style.top = "-10000", document.body.appendChild(t);
                var i = t.offsetWidth - t.clientWidth;
                return document.body.removeChild(t), this.set("scrollbarWidth", i), i + "px"
            }, this.getElementsToAdjust = function(o) {
                "string" == typeof(o = o || []) && (o = [
                    [o, "padding-right"]
                ]), o.forEach(function(t, i) {
                    "string" == typeof t && (o[i] = [t, "padding-right"])
                });
                for (var t = !1, i = 0; i < o.length; i++) - 1 !== o[i][0].indexOf("body") && (t = !0);
                return !1 === t && o.push(["body", "padding-right"]), o
            }, this.pageHasScrollbar = function() {
                return this.getScrollbarWidth() && document.body.offsetHeight > window.innerHeight
            }, this.pageHasScrollbar()) {
            t = this.getElementsToAdjust(t);
            for (var i = 0; i < t.length; i++)
                for (var o = document.querySelectorAll(t[i][0]), s = 0; s < o.length; s++) {
                    if (o[s].getAttribute("data-unscroll")) return;
                    var e = t[i][1],
                        n = window.getComputedStyle(o[s]).getPropertyValue(e);
                    o[s].setAttribute("data-unscroll", e), n = n || "0px";
                    var a = "padding-right" == e || "right" == e ? "+" : "-";
                    o[s].style[e] = "calc(" + n + " " + a + " " + this.getScrollbarWidth() + ")"
                }
        }! function() {
            if (!document.getElementById("unscroll-class-name")) {
                var t = document.head || document.getElementsByTagName("head")[0],
                    i = document.createElement("style");
                i.type = "text/css", i.setAttribute("id", "unscroll-class-name"), i.appendChild(document.createTextNode(".unscrollable { overflow: hidden !important; }")), t.appendChild(i)
            }
        }(), document.body.classList.add("unscrollable")
    }).reset = function() {
        for (var t = document.querySelectorAll("[data-unscroll]"), i = 0; i < t.length; i++) {
            var o = t[i].getAttribute("data-unscroll");
            t[i].style[o] = null, t[i].removeAttribute("data-unscroll")
        }
        document.body.classList.remove("unscrollable")
    }, a.prototype.open = function(t) {
        if (t = t || {}, this.isDestroyed) return this;
        if (this.wrapper || this._create(), this._styles || (this._styles = O("<style/>").append(this._animationCSS).appendTo(O("head"))), this.timer && clearTimeout(this.timer), this._blockBodyClick(), this.isDisabled) return this;
        this.options.closeOnEsc && O(document).on("keyup.jBox-" + this.id, function(t) {
            27 == t.keyCode && this.close({
                ignoreDelay: !0
            })
        }.bind(this)), !0 !== this.options.closeOnClick && "body" !== this.options.closeOnClick || (O("body").on("click.jBox-" + this.id, function(t) {
            this.blockBodyClick || "body" == this.options.closeOnClick && (t.target == this.wrapper[0] || this.wrapper.has(t.target).length) || this.close({
                ignoreDelay: !0
            })
        }.bind(this)), this.isTouchDevice && O("body > *").on("click.jBox-" + this.id, function() {
            return !0
        }));
        var i = function() {
            !0 === this.adjustZIndexOnOpen && (a.zIndexMax = Math.max(parseInt(this.wrapper.css("zIndex"), 10), this.options.zIndex, a.zIndexMax || 0, a.zIndexMaxDragover || 0) + 2, this.wrapper.css("zIndex", a.zIndexMax), this.options.zIndex = a.zIndexMax), this.source && this.options.getTitle && this.source.attr(this.options.getTitle) && this.setTitle(this.source.attr(this.options.getTitle), !0), this.source && this.options.getContent && (this.source.data("jBox-getContent") ? this.setContent(this.source.data("jBox-getContent"), !0) : this.source.attr(this.options.getContent) ? this.setContent(this.source.attr(this.options.getContent), !0) : "html" == this.options.getContent && this.setContent(this.source.html(), !0)), this._fireEvent("onOpen"), (this.options.ajax && (this.options.ajax.url || this.source && this.source.attr(this.options.ajax.getURL)) && (!this.ajaxLoaded || this.options.ajax.reload) || t.ajax && (t.ajax.url || t.ajax.data)) && ("strict" == this.options.ajax.reload || !this.source || !this.source.data("jBox-ajax-data") || t.ajax && (t.ajax.url || t.ajax.data) ? this.ajax(t.ajax || null, !0) : this.setContent(this.source.data("jBox-ajax-data"))), this.positionedOnOpen && !this.options.repositionOnOpen || !this.position(t) || (this.positionedOnOpen = !0), this.isClosing && this._abortAnimation(), this.isOpen || (this.isOpen = !0, this.options.autoClose && (this.options.delayClose = this.options.autoClose) && this.close(), this._attachEvents(), this.options.blockScroll && (this.options.blockScrollAdjust ? a.blockScrollScopes ? a.blockScrollScopes++ : (a.blockScrollScopes = 1, this.unscroll(Array.isArray(this.options.blockScrollAdjust) || "string" == typeof this.options.blockScrollAdjust ? this.options.blockScrollAdjust : null)) : O("body").addClass("jBox-blockScroll-" + this.id)), this.options.overlay && (this._showOverlay(), this.position()), this.options.animation && !this.isClosing && this._animate("open"), this.options.audio && this.options.audio.open && this.audio(this.options.audio.open, this.options.volume.open), this.options.fade ? this.wrapper.stop().animate({
                opacity: 1
            }, {
                queue: !1,
                duration: this.options.fade,
                start: function() {
                    this.isOpening = !0, this.wrapper.css({
                        display: "block"
                    })
                }.bind(this),
                always: function() {
                    this.isOpening = !1, setTimeout(function() {
                        this.positionOnFadeComplete && this.position() && (this.positionOnFadeComplete = !1)
                    }.bind(this), 10)
                }.bind(this)
            }) : (this.wrapper.css({
                display: "block",
                opacity: 1
            }), this.positionOnFadeComplete && this.position() && (this.positionOnFadeComplete = !1)))
        }.bind(this);
        return !this.options.delayOpen || this.isOpen || this.isClosing || t.ignoreDelay ? i() : this.timer = setTimeout(i, this.options.delayOpen), this
    }, a.prototype.close = function(t) {
        if (t = t || {}, O("body").off("click.jBox-" + this.id), this.isTouchDevice && O("body > *").off("click.jBox-" + this.id), this.isDestroyed || this.isClosing) return this;
        if (this.timer && clearTimeout(this.timer), this._blockBodyClick(), this.isDisabled) return this;
        var i = function() {
            if (this._fireEvent("onClose"), this.options.cancelAjaxOnClose && this.cancelAjax(), this.isOpen) {
                this.isOpen = !1, this._detachEvents(), this.options.blockScroll && (this.options.blockScrollAdjust ? (a.blockScrollScopes = a.blockScrollScopes ? --a.blockScrollScopes : 0) || this.unscroll.reset() : O("body").removeClass("jBox-blockScroll-" + this.id)), this.options.overlay && this._hideOverlay(), this.options.animation && !this.isOpening && this._animate("close"), this.options.audio && this.options.audio.close && this.audio(this.options.audio.close, this.options.volume.close);
                var t = this.isTouchDevice && "mouse" == this.options.target ? 0 : this.options.fade;
                t ? this.wrapper.stop().animate({
                    opacity: 0
                }, {
                    queue: !1,
                    duration: t,
                    start: function() {
                        this.isClosing = !0
                    }.bind(this),
                    complete: function() {
                        this.wrapper.css({
                            display: "none"
                        }), this._fireEvent("onCloseComplete")
                    }.bind(this),
                    always: function() {
                        this.isClosing = !1
                    }.bind(this)
                }) : (this.wrapper.css({
                    display: "none",
                    opacity: 0
                }), this._fireEvent("onCloseComplete"))
            }
        }.bind(this);
        if (t.ignoreDelay || this.isTouchDevice && "mouse" == this.options.target) i();
        else if ((this.options.delayOnHover || this.options.showCountdown) && 10 < this.options.delayClose) {
            var o = this,
                s = this.options.delayClose,
                e = Date.now();
            if (this.options.showCountdown && !this.inner) {
                var n = O('<div class="jBox-countdown" />');
                this.inner = O('<div class="jBox-countdown-inner" />'), n.prepend(this.inner), O("#" + this.id).append(n)
            }
            this.countdown = function() {
                var t = Date.now();
                o.isHovered || (s -= t - e), e = t, 0 < s ? (o.options.showCountdown && o.inner.css("width", 100 * s / o.options.delayClose + "%"), window.requestAnimationFrame(o.countdown)) : i()
            }, window.requestAnimationFrame(this.countdown)
        } else this.timer = setTimeout(i, Math.max(this.options.delayClose, 10));
        return this
    }, a.prototype.toggle = function(t) {
        return this[this.isOpen ? "close" : "open"](t), this
    }, a.prototype.disable = function() {
        return this.isDisabled = !0, this
    }, a.prototype.enable = function() {
        return this.isDisabled = !1, this
    }, a.prototype.hide = function() {
        return this.disable(), this.wrapper && (this.cacheWrapperDisplay = this.wrapper.css("display"), this.wrapper.css({
            display: "none"
        })), this.overlay && (this.cacheOverlayDisplay = this.overlay.css("display"), this.overlay.css({
            display: "none"
        })), this
    }, a.prototype.show = function() {
        return this.enable(), this.wrapper && this.cacheWrapperDisplay && (this.wrapper.css({
            display: this.cacheWrapperDisplay
        }), this.cacheWrapperDisplay = null), this.overlay && this.cacheOverlayDisplay && (this.overlay.css({
            display: this.cacheOverlayDisplay
        }), this.cacheOverlayDisplay = null), this
    }, a.prototype.ajax = function(o, i) {
        o = o || {}, O.each([
            ["getData", "data"],
            ["getURL", "url"]
        ], function(t, i) {
            this.options.ajax[i[0]] && !o[i[1]] && this.source && null != this.source.attr(this.options.ajax[i[0]]) && (o[i[1]] = this.source.attr(this.options.ajax[i[0]]) || "")
        }.bind(this));
        var t = O.extend(!0, {}, this.options.ajax);
        this.cancelAjax();
        var s = o.beforeSend || t.beforeSend || function() {},
            e = o.complete || t.complete || function() {},
            n = o.success || t.success || function() {},
            a = o.error || t.error || function() {},
            r = O.extend(!0, t, o);
        return r.beforeSend = function(t) {
            r.loadingClass && this.wrapper.addClass(!0 === r.loadingClass ? "jBox-loading" : r.loadingClass), r.spinner && (this.spinnerDelay = setTimeout(function() {
                this.wrapper.addClass("jBox-loading-spinner"), r.spinnerReposition && (i ? this.positionOnFadeComplete = !0 : this.position()), this.spinner = O(!0 !== r.spinner ? r.spinner : '<div class="jBox-spinner"></div>').appendTo(this.container), this.titleContainer && "absolute" == this.spinner.css("position") && this.spinner.css({
                    transform: "translateY(" + .5 * this.titleContainer.outerHeight() + "px)"
                })
            }.bind(this), "" != this.content.html() && r.spinnerDelay || 0)), s.bind(this)(t)
        }.bind(this), r.complete = function(t) {
            this.spinnerDelay && clearTimeout(this.spinnerDelay), this.wrapper.removeClass("jBox-loading jBox-loading-spinner jBox-loading-spinner-delay"), this.spinner && this.spinner.length && this.spinner.remove() && r.spinnerReposition && (i ? this.positionOnFadeComplete = !0 : this.position()), this.ajaxLoaded = !0, e.bind(this)(t)
        }.bind(this), r.success = function(t) {
            r.setContent && this.setContent(t, !0) && (i ? this.positionOnFadeComplete = !0 : this.position()), r.setContent && this.source && this.source.data("jBox-ajax-data", t), n.bind(this)(t)
        }.bind(this), r.error = function(t) {
            a.bind(this)(t)
        }.bind(this), this.ajaxRequest = O.ajax(r), this
    }, a.prototype.cancelAjax = function() {
        this.ajaxRequest && (this.ajaxRequest.abort(), this.ajaxLoaded = !1)
    }, a.prototype.audio = function(t, i) {
        if (!t) return this;
        if (a._audio || (a._audio = {}), !a._audio[t]) {
            var o = O("<audio/>");
            O("<source/>", {
                src: t + ".mp3"
            }).appendTo(o), O("<source/>", {
                src: t + ".ogg"
            }).appendTo(o), a._audio[t] = o[0]
        }
        a._audio[t].volume = Math.min((null != i ? i : 100) / 100, 1);
        try {
            a._audio[t].pause(), a._audio[t].currentTime = 0
        } catch (t) {}
        return a._audio[t].play(), this
    }, a._animationSpeeds = {
        tada: 1e3,
        tadaSmall: 1e3,
        flash: 500,
        shake: 400,
        pulseUp: 250,
        pulseDown: 250,
        popIn: 250,
        popOut: 250,
        fadeIn: 200,
        fadeOut: 200,
        slideUp: 400,
        slideRight: 400,
        slideLeft: 400,
        slideDown: 400
    }, a.prototype.animate = function(t, i) {
        i = i || {}, this.animationTimeout || (this.animationTimeout = {}), i.element || (i.element = this.wrapper), i.element.data("jBox-animating-id") || i.element.data("jBox-animating-id", a._getUniqueElementID()), i.element.data("jBox-animating") && (i.element.removeClass(i.element.data("jBox-animating")).data("jBox-animating", null), this.animationTimeout[i.element.data("jBox-animating-id")] && clearTimeout(this.animationTimeout[i.element.data("jBox-animating-id")])), i.element.addClass("jBox-animated-" + t).data("jBox-animating", "jBox-animated-" + t), this.animationTimeout[i.element.data("jBox-animating-id")] = setTimeout(function() {
            i.element.removeClass(i.element.data("jBox-animating")).data("jBox-animating", null), i.complete && i.complete()
        }, a._animationSpeeds[t])
    }, a.prototype.swipeDetector = function(i, s) {
        var e = 0,
            n = 0,
            a = 0,
            r = 0,
            h = 0,
            t = {
                swipeThreshold: 70,
                useOnlyTouch: !1
            };

        function o(t) {
            s.useOnlyTouch && !t.originalEvent.touches || (t.originalEvent.touches && (t = t.originalEvent.touches[0]), 0 === e && (e = 1, n = t.clientX, a = t.clientY))
        }

        function p(t) {
            2 === e && (e = 0, Math.abs(r) > Math.abs(h) && Math.abs(r) > s.swipeThreshold ? r < 0 ? i.trigger($.Event("swipeLeft.sd")) : i.trigger($.Event("swipeRight.sd")) : Math.abs(h) > s.swipeThreshold && (h < 0 ? i.trigger($.Event("swipeUp.sd")) : i.trigger($.Event("swipeDown.sd"))))
        }

        function l(t) {
            if (1 === e) {
                t.originalEvent.touches && (t = t.originalEvent.touches[0]);
                var i = t.clientX - n,
                    o = t.clientY - a;
                (Math.abs(i) > s.swipeThreshold || Math.abs(o) > s.swipeThreshold) && (e = 2, r = i, h = o)
            }
        }
        return s = O.extend(t, s), i.on("mousedown touchstart", o), $("html").on("mouseup touchend", p), $("html").on("mousemove touchmove", l), i
    }, a.prototype.destroy = function() {
        return this.detach(), this.isOpen && this.close({
            ignoreDelay: !0
        }), this.wrapper && this.wrapper.remove(), this.overlay && this.overlay.remove(), this._styles && this._styles.remove(), this.isDestroyed = !0, this
    }, a._getUniqueID = (t = 1, function() {
        return t++
    }), a._getUniqueElementID = (i = 1, function() {
        return i++
    }), a._pluginOptions = {}, a.plugin = function(t, i) {
        a._pluginOptions[t] = i
    }, O.fn.jBox = function(t, i) {
        return i = i || {}, new a(t = t || {}, O.extend(i, {
            attach: this
        }))
    }, a
}

function jBoxConfirmWrapper(jBox, jQuery) {
    new jBox.plugin("Confirm", {
        confirmButton: "Submit",
        cancelButton: "Cancel",
        confirm: null,
        cancel: null,
        closeOnConfirm: !0,
        target: window,
        fixed: !0,
        attach: "[data-confirm]",
        getContent: "data-confirm",
        content: "Do you really want to do this?",
        minWidth: 360,
        maxWidth: 500,
        blockScroll: !0,
        closeOnEsc: !0,
        closeOnClick: !1,
        closeButton: !1,
        overlay: !0,
        animation: "zoomIn",
        preventDefault: !0,
        _onAttach: function(t) {
            if (!this.options.confirm) {
                var i = t.attr("onclick") ? t.attr("onclick") : t.attr("href") ? t.attr("target") ? 'window.open("' + t.attr("href") + '", "' + t.attr("target") + '");' : 'window.location.href = "' + t.attr("href") + '";' : "";
                t.prop("onclick", null).data("jBox-Confirm-submit", i)
            }
        },
        _onCreated: function() {
            this.wrapper.addClass("jBox-Modal"), this.footer = jQuery('<div class="jBox-Confirm-footer"/>'), jQuery('<div class="jBox-Confirm-button jBox-Confirm-button-cancel"/>').html(this.options.cancelButton).click(function() {
                this.options.cancel && this.options.cancel(this.source), this.close()
            }.bind(this)).appendTo(this.footer), this.submitButton = jQuery('<div class="jBox-Confirm-button jBox-Confirm-button-submit"/>').html(this.options.confirmButton).appendTo(this.footer), this.footer.appendTo(this.container)
        },
        _onOpen: function() {
            this.submitButton.off("click.jBox-Confirm" + this.id).on("click.jBox-Confirm" + this.id, function() {
                this.options.confirm ? this.options.confirm(this.source) : eval(this.source.data("jBox-Confirm-submit")), this.options.closeOnConfirm && this.close()
            }.bind(this))
        }
    })
}

function jBoxImageWrapper(t, r) {
    new t.plugin("Image", {
        src: "href",
        gallery: "data-jbox-image",
        imageLabel: "title",
        imageFade: 360,
        imageSize: "contain",
        imageCounter: !1,
        imageCounterSeparator: "/",
        downloadButton: !1,
        downloadButtonText: null,
        downloadButtonUrl: null,
        mobileImageAttr: null,
        mobileImageBreakpoint: null,
        preloadFirstImage: !1,
        target: window,
        attach: "[data-jbox-image]",
        fixed: !0,
        blockScroll: !0,
        closeOnEsc: !0,
        closeOnClick: "button",
        closeButton: !0,
        overlay: !0,
        animation: "zoomIn",
        preventDefault: !0,
        width: "100%",
        height: "100%",
        adjustDistance: {
            top: 40,
            right: 0,
            bottom: 40,
            left: 0
        },
        _onInit: function() {
            this.images = this.currentImage = {}, this.imageZIndex = 1, this.initImage = function(t) {
                if (!(t = r(t)).data("jBox-image-gallery")) {
                    var i = t.attr(this.options.src);
                    this.options.mobileImageAttr && this.options.mobileImageBreakpoint && t.attr(this.options.mobileImageAttr) && r(window).width() <= this.options.mobileImageBreakpoint && (i = t.attr(this.options.mobileImageAttr));
                    var o = t.attr(this.options.gallery) || "default";
                    this.images[o] || (this.images[o] = []), this.images[o].push({
                        src: i,
                        label: t.attr(this.options.imageLabel) || "",
                        downloadUrl: this.options.downloadButtonUrl && t.attr(this.options.downloadButtonUrl) ? t.attr(this.options.downloadButtonUrl) : null
                    }), "title" == this.options.imageLabel && t.removeAttr("title"), t.data("jBox-image-gallery", o), t.data("jBox-image-id", this.images[o].length - 1)
                }
            }.bind(this), this.attachedElements && this.attachedElements.length && r.each(this.attachedElements, function(t, i) {
                this.initImage(i)
            }.bind(this));
            var n = function(t, i, o, s) {
                if (!r("#jBox-image-" + t + "-" + i).length) {
                    var e = r("<div/>", {
                        id: "jBox-image-" + t + "-" + i,
                        class: "jBox-image-container" + (o ? " jBox-image-" + t + "-current" : "")
                    }).css({
                        backgroundSize: this.options.imageSize,
                        opacity: s ? 1 : 0,
                        zIndex: o ? this.imageZIndex++ : 0
                    }).appendTo(this.content);
                    return this.swipeDetector(e).on("swipeLeft.sd swipeRight.sd", function(t) {
                        "swipeLeft" === t.type ? this.showImage("next") : "swipeRight" === t.type && this.showImage("prev")
                    }.bind(this)), r("<div/>", {
                        id: "jBox-image-label-" + t + "-" + i,
                        class: "jBox-image-label" + (o ? " active" : "")
                    }).html(this.images[t][i].label).click(function() {
                        r(this).toggleClass("expanded")
                    }).appendTo(this.imageLabelContainer), o && e.animate({
                        opacity: 1
                    }, s ? 0 : this.options.imageFade), e
                }
            }.bind(this);
            this.downloadImage = function(t) {
                var i = document.createElement("a");
                i.href = t, i.setAttribute("download", t.substring(t.lastIndexOf("/") + 1)), document.body.appendChild(i), i.click()
            };
            var a = function(i, o, t, s) {
                var e = n(i, o, t, s);
                e.addClass("jBox-image-loading"), r('<img src="' + this.images[i][o].src + '" />').each(function() {
                    var t = new Image;
                    t.onload = function() {
                        e.removeClass("jBox-image-loading"), e.css({
                            backgroundImage: 'url("' + this.images[i][o].src + '")'
                        })
                    }.bind(this), t.onerror = function() {
                        e.removeClass("jBox-image-loading"), e.addClass("jBox-image-not-found")
                    }.bind(this), t.src = this.images[i][o].src
                }.bind(this))
            }.bind(this);
            this.showImage = function(t) {
                if ("open" != t) {
                    var i = this.currentImage.gallery;
                    o = (o = this.currentImage.id + (+("prev" == t) ? -1 : 1)) > this.images[i].length - 1 ? 0 : o < 0 ? this.images[i].length - 1 : o
                } else {
                    if (this.source) {
                        i = this.source.data("jBox-image-gallery");
                        var o = this.source.data("jBox-image-id")
                    } else {
                        if (!this.attachedElements || !this.attachedElements.length) return;
                        i = r(this.attachedElements[0]).data("jBox-image-gallery"), o = r(this.attachedElements[0]).data("jBox-image-id")
                    }
                    r(".jBox-image-pointer-prev, .jBox-image-pointer-next").css({
                        display: 1 < this.images[i].length ? "block" : "none"
                    })
                }
                var s, e;
                if (r(".jBox-image-" + i + "-current").length && r(".jBox-image-" + i + "-current").removeClass("jBox-image-" + i + "-current").animate({
                        opacity: 0
                    }, "open" == t ? 0 : this.options.imageFade), this.currentImage = {
                        gallery: i,
                        id: o
                    }, r("#jBox-image-" + i + "-" + o).length ? r("#jBox-image-" + i + "-" + o).addClass("jBox-image-" + i + "-current").css({
                        zIndex: this.imageZIndex++,
                        opacity: 0
                    }).animate({
                        opacity: 1
                    }, "open" == t ? 0 : this.options.imageFade) : a(i, o, !0, "open" === t), s = i, e = o, r(".jBox-image-label.active").removeClass("active expanded"), r("#jBox-image-label-" + s + "-" + e).addClass("active"), this.imageCounter && (1 < this.images[i].length ? (this.wrapper.addClass("jBox-image-has-counter"), this.imageCounter.find(".jBox-image-counter-all").html(this.images[i].length), this.imageCounter.find(".jBox-image-counter-current").html(o + 1)) : this.wrapper.removeClass("jBox-image-has-counter")), this.images[i].length - 1) {
                    var n = o + 1;
                    n = n > this.images[i].length - 1 ? 0 : n < 0 ? this.images[i].length - 1 : n, r("#jBox-image-" + i + "-" + n).length || a(i, n, !1, !1)
                }
            }, this.options.preloadFirstImage && r(window).on("load", function() {
                this.showImage("open")
            }.bind(this))
        },
        _onAttach: function(t) {
            this.initImage && this.initImage(t)
        },
        _onCreated: function() {
            this.imageLabelWrapper = r('<div class="jBox-image-label-wrapper"/>').appendTo(this.wrapper), this.imagePrevButton = r('<div class="jBox-image-pointer-prev"/>').on("click", function() {
                this.showImage("prev")
            }.bind(this)), this.imageNextButton = r('<div class="jBox-image-pointer-next"/>').on("click", function() {
                this.showImage("next")
            }.bind(this)), this.imageLabelContainer = r('<div class="jBox-image-label-container"/>'), this.imageLabelWrapper.append(this.imagePrevButton).append(this.imageLabelContainer).append(this.imageNextButton), this.options.downloadButton && (this.downloadButton = r("<div/>", {
                class: "jBox-image-download-button-wrapper"
            }).appendTo(this.wrapper).append(this.options.downloadButtonText ? r("<div/>", {
                class: "jBox-image-download-button-text"
            }).html(this.options.downloadButtonText) : null).append(r("<div/>", {
                class: "jBox-image-download-button-icon"
            })).on("click touchdown", function() {
                if (this.images[this.currentImage.gallery][this.currentImage.id].downloadUrl) var t = this.images[this.currentImage.gallery][this.currentImage.id].downloadUrl;
                else t = this.wrapper.find(".jBox-image-" + this.currentImage.gallery + "-current")[0].style.backgroundImage.slice(4, -1).replace(/["']/g, "");
                this.downloadImage(t)
            }.bind(this))), this.options.imageCounter && (this.imageCounter = r("<div/>", {
                class: "jBox-image-counter-container"
            }).insertAfter(this.imageLabelContainer), this.imageCounter.append(r("<span/>", {
                class: "jBox-image-counter-current"
            })).append(r("<span/>").html(this.options.imageCounterSeparator)).append(r("<span/>", {
                class: "jBox-image-counter-all"
            })))
        },
        _onOpen: function() {
            r(document).on("keyup.jBox-Image-" + this.id, function(t) {
                37 == t.keyCode && this.showImage("prev"), 39 == t.keyCode && this.showImage("next")
            }.bind(this)), this.showImage("open")
        },
        _onClose: function() {
            r(document).off("keyup.jBox-Image-" + this.id)
        },
        _onCloseComplete: function() {
            this.wrapper.find(".jBox-image-container").css("opacity", 0)
        }
    })
}

function jBoxNoticeWrapper(t, n) {
    new t.plugin("Notice", {
        color: null,
        stack: !0,
        stackSpacing: 10,
        autoClose: 6e3,
        attributes: {
            x: "right",
            y: "top"
        },
        position: {
            x: 15,
            y: 15
        },
        responsivePositions: {
            500: {
                x: 5,
                y: 5
            },
            768: {
                x: 10,
                y: 10
            }
        },
        target: window,
        fixed: !0,
        animation: "zoomIn",
        closeOnClick: "box",
        zIndex: 12e3,
        _onInit: function() {
            this.defaultNoticePosition = n.extend({}, this.options.position), this._adjustNoticePositon = function() {
                var t = n(window),
                    o = t.width();
                t.height();
                this.options.position = n.extend({}, this.defaultNoticePosition), n.each(this.options.responsivePositions, function(t, i) {
                    if (o <= t) return this.options.position = i, !1
                }.bind(this)), this.options.adjustDistance = {
                    top: this.options.position.y,
                    right: this.options.position.x,
                    bottom: this.options.position.y,
                    left: this.options.position.x
                }
            }, this.options.content instanceof n && (this.options.content = this.options.content.clone().attr("id", "")), n(window).on("resize.responsivejBoxNotice-" + this.id, function(t) {
                this.isOpen && this._adjustNoticePositon()
            }.bind(this)), this.open()
        },
        _onCreated: function() {
            this.wrapper.addClass("jBox-Notice-color jBox-Notice-" + (this.options.color || "gray")), this.wrapper.data("jBox-Notice-position", this.options.attributes.x + "-" + this.options.attributes.y)
        },
        _onOpen: function() {
            this.options.stack || (this._adjustNoticePositon(), n.each(n(".jBox-Notice"), function(t, i) {
                (i = n(i)).attr("id") != this.id && i.data("jBox-Notice-position") == this.options.attributes.x + "-" + this.options.attributes.y && (this.options.stack || i.data("jBox").close({
                    ignoreDelay: !0
                }))
            }.bind(this)))
        },
        _onPosition: function() {
            var s = {};
            for (var t in n.each(n(".jBox-Notice"), function(t, i) {
                    var o = (i = n(i)).data("jBox-Notice-position");
                    s[o] || (s[o] = []), s[o].push(i)
                }), s) {
                var i = t.split("-")[1];
                s[t].reverse();
                var o = 0;
                for (var e in s[t]) el = s[t][e], el.css("margin-" + i, o), o += el.outerHeight() + this.options.stackSpacing
            }
        },
        _onCloseComplete: function() {
            this.destroy(), this.options._onPosition.bind(this).call()
        }
    })
}! function(i, o) {
    "function" == typeof define && define.amd ? define(["jquery"], function(t) {
        return i.jBox = o(t)
    }) : "object" == typeof module && module.exports ? module.exports = i.jBox = o(require("jquery")) : i.jBox = o(i.jQuery)
}(this, function(t) {
    var i = jBoxWrapper(t);
    try {
        void 0 !== jBoxConfirmWrapper && jBoxConfirmWrapper && jBoxConfirmWrapper(i, t)
    } catch (t) {
        console.error(t)
    }
    try {
        void 0 !== jBoxImageWrapper && jBoxImageWrapper && jBoxImageWrapper(i, t)
    } catch (t) {
        console.error(t)
    }
    try {
        void 0 !== jBoxNoticeWrapper && jBoxNoticeWrapper && jBoxNoticeWrapper(i, t)
    } catch (t) {
        console.error(t)
    }
    return i
});