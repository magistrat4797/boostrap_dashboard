var qq = function(a) {
    "use strict";
    return {
        hide: function() {
            return a.style.display = "none", this;
        },
        attach: function(b, c) {
            return a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c), 
            function() {
                qq(a).detach(b, c);
            };
        },
        detach: function(b, c) {
            return a.removeEventListener ? a.removeEventListener(b, c, !1) : a.attachEvent && a.detachEvent("on" + b, c), 
            this;
        },
        contains: function(b) {
            return a === b ? !0 : a.contains ? a.contains(b) : !!(8 & b.compareDocumentPosition(a));
        },
        insertBefore: function(b) {
            return b.parentNode.insertBefore(a, b), this;
        },
        remove: function() {
            return a.parentNode.removeChild(a), this;
        },
        css: function(b) {
            return null !== b.opacity && "string" != typeof a.style.opacity && "undefined" != typeof a.filters && (b.filter = "alpha(opacity=" + Math.round(100 * b.opacity) + ")"), 
            qq.extend(a.style, b), this;
        },
        hasClass: function(b) {
            var c = new RegExp("(^| )" + b + "( |$)");
            return c.test(a.className);
        },
        addClass: function(b) {
            return qq(a).hasClass(b) || (a.className += " " + b), this;
        },
        removeClass: function(b) {
            var c = new RegExp("(^| )" + b + "( |$)");
            return a.className = a.className.replace(c, " ").replace(/^\s+|\s+$/g, ""), this;
        },
        getByClass: function(b) {
            var c, d = [];
            return a.querySelectorAll ? a.querySelectorAll("." + b) : (c = a.getElementsByTagName("*"), 
            qq.each(c, function(a, c) {
                qq(c).hasClass(b) && d.push(c);
            }), d);
        },
        children: function() {
            for (var b = [], c = a.firstChild; c; ) 1 === c.nodeType && b.push(c), c = c.nextSibling;
            return b;
        },
        setText: function(b) {
            return a.innerText = b, a.textContent = b, this;
        },
        clearText: function() {
            return qq(a).setText("");
        }
    };
};

qq.log = function(a, b) {
    "use strict";
    window.console && (b && "info" !== b ? window.console[b] ? window.console[b](a) : window.console.log("<" + b + "> " + a) : window.console.log(a));
}, qq.isObject = function(a) {
    "use strict";
    return null !== a && a && "object" == typeof a && a.constructor === Object;
}, qq.isFunction = function(a) {
    "use strict";
    return "function" == typeof a;
}, qq.isFileOrInput = function(a) {
    "use strict";
    if (window.File && a instanceof File) return !0;
    if (window.HTMLInputElement) {
        if (a instanceof HTMLInputElement && a.type && "file" === a.type.toLowerCase()) return !0;
    } else if (a.tagName && "input" === a.tagName.toLowerCase() && a.type && "file" === a.type.toLowerCase()) return !0;
    return !1;
}, qq.isXhrUploadSupported = function() {
    "use strict";
    var a = document.createElement("input");
    return a.type = "file", void 0 !== a.multiple && "undefined" != typeof File && "undefined" != typeof FormData && "undefined" != typeof new XMLHttpRequest().upload;
}, qq.isFolderDropSupported = function(a) {
    "use strict";
    return a.items && a.items[0].webkitGetAsEntry;
}, qq.isFileChunkingSupported = function() {
    "use strict";
    return !qq.android() && qq.isXhrUploadSupported() && (File.prototype.slice || File.prototype.webkitSlice || File.prototype.mozSlice);
}, qq.extend = function(a, b, c) {
    "use strict";
    qq.each(b, function(b, d) {
        c && qq.isObject(d) ? (void 0 === a[b] && (a[b] = {}), qq.extend(a[b], d, !0)) : a[b] = d;
    });
}, qq.indexOf = function(a, b, c) {
    "use strict";
    if (a.indexOf) return a.indexOf(b, c);
    c = c || 0;
    var d = a.length;
    for (0 > c && (c += d); d > c; c += 1) if (a.hasOwnProperty(c) && a[c] === b) return c;
    return -1;
}, qq.getUniqueId = function() {
    "use strict";
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
        var b = 16 * Math.random() | 0, c = "x" == a ? b : 3 & b | 8;
        return c.toString(16);
    });
}, qq.ie = function() {
    "use strict";
    return -1 !== navigator.userAgent.indexOf("MSIE");
}, qq.ie10 = function() {
    "use strict";
    return -1 !== navigator.userAgent.indexOf("MSIE 10");
}, qq.safari = function() {
    "use strict";
    return void 0 !== navigator.vendor && -1 !== navigator.vendor.indexOf("Apple");
}, qq.chrome = function() {
    "use strict";
    return void 0 !== navigator.vendor && -1 !== navigator.vendor.indexOf("Google");
}, qq.firefox = function() {
    "use strict";
    return -1 !== navigator.userAgent.indexOf("Mozilla") && void 0 !== navigator.vendor && "" === navigator.vendor;
}, qq.windows = function() {
    "use strict";
    return "Win32" === navigator.platform;
}, qq.android = function() {
    "use strict";
    return -1 !== navigator.userAgent.toLowerCase().indexOf("android");
}, qq.preventDefault = function(a) {
    "use strict";
    a.preventDefault ? a.preventDefault() : a.returnValue = !1;
}, qq.toElement = function() {
    "use strict";
    var a = document.createElement("div");
    return function(b) {
        a.innerHTML = b;
        var c = a.firstChild;
        return a.removeChild(c), c;
    };
}(), qq.each = function(a, b) {
    "use strict";
    var c, d;
    if (a) for (c in a) if (Object.prototype.hasOwnProperty.call(a, c) && (d = b(c, a[c]), 
    d === !1)) break;
}, qq.obj2url = function(a, b, c) {
    "use strict";
    var d, e, f = [], g = "&", h = function(a, c) {
        var d = b ? /\[\]$/.test(b) ? b : b + "[" + c + "]" : c;
        "undefined" !== d && "undefined" !== c && f.push("object" == typeof a ? qq.obj2url(a, d, !0) : "[object Function]" === Object.prototype.toString.call(a) ? encodeURIComponent(d) + "=" + encodeURIComponent(a()) : encodeURIComponent(d) + "=" + encodeURIComponent(a));
    };
    if (!c && b) g = /\?/.test(b) ? /\?$/.test(b) ? "" : "&" : "?", f.push(b), f.push(qq.obj2url(a)); else if ("[object Array]" === Object.prototype.toString.call(a) && "undefined" != typeof a) for (d = -1, 
    e = a.length; e > d; d += 1) h(a[d], d); else if ("undefined" != typeof a && null !== a && "object" == typeof a) for (d in a) a.hasOwnProperty(d) && h(a[d], d); else f.push(encodeURIComponent(b) + "=" + encodeURIComponent(a));
    return b ? f.join(g) : f.join(g).replace(/^&/, "").replace(/%20/g, "+");
}, qq.obj2FormData = function(a, b, c) {
    "use strict";
    return b || (b = new FormData()), qq.each(a, function(a, d) {
        a = c ? c + "[" + a + "]" : a, qq.isObject(d) ? qq.obj2FormData(d, b, a) : qq.isFunction(d) ? b.append(encodeURIComponent(a), encodeURIComponent(d())) : b.append(encodeURIComponent(a), encodeURIComponent(d));
    }), b;
}, qq.obj2Inputs = function(a, b) {
    "use strict";
    var c;
    return b || (b = document.createElement("form")), qq.obj2FormData(a, {
        append: function(a, d) {
            c = document.createElement("input"), c.setAttribute("name", a), c.setAttribute("value", d), 
            b.appendChild(c);
        }
    }), b;
}, qq.setCookie = function(a, b, c) {
    var d = new Date(), e = "";
    c && (d.setTime(d.getTime() + 24 * c * 60 * 60 * 1e3), e = "; expires=" + d.toGMTString()), 
    document.cookie = a + "=" + b + e + "; path=/";
}, qq.getCookie = function(a) {
    for (var b, c = a + "=", d = document.cookie.split(";"), e = 0; e < d.length; e++) {
        for (b = d[e]; " " == b.charAt(0); ) b = b.substring(1, b.length);
        if (0 === b.indexOf(c)) return b.substring(c.length, b.length);
    }
}, qq.getCookieNames = function(a) {
    var b = document.cookie.split(";"), c = [];
    return qq.each(b, function(b, d) {
        d = d.trim();
        var e = d.indexOf("=");
        d.match(a) && c.push(d.substr(0, e));
    }), c;
}, qq.deleteCookie = function(a) {
    qq.setCookie(a, "", -1);
}, qq.areCookiesEnabled = function() {
    var a = 1e5 * Math.random(), b = "qqCookieTest:" + a;
    return qq.setCookie(b, 1), qq.getCookie(b) ? (qq.deleteCookie(b), !0) : !1;
}, qq.parseJson = function(json) {
    return "function" == typeof JSON.parse ? JSON.parse(json) : eval("(" + json + ")");
}, qq.DisposeSupport = function() {
    "use strict";
    var a = [];
    return {
        dispose: function() {
            var b;
            do b = a.shift(), b && b(); while (b);
        },
        attach: function() {
            var a = arguments;
            this.addDisposer(qq(a[0]).attach.apply(this, Array.prototype.slice.call(arguments, 1)));
        },
        addDisposer: function(b) {
            a.push(b);
        }
    };
}, qq.UploadButton = function(a) {
    this._options = {
        element: null,
        multiple: !1,
        acceptFiles: null,
        name: "file",
        onChange: function(a) {},
        hoverClass: "qq-upload-button-hover",
        focusClass: "qq-upload-button-focus"
    }, qq.extend(this._options, a), this._disposeSupport = new qq.DisposeSupport(), 
    this._element = this._options.element, qq(this._element).css({
        position: "relative",
        overflow: "hidden",
        direction: "ltr"
    }), this._input = this._createInput();
}, qq.UploadButton.prototype = {
    getInput: function() {
        return this._input;
    },
    reset: function() {
        this._input.parentNode && qq(this._input).remove(), qq(this._element).removeClass(this._options.focusClass), 
        this._input = this._createInput();
    },
    _createInput: function() {
        var a = document.createElement("input");
        this._options.multiple && a.setAttribute("multiple", "multiple"), this._options.acceptFiles && a.setAttribute("accept", this._options.acceptFiles), 
        a.setAttribute("type", "file"), a.setAttribute("id", "fileInput"), a.setAttribute("name", this._options.name), 
        qq(a).css({
            position: "absolute",
            right: 0,
            top: 0,
            fontFamily: "Arial",
            fontSize: "118px",
            margin: 0,
            padding: 0,
            cursor: "pointer",
            opacity: 0
        }), this._element.appendChild(a);
        var b = this;
        return this._disposeSupport.attach(a, "change", function() {
            b._options.onChange(a);
        }), this._disposeSupport.attach(a, "mouseover", function() {
            qq(b._element).addClass(b._options.hoverClass);
        }), this._disposeSupport.attach(a, "mouseout", function() {
            qq(b._element).removeClass(b._options.hoverClass);
        }), this._disposeSupport.attach(a, "focus", function() {
            qq(b._element).addClass(b._options.focusClass);
        }), this._disposeSupport.attach(a, "blur", function() {
            qq(b._element).removeClass(b._options.focusClass);
        }), window.attachEvent && a.setAttribute("tabIndex", "-1"), a;
    }
}, qq.FineUploaderBasic = function(a) {
    this._options = {
        debug: !1,
        button: null,
        multiple: !0,
        maxConnections: 3,
        disableCancelForFormUploads: !1,
        autoUpload: !0,
        request: {
            endpoint: "/server/upload",
            params: {},
            paramsInBody: !1,
            customHeaders: {},
            forceMultipart: !0,
            inputName: "qqfile",
            uuidName: "qquuid",
            totalFileSizeName: "qqtotalfilesize"
        },
        validation: {
            allowedExtensions: [],
            sizeLimit: 0,
            minSizeLimit: 0,
            stopOnFirstInvalidFile: !0
        },
        callbacks: {
            onSubmit: function(a, b) {},
            onComplete: function(a, b, c) {},
            onCancel: function(a, b) {},
            onUpload: function(a, b) {},
            onUploadChunk: function(a, b, c) {},
            onResume: function(a, b, c) {},
            onProgress: function(a, b, c, d) {},
            onError: function(a, b, c) {},
            onAutoRetry: function(a, b, c) {},
            onManualRetry: function(a, b) {},
            onValidateBatch: function(a) {},
            onValidate: function(a) {}
        },
        messages: {
            typeError: "{file} has an invalid extension. Valid extension(s): {extensions}.",
            sizeError: "{file} is too large, maximum file size is {sizeLimit}.",
            minSizeError: "{file} is too small, minimum file size is {minSizeLimit}.",
            emptyError: "{file} is empty, please select files again without it.",
            noFilesError: "No files to upload.",
            onLeave: "The files are being uploaded, if you leave now the upload will be cancelled."
        },
        retry: {
            enableAuto: !1,
            maxAutoAttempts: 3,
            autoAttemptDelay: 5,
            preventRetryResponseProperty: "preventRetry"
        },
        classes: {
            buttonHover: "qq-upload-button-hover",
            buttonFocus: "qq-upload-button-focus"
        },
        chunking: {
            enabled: !1,
            partSize: 2e6,
            paramNames: {
                partIndex: "qqpartindex",
                partByteOffset: "qqpartbyteoffset",
                chunkSize: "qqchunksize",
                totalFileSize: "qqtotalfilesize",
                totalParts: "qqtotalparts",
                filename: "qqfilename"
            }
        },
        resume: {
            enabled: !1,
            id: null,
            cookiesExpireIn: 7,
            paramNames: {
                resuming: "qqresume"
            }
        },
        formatFileName: function(a) {
            return a.length > 33 && (a = a.slice(0, 19) + "..." + a.slice(-14)), a;
        },
        text: {
            sizeSymbols: [ "kB", "MB", "GB", "TB", "PB", "EB" ]
        }
    }, qq.extend(this._options, a, !0), this._wrapCallbacks(), this._disposeSupport = new qq.DisposeSupport(), 
    this._filesInProgress = [], this._storedFileIds = [], this._autoRetries = [], this._retryTimeouts = [], 
    this._preventRetries = [], this._paramsStore = this._createParamsStore(), this._endpointStore = this._createEndpointStore(), 
    this._handler = this._createUploadHandler(), this._options.button && (this._button = this._createUploadButton(this._options.button)), 
    this._preventLeaveInProgress();
}, qq.FineUploaderBasic.prototype = {
    log: function(a, b) {
        !this._options.debug || b && "info" !== b ? b && "info" !== b && qq.log("[FineUploader] " + a, b) : qq.log("[FineUploader] " + a);
    },
    setParams: function(a, b) {
        null == b ? this._options.request.params = a : this._paramsStore.setParams(a, b);
    },
    setEndpoint: function(a, b) {
        null == b ? this._options.request.endpoint = a : this._endpointStore.setEndpoint(a, b);
    },
    getInProgress: function() {
        return this._filesInProgress.length;
    },
    uploadStoredFiles: function() {
        "use strict";
        for (var a; this._storedFileIds.length; ) a = this._storedFileIds.shift(), this._filesInProgress.push(a), 
        this._handler.upload(a);
    },
    clearStoredFiles: function() {
        this._storedFileIds = [];
    },
    retry: function(a) {
        return this._onBeforeManualRetry(a) ? (this._handler.retry(a), !0) : !1;
    },
    cancel: function(a) {
        this._handler.cancel(a);
    },
    reset: function() {
        this.log("Resetting uploader..."), this._handler.reset(), this._filesInProgress = [], 
        this._storedFileIds = [], this._autoRetries = [], this._retryTimeouts = [], this._preventRetries = [], 
        this._button.reset(), this._paramsStore.reset(), this._endpointStore.reset();
    },
    addFiles: function(a) {
        var b, c, d = this, e = [];
        if (a) {
            for (window.FileList && a instanceof FileList || (a = [].concat(a)), b = 0; b < a.length; b += 1) c = a[b], 
            qq.isFileOrInput(c) ? e.push(c) : d.log(c + " is not a File or INPUT element!  Ignoring!", "warn");
            this.log("Processing " + e.length + " files or inputs..."), this._uploadFileList(e);
        }
    },
    getUuid: function(a) {
        return this._handler.getUuid(a);
    },
    getResumableFilesData: function() {
        return this._handler.getResumableFilesData();
    },
    getSize: function(a) {
        return this._handler.getSize(a);
    },
    getFile: function(a) {
        return this._handler.getFile(a);
    },
    _createUploadButton: function(a) {
        var b = this, c = new qq.UploadButton({
            element: a,
            multiple: this._options.multiple && qq.isXhrUploadSupported(),
            acceptFiles: this._options.validation.acceptFiles,
            onChange: function(a) {
                b._onInputChange(a);
            },
            hoverClass: this._options.classes.buttonHover,
            focusClass: this._options.classes.buttonFocus
        });
        return this._disposeSupport.addDisposer(function() {
            c.dispose();
        }), c;
    },
    _createUploadHandler: function() {
        var a = this;
        return new qq.UploadHandler({
            debug: this._options.debug,
            forceMultipart: this._options.request.forceMultipart,
            maxConnections: this._options.maxConnections,
            customHeaders: this._options.request.customHeaders,
            inputName: this._options.request.inputName,
            uuidParamName: this._options.request.uuidName,
            totalFileSizeParamName: this._options.request.totalFileSizeName,
            demoMode: this._options.demoMode,
            paramsInBody: this._options.request.paramsInBody,
            paramsStore: this._paramsStore,
            endpointStore: this._endpointStore,
            chunking: this._options.chunking,
            resume: this._options.resume,
            log: function(b, c) {
                a.log(b, c);
            },
            onProgress: function(b, c, d, e) {
                a._onProgress(b, c, d, e), a._options.callbacks.onProgress(b, c, d, e);
            },
            onComplete: function(b, c, d, e) {
                a._onComplete(b, c, d, e), a._options.callbacks.onComplete(b, c, d);
            },
            onCancel: function(b, c) {
                a._onCancel(b, c), a._options.callbacks.onCancel(b, c);
            },
            onUpload: function(b, c) {
                a._onUpload(b, c), a._options.callbacks.onUpload(b, c);
            },
            onUploadChunk: function(b, c, d) {
                a._options.callbacks.onUploadChunk(b, c, d);
            },
            onResume: function(b, c, d) {
                return a._options.callbacks.onResume(b, c, d);
            },
            onAutoRetry: function(b, c, d, e) {
                return a._preventRetries[b] = d[a._options.retry.preventRetryResponseProperty], 
                a._shouldAutoRetry(b, c, d) ? (a._maybeParseAndSendUploadError(b, c, d, e), a._options.callbacks.onAutoRetry(b, c, a._autoRetries[b] + 1), 
                a._onBeforeAutoRetry(b, c), a._retryTimeouts[b] = setTimeout(function() {
                    a._onAutoRetry(b, c, d);
                }, 1e3 * a._options.retry.autoAttemptDelay), !0) : !1;
            }
        });
    },
    _preventLeaveInProgress: function() {
        var a = this;
        this._disposeSupport.attach(window, "beforeunload", function(b) {
            if (a._filesInProgress.length) {
                var b = b || window.event;
                return b.returnValue = a._options.messages.onLeave, a._options.messages.onLeave;
            }
        });
    },
    _onSubmit: function(a, b) {
        this._options.autoUpload && this._filesInProgress.push(a);
    },
    _onProgress: function(a, b, c, d) {},
    _onComplete: function(a, b, c, d) {
        this._removeFromFilesInProgress(a), this._maybeParseAndSendUploadError(a, b, c, d);
    },
    _onCancel: function(a, b) {
        this._removeFromFilesInProgress(a), clearTimeout(this._retryTimeouts[a]);
        var c = qq.indexOf(this._storedFileIds, a);
        !this._options.autoUpload && c >= 0 && this._storedFileIds.splice(c, 1);
    },
    _removeFromFilesInProgress: function(a) {
        var b = qq.indexOf(this._filesInProgress, a);
        b >= 0 && this._filesInProgress.splice(b, 1);
    },
    _onUpload: function(a, b) {},
    _onInputChange: function(a) {
        qq.isXhrUploadSupported() ? this.addFiles(a.files) : this.addFiles(a), this._button.reset();
    },
    _onBeforeAutoRetry: function(a, b) {
        this.log("Waiting " + this._options.retry.autoAttemptDelay + " seconds before retrying " + b + "...");
    },
    _onAutoRetry: function(a, b, c) {
        this.log("Retrying " + b + "..."), this._autoRetries[a]++, this._handler.retry(a);
    },
    _shouldAutoRetry: function(a, b, c) {
        return !this._preventRetries[a] && this._options.retry.enableAuto ? (void 0 === this._autoRetries[a] && (this._autoRetries[a] = 0), 
        this._autoRetries[a] < this._options.retry.maxAutoAttempts) : !1;
    },
    _onBeforeManualRetry: function(a) {
        if (this._preventRetries[a]) return this.log("Retries are forbidden for id " + a, "warn"), 
        !1;
        if (this._handler.isValid(a)) {
            var b = this._handler.getName(a);
            return this._options.callbacks.onManualRetry(a, b) === !1 ? !1 : (this.log("Retrying upload for '" + b + "' (id: " + a + ")..."), 
            this._filesInProgress.push(a), !0);
        }
        return this.log("'" + a + "' is not a valid file ID", "error"), !1;
    },
    _maybeParseAndSendUploadError: function(a, b, c, d) {
        if (!c.success) if (d && 200 !== d.status && !c.error) this._options.callbacks.onError(a, b, "XHR returned response code " + d.status); else {
            var e = c.error ? c.error : "Upload failure reason unknown";
            this._options.callbacks.onError(a, b, e);
        }
    },
    _uploadFileList: function(a) {
        var b, c, d;
        if (b = this._getValidationDescriptors(a), d = this._options.callbacks.onValidateBatch(b) === !1, 
        !d) if (a.length > 0) {
            for (c = 0; c < a.length; c++) if (this._validateFile(a[c])) this._uploadFile(a[c]); else if (this._options.validation.stopOnFirstInvalidFile) return;
        } else this._error("noFilesError", "");
    },
    _uploadFile: function(a) {
        var b = this._handler.add(a), c = this._handler.getName(b);
        this._options.callbacks.onSubmit(b, c) !== !1 && (this._onSubmit(b, c), this._options.autoUpload ? this._handler.upload(b) : this._storeFileForLater(b));
    },
    _storeFileForLater: function(a) {
        this._storedFileIds.push(a);
    },
    _validateFile: function(a) {
        var b, c, d;
        return b = this._getValidationDescriptor(a), c = b.name, d = b.size, this._options.callbacks.onValidate(b) === !1 ? !1 : this._isAllowedExtension(c) ? 0 === d ? (this._error("emptyError", c), 
        !1) : d && this._options.validation.sizeLimit && d > this._options.validation.sizeLimit ? (this._error("sizeError", c), 
        !1) : d && d < this._options.validation.minSizeLimit ? (this._error("minSizeError", c), 
        !1) : !0 : (this._error("typeError", c), !1);
    },
    _error: function(a, b) {
        function c(a, b) {
            d = d.replace(a, b);
        }
        var d = this._options.messages[a], e = this._options.validation.allowedExtensions.join(", ").toLowerCase();
        return c("{file}", this._options.formatFileName(b)), c("{extensions}", e), c("{sizeLimit}", this._formatSize(this._options.validation.sizeLimit)), 
        c("{minSizeLimit}", this._formatSize(this._options.validation.minSizeLimit)), this._options.callbacks.onError(null, b, d), 
        d;
    },
    _isAllowedExtension: function(a) {
        var b = this._options.validation.allowedExtensions, c = !1;
        return b.length ? (qq.each(b, function(b, d) {
            var e = new RegExp("\\." + d + "$", "i");
            return null != a.match(e) ? (c = !0, !1) : void 0;
        }), c) : !0;
    },
    _formatSize: function(a) {
        var b = -1;
        do a /= 1024, b++; while (a > 99);
        return Math.max(a, .1).toFixed(1) + this._options.text.sizeSymbols[b];
    },
    _wrapCallbacks: function() {
        var a, b;
        a = this, b = function(b, c, d) {
            try {
                return c.apply(a, d);
            } catch (e) {
                a.log("Caught exception in '" + b + "' callback - " + e.message, "error");
            }
        };
        for (var c in this._options.callbacks) !function() {
            var d, e;
            d = c, e = a._options.callbacks[d], a._options.callbacks[d] = function() {
                return b(d, e, arguments);
            };
        }();
    },
    _parseFileName: function(a) {
        var b;
        return b = a.value ? a.value.replace(/.*(\/|\\)/, "") : null !== a.fileName && void 0 !== a.fileName ? a.fileName : a.name;
    },
    _parseFileSize: function(a) {
        var b;
        return a.value || (b = null !== a.fileSize && void 0 !== a.fileSize ? a.fileSize : a.size), 
        b;
    },
    _getValidationDescriptor: function(a) {
        var b, c, d;
        return d = {}, b = this._parseFileName(a), c = this._parseFileSize(a), d.name = b, 
        c && (d.size = c), d;
    },
    _getValidationDescriptors: function(a) {
        var b = this, c = [];
        return qq.each(a, function(a, d) {
            c.push(b._getValidationDescriptor(d));
        }), c;
    },
    _createParamsStore: function() {
        var a = {}, b = this;
        return {
            setParams: function(b, c) {
                var d = {};
                qq.extend(d, b), a[c] = d;
            },
            getParams: function(c) {
                var d = {};
                return null != c && a[c] ? qq.extend(d, a[c]) : qq.extend(d, b._options.request.params), 
                d;
            },
            remove: function(b) {
                return delete a[b];
            },
            reset: function() {
                a = {};
            }
        };
    },
    _createEndpointStore: function() {
        var a = {}, b = this;
        return {
            setEndpoint: function(b, c) {
                a[c] = b;
            },
            getEndpoint: function(c) {
                return null != c && a[c] ? a[c] : b._options.request.endpoint;
            },
            remove: function(b) {
                return delete a[b];
            },
            reset: function() {
                a = {};
            }
        };
    }
}, qq.DragAndDrop = function(a) {
    "use strict";
    function b() {
        m !== n || k || (i.callbacks.log("Grabbed " + l.length + " files after tree traversal."), 
        j.dropDisabled(!1), i.callbacks.dropProcessing(!1, l));
    }
    function c(a) {
        l.push(a), n += 1, b();
    }
    function d(a) {
        var e, f;
        m += 1, a.isFile ? a.file(function(a) {
            c(a);
        }) : a.isDirectory && (k = !0, e = a.createReader(), e.readEntries(function(a) {
            for (n += 1, f = 0; f < a.length; f += 1) d(a[f]);
            k = !1, a.length || b();
        }));
    }
    function e(a) {
        var c, e, f;
        if (i.callbacks.dropProcessing(!0), j.dropDisabled(!0), a.files.length > 1 && !i.multiple) i.callbacks.dropProcessing(!1), 
        i.callbacks.error("tooManyFilesError", ""), j.dropDisabled(!1); else if (l = [], 
        m = 0, n = 0, qq.isFolderDropSupported(a)) for (e = a.items, c = 0; c < e.length; c += 1) f = e[c].webkitGetAsEntry(), 
        f && (f.isFile ? (l.push(e[c].getAsFile()), c === e.length - 1 && b()) : d(f)); else i.callbacks.dropProcessing(!1, a.files), 
        j.dropDisabled(!1);
    }
    function f(a) {
        j = new qq.UploadDropZone({
            element: a,
            onEnter: function(b) {
                qq(a).addClass(i.classes.dropActive), b.stopPropagation();
            },
            onLeaveNotDescendants: function(b) {
                qq(a).removeClass(i.classes.dropActive);
            },
            onDrop: function(b) {
                i.hideDropzones && qq(a).hide(), qq(a).removeClass(i.classes.dropActive), e(b.dataTransfer);
            }
        }), o.addDisposer(function() {
            j.dispose();
        }), i.hideDropzones && qq(a).hide();
    }
    function g(a) {
        var b;
        return qq.each(a.dataTransfer.types, function(a, c) {
            return "Files" === c ? (b = !0, !1) : void 0;
        }), b;
    }
    function h() {
        i.dropArea && i.extraDropzones.push(i.dropArea);
        var a, b = i.extraDropzones;
        for (a = 0; a < b.length; a += 1) f(b[a]);
        !i.dropArea || qq.ie() && !qq.ie10() || o.attach(document, "dragenter", function(c) {
            if (!j.dropDisabled() && g(c)) {
                if (qq(i.dropArea).hasClass(i.classes.dropDisabled)) return;
                for (i.dropArea.style.display = "block", a = 0; a < b.length; a += 1) b[a].style.display = "block";
            }
        }), o.attach(document, "dragleave", function(c) {
            if (i.hideDropzones && qq.FineUploader.prototype._leaving_document_out(c)) for (a = 0; a < b.length; a += 1) qq(b[a]).hide();
        }), o.attach(document, "drop", function(c) {
            if (i.hideDropzones) for (a = 0; a < b.length; a += 1) qq(b[a]).hide();
            c.preventDefault();
        });
    }
    var i, j, k, l = [], m = 0, n = 0, o = new qq.DisposeSupport();
    return i = {
        dropArea: null,
        extraDropzones: [],
        hideDropzones: !0,
        multiple: !0,
        classes: {
            dropActive: null
        },
        callbacks: {
            dropProcessing: function(a, b) {},
            error: function(a, b) {},
            log: function(a, b) {}
        }
    }, qq.extend(i, a), {
        setup: function() {
            h();
        },
        setupExtraDropzone: function(a) {
            i.extraDropzones.push(a), f(a);
        },
        removeExtraDropzone: function(a) {
            var b, c = i.extraDropzones;
            for (b in c) if (c[b] === a) return c.splice(b, 1);
        },
        dispose: function() {
            o.dispose(), j.dispose();
        }
    };
}, qq.UploadDropZone = function(a) {
    "use strict";
    function b() {
        return qq.safari() || qq.firefox() && qq.windows();
    }
    function c(a) {
        j || (b ? k.attach(document, "dragover", function(a) {
            a.preventDefault();
        }) : k.attach(document, "dragover", function(a) {
            a.dataTransfer && (a.dataTransfer.dropEffect = "none", a.preventDefault());
        }), j = !0);
    }
    function d(a) {
        if (qq.ie() && !qq.ie10()) return !1;
        var b, c = a.dataTransfer, d = qq.safari();
        return b = qq.ie10() ? !0 : "none" !== c.effectAllowed, c && b && (c.files || !d && c.types.contains && c.types.contains("Files"));
    }
    function e(a) {
        return void 0 !== a && (i = a), i;
    }
    function f() {
        k.attach(h, "dragover", function(a) {
            if (d(a)) {
                var b = qq.ie() ? null : a.dataTransfer.effectAllowed;
                "move" === b || "linkMove" === b ? a.dataTransfer.dropEffect = "move" : a.dataTransfer.dropEffect = "copy", 
                a.stopPropagation(), a.preventDefault();
            }
        }), k.attach(h, "dragenter", function(a) {
            if (!e()) {
                if (!d(a)) return;
                g.onEnter(a);
            }
        }), k.attach(h, "dragleave", function(a) {
            if (d(a)) {
                g.onLeave(a);
                var b = document.elementFromPoint(a.clientX, a.clientY);
                qq(this).contains(b) || g.onLeaveNotDescendants(a);
            }
        }), k.attach(h, "drop", function(a) {
            if (!e()) {
                if (!d(a)) return;
                a.preventDefault(), g.onDrop(a);
            }
        });
    }
    var g, h, i, j, k = new qq.DisposeSupport();
    return g = {
        element: null,
        onEnter: function(a) {},
        onLeave: function(a) {},
        onLeaveNotDescendants: function(a) {},
        onDrop: function(a) {}
    }, qq.extend(g, a), h = g.element, c(), f(), {
        dropDisabled: function(a) {
            return e(a);
        },
        dispose: function() {
            k.dispose();
        }
    };
}, qq.FineUploader = function(a) {
    qq.FineUploaderBasic.apply(this, arguments), qq.extend(this._options, {
        element: null,
        listElement: null,
        dragAndDrop: {
            extraDropzones: [],
            hideDropzones: !0,
            disableDefaultDropzone: !1
        },
        text: {
            uploadButton: "Upload a file",
            cancelButton: "Cancel",
            retryButton: "Retry",
            failUpload: "Upload failed",
            dragZone: "Drop files here to upload",
            dropProcessing: "Processing dropped files...",
            formatProgress: "{percent}% of {total_size}",
            waitingForResponse: "Processing..."
        },
        template: '<div class="qq-uploader">' + (this._options.dragAndDrop && this._options.dragAndDrop.disableDefaultDropzone ? "" : '<div class="qq-upload-drop-area"><span>{dragZoneText}</span></div>') + (this._options.button ? "" : '<div class="qq-upload-button"><div>{uploadButtonText}</div></div>') + '<span class="qq-drop-processing"><span>{dropProcessingText}</span><span class="qq-drop-processing-spinner"></span></span>' + (this._options.listElement ? "" : '<ul class="qq-upload-list"></ul>') + "</div>",
        fileTemplate: '<li><div class="qq-progress-bar"></div><span class="qq-upload-spinner"></span><span class="qq-upload-finished"></span><span class="qq-upload-file"></span><span class="qq-upload-size"></span><a class="qq-upload-cancel" href="#">{cancelButtonText}</a><a class="qq-upload-retry" href="#">{retryButtonText}</a><span class="qq-upload-status-text">{statusText}</span></li>',
        classes: {
            button: "qq-upload-button",
            drop: "qq-upload-drop-area",
            dropActive: "qq-upload-drop-area-active",
            dropDisabled: "qq-upload-drop-area-disabled",
            list: "qq-upload-list",
            progressBar: "qq-progress-bar",
            file: "qq-upload-file",
            spinner: "qq-upload-spinner",
            finished: "qq-upload-finished",
            retrying: "qq-upload-retrying",
            retryable: "qq-upload-retryable",
            size: "qq-upload-size",
            cancel: "qq-upload-cancel",
            retry: "qq-upload-retry",
            statusText: "qq-upload-status-text",
            success: "qq-upload-success",
            fail: "qq-upload-fail",
            successIcon: null,
            failIcon: null,
            dropProcessing: "qq-drop-processing",
            dropProcessingSpinner: "qq-drop-processing-spinner"
        },
        failedUploadTextDisplay: {
            mode: "default",
            maxChars: 50,
            responseProperty: "error",
            enableTooltip: !0
        },
        messages: {
            tooManyFilesError: "You may only drop one file"
        },
        retry: {
            showAutoRetryNote: !0,
            autoRetryNote: "Retrying {retryNum}/{maxAuto}...",
            showButton: !1
        },
        showMessage: function(a) {
            setTimeout(function() {
                alert(a);
            }, 0);
        }
    }, !0), qq.extend(this._options, a, !0), this._wrapCallbacks(), this._options.template = this._options.template.replace(/\{dragZoneText\}/g, this._options.text.dragZone), 
    this._options.template = this._options.template.replace(/\{uploadButtonText\}/g, this._options.text.uploadButton), 
    this._options.template = this._options.template.replace(/\{dropProcessingText\}/g, this._options.text.dropProcessing), 
    this._options.fileTemplate = this._options.fileTemplate.replace(/\{cancelButtonText\}/g, this._options.text.cancelButton), 
    this._options.fileTemplate = this._options.fileTemplate.replace(/\{retryButtonText\}/g, this._options.text.retryButton), 
    this._options.fileTemplate = this._options.fileTemplate.replace(/\{statusText\}/g, ""), 
    this._element = this._options.element, this._element.innerHTML = this._options.template, 
    this._listElement = this._options.listElement || this._find(this._element, "list"), 
    this._classes = this._options.classes, this._button || (this._button = this._createUploadButton(this._find(this._element, "button"))), 
    this._bindCancelAndRetryEvents(), this._dnd = this._setupDragAndDrop();
}, qq.extend(qq.FineUploader.prototype, qq.FineUploaderBasic.prototype), qq.extend(qq.FineUploader.prototype, {
    clearStoredFiles: function() {
        qq.FineUploaderBasic.prototype.clearStoredFiles.apply(this, arguments), this._listElement.innerHTML = "";
    },
    addExtraDropzone: function(a) {
        this._dnd.setupExtraDropzone(a);
    },
    removeExtraDropzone: function(a) {
        return this._dnd.removeExtraDropzone(a);
    },
    getItemByFileId: function(a) {
        for (var b = this._listElement.firstChild; b; ) {
            if (b.qqFileId == a) return b;
            b = b.nextSibling;
        }
    },
    cancel: function(a) {
        qq.FineUploaderBasic.prototype.cancel.apply(this, arguments);
        var b = this.getItemByFileId(a);
        qq(b).remove();
    },
    reset: function() {
        qq.FineUploaderBasic.prototype.reset.apply(this, arguments), this._element.innerHTML = this._options.template, 
        this._listElement = this._options.listElement || this._find(this._element, "list"), 
        this._options.button || (this._button = this._createUploadButton(this._find(this._element, "button"))), 
        this._bindCancelAndRetryEvents(), this._dnd.dispose(), this._dnd = this._setupDragAndDrop();
    },
    _setupDragAndDrop: function() {
        var a, b, c, d = this, e = this._find(this._element, "dropProcessing");
        return b = function(a) {
            a.preventDefault();
        }, this._options.dragAndDrop.disableDefaultDropzone || (c = this._find(this._options.element, "drop")), 
        a = new qq.DragAndDrop({
            dropArea: c,
            extraDropzones: this._options.dragAndDrop.extraDropzones,
            hideDropzones: this._options.dragAndDrop.hideDropzones,
            multiple: this._options.multiple,
            classes: {
                dropActive: this._options.classes.dropActive
            },
            callbacks: {
                dropProcessing: function(a, c) {
                    var f = d._button.getInput();
                    a ? (qq(e).css({
                        display: "block"
                    }), qq(f).attach("click", b)) : (qq(e).hide(), qq(f).detach("click", b)), c && d.addFiles(c);
                },
                error: function(a, b) {
                    d._error(a, b);
                },
                log: function(a, b) {
                    d.log(a, b);
                }
            }
        }), a.setup(), a;
    },
    _leaving_document_out: function(a) {
        return (qq.chrome() || qq.safari() && qq.windows()) && 0 == a.clientX && 0 == a.clientY || qq.firefox() && !a.relatedTarget;
    },
    _storeFileForLater: function(a) {
        qq.FineUploaderBasic.prototype._storeFileForLater.apply(this, arguments);
        var b = this.getItemByFileId(a);
        qq(this._find(b, "spinner")).hide();
    },
    _find: function(a, b) {
        var c = qq(a).getByClass(this._options.classes[b])[0];
        if (!c) throw new Error("element not found " + b);
        return c;
    },
    _onSubmit: function(a, b) {
        qq.FineUploaderBasic.prototype._onSubmit.apply(this, arguments), this._addToList(a, b);
    },
    _onProgress: function(a, b, c, d) {
        qq.FineUploaderBasic.prototype._onProgress.apply(this, arguments);
        var e, f, g, h, i, j;
        e = this.getItemByFileId(a), f = this._find(e, "progressBar"), h = Math.round(c / d * 100), 
        c === d ? (i = this._find(e, "cancel"), qq(i).hide(), qq(f).hide(), qq(this._find(e, "statusText")).setText(this._options.text.waitingForResponse), 
        g = this._formatSize(d)) : (g = this._formatProgress(c, d), qq(f).css({
            display: "block"
        })), qq(f).css({
            width: h + "%"
        }), j = this._find(e, "size"), qq(j).css({
            display: "inline"
        }), qq(j).setText(g);
    },
    _onComplete: function(a, b, c, d) {
        qq.FineUploaderBasic.prototype._onComplete.apply(this, arguments);
        var e = this.getItemByFileId(a);
        qq(this._find(e, "statusText")).clearText(), qq(e).removeClass(this._classes.retrying), 
        qq(this._find(e, "progressBar")).hide(), (!this._options.disableCancelForFormUploads || qq.isXhrUploadSupported()) && qq(this._find(e, "cancel")).hide(), 
        qq(this._find(e, "spinner")).hide(), c.success ? (qq(e).addClass(this._classes.success), 
        this._classes.successIcon && (this._find(e, "finished").style.display = "inline-block", 
        qq(e).addClass(this._classes.successIcon))) : (qq(e).addClass(this._classes.fail), 
        this._classes.failIcon && (this._find(e, "finished").style.display = "inline-block", 
        qq(e).addClass(this._classes.failIcon)), this._options.retry.showButton && !this._preventRetries[a] && qq(e).addClass(this._classes.retryable), 
        this._controlFailureTextDisplay(e, c));
    },
    _onUpload: function(a, b) {
        qq.FineUploaderBasic.prototype._onUpload.apply(this, arguments);
        var c = this.getItemByFileId(a);
        this._showSpinner(c);
    },
    _onBeforeAutoRetry: function(a) {
        var b, c, d, e, f, g;
        qq.FineUploaderBasic.prototype._onBeforeAutoRetry.apply(this, arguments), b = this.getItemByFileId(a), 
        c = this._find(b, "progressBar"), this._showCancelLink(b), c.style.width = 0, qq(c).hide(), 
        this._options.retry.showAutoRetryNote && (d = this._find(b, "statusText"), e = this._autoRetries[a] + 1, 
        f = this._options.retry.maxAutoAttempts, g = this._options.retry.autoRetryNote.replace(/\{retryNum\}/g, e), 
        g = g.replace(/\{maxAuto\}/g, f), qq(d).setText(g), 1 === e && qq(b).addClass(this._classes.retrying));
    },
    _onBeforeManualRetry: function(a) {
        if (qq.FineUploaderBasic.prototype._onBeforeManualRetry.apply(this, arguments)) {
            var b = this.getItemByFileId(a);
            return this._find(b, "progressBar").style.width = 0, qq(b).removeClass(this._classes.fail), 
            qq(this._find(b, "statusText")).clearText(), this._showSpinner(b), this._showCancelLink(b), 
            !0;
        }
        return !1;
    },
    _addToList: function(a, b) {
        var c = qq.toElement(this._options.fileTemplate);
        if (this._options.disableCancelForFormUploads && !qq.isXhrUploadSupported()) {
            var d = this._find(c, "cancel");
            qq(d).remove();
        }
        c.qqFileId = a;
        var e = this._find(c, "file");
        qq(e).setText(this._options.formatFileName(b)), qq(this._find(c, "size")).hide(), 
        this._options.multiple || this._clearList(), this._listElement.appendChild(c);
    },
    _clearList: function() {
        this._listElement.innerHTML = "", this.clearStoredFiles();
    },
    _bindCancelAndRetryEvents: function() {
        var a = this, b = this._listElement;
        this._disposeSupport.attach(b, "click", function(b) {
            b = b || window.event;
            var c = b.target || b.srcElement;
            if (qq(c).hasClass(a._classes.cancel) || qq(c).hasClass(a._classes.retry)) {
                qq.preventDefault(b);
                for (var d = c.parentNode; void 0 == d.qqFileId; ) d = c = c.parentNode;
                qq(c).hasClass(a._classes.cancel) ? a.cancel(d.qqFileId) : (qq(d).removeClass(a._classes.retryable), 
                a.retry(d.qqFileId));
            }
        });
    },
    _formatProgress: function(a, b) {
        function c(a, b) {
            d = d.replace(a, b);
        }
        var d = this._options.text.formatProgress;
        return c("{percent}", Math.round(a / b * 100)), c("{total_size}", this._formatSize(b)), 
        d;
    },
    _controlFailureTextDisplay: function(a, b) {
        var c, d, e, f, g;
        c = this._options.failedUploadTextDisplay.mode, d = this._options.failedUploadTextDisplay.maxChars, 
        e = this._options.failedUploadTextDisplay.responseProperty, "custom" === c ? (f = b[e], 
        f ? f.length > d && (g = f.substring(0, d) + "...") : (f = this._options.text.failUpload, 
        this.log("'" + e + "' is not a valid property on the server response.", "warn")), 
        qq(this._find(a, "statusText")).setText(g || f), this._options.failedUploadTextDisplay.enableTooltip && this._showTooltip(a, f)) : "default" === c ? qq(this._find(a, "statusText")).setText(this._options.text.failUpload) : "none" !== c && this.log("failedUploadTextDisplay.mode value of '" + c + "' is not valid", "warn");
    },
    _showTooltip: function(a, b) {
        a.title = b;
    },
    _showSpinner: function(a) {
        var b = this._find(a, "spinner");
        b.style.display = "inline-block";
    },
    _showCancelLink: function(a) {
        if (!this._options.disableCancelForFormUploads || qq.isXhrUploadSupported()) {
            var b = this._find(a, "cancel");
            b.style.display = "inline";
        }
    },
    _error: function(a, b) {
        var c = qq.FineUploaderBasic.prototype._error.apply(this, arguments);
        this._options.showMessage(c);
    }
}), qq.UploadHandler = function(a) {
    "use strict";
    var b, c, d, e, f = [];
    return b = {
        debug: !1,
        forceMultipart: !0,
        paramsInBody: !1,
        paramsStore: {},
        endpointStore: {},
        maxConnections: 3,
        uuidParamName: "qquuid",
        totalFileSizeParamName: "qqtotalfilesize",
        chunking: {
            enabled: !1,
            partSize: 2e6,
            paramNames: {
                partIndex: "qqpartindex",
                partByteOffset: "qqpartbyteoffset",
                chunkSize: "qqchunksize",
                totalParts: "qqtotalparts",
                filename: "qqfilename"
            }
        },
        resume: {
            enabled: !1,
            id: null,
            cookiesExpireIn: 7,
            paramNames: {
                resuming: "qqresume"
            }
        },
        log: function(a, b) {},
        onProgress: function(a, b, c, d) {},
        onComplete: function(a, b, c, d) {},
        onCancel: function(a, b) {},
        onUpload: function(a, b) {},
        onUploadChunk: function(a, b, c) {},
        onAutoRetry: function(a, b, c, d) {},
        onResume: function(a, b, c) {}
    }, qq.extend(b, a), c = b.log, d = function(a) {
        var c, d = qq.indexOf(f, a), g = b.maxConnections;
        f.splice(d, 1), f.length >= g && g > d && (c = f[g - 1], e.upload(c));
    }, e = qq.isXhrUploadSupported() ? new qq.UploadHandlerXhr(b, d, c) : new qq.UploadHandlerForm(b, d, c), 
    {
        add: function(a) {
            return e.add(a);
        },
        upload: function(a) {
            var c = f.push(a);
            return c <= b.maxConnections ? e.upload(a) : void 0;
        },
        retry: function(a) {
            var b = qq.indexOf(f, a);
            return b >= 0 ? e.upload(a, !0) : this.upload(a);
        },
        cancel: function(a) {
            c("Cancelling " + a), b.paramsStore.remove(a), e.cancel(a), d(a);
        },
        cancelAll: function() {
            qq.each(f, function(a, b) {
                this.cancel(b);
            }), f = [];
        },
        getName: function(a) {
            return e.getName(a);
        },
        getSize: function(a) {
            return e.getSize ? e.getSize(a) : void 0;
        },
        getFile: function(a) {
            return e.getFile ? e.getFile(a) : void 0;
        },
        getQueue: function() {
            return f;
        },
        reset: function() {
            c("Resetting upload handler"), f = [], e.reset();
        },
        getUuid: function(a) {
            return e.getUuid(a);
        },
        isValid: function(a) {
            return e.isValid(a);
        },
        getResumableFilesData: function() {
            return e.getResumableFilesData ? e.getResumableFilesData() : [];
        }
    };
}, qq.UploadHandlerForm = function(o, uploadCompleteCallback, logCallback) {
    "use strict";
    function attachLoadEvent(a, b) {
        detachLoadEvents[a.id] = qq(a).attach("load", function() {
            if (log("Received response for " + a.id), a.parentNode) {
                try {
                    if (a.contentDocument && a.contentDocument.body && "false" == a.contentDocument.body.innerHTML) return;
                } catch (c) {
                    log("Error when attempting to access iframe during handling of upload response (" + c + ")", "error");
                }
                b();
            }
        });
    }
    function getIframeContentJson(iframe) {
        var response;
        try {
            var doc = iframe.contentDocument || iframe.contentWindow.document, innerHTML = doc.body.innerHTML;
            log("converting iframe's innerHTML to JSON"), log("innerHTML = " + innerHTML), innerHTML && innerHTML.match(/^<pre/i) && (innerHTML = doc.body.firstChild.firstChild.nodeValue), 
            response = eval("(" + innerHTML + ")");
        } catch (error) {
            log("Error when attempting to parse form upload response (" + error + ")", "error"), 
            response = {
                success: !1
            };
        }
        return response;
    }
    function createIframe(a) {
        var b = qq.toElement('<iframe src="javascript:false;" name="' + a + '" />');
        return b.setAttribute("id", a), b.style.display = "none", document.body.appendChild(b), 
        b;
    }
    function createForm(a, b) {
        var c = options.paramsStore.getParams(a), d = options.demoMode ? "GET" : "POST", e = qq.toElement('<form method="' + d + '" enctype="multipart/form-data"></form>'), f = options.endpointStore.getEndpoint(a), g = f;
        return c[options.uuidParamName] = uuids[a], options.paramsInBody ? qq.obj2Inputs(c, e) : g = qq.obj2url(c, f), 
        e.setAttribute("action", g), e.setAttribute("target", b.name), e.style.display = "none", 
        document.body.appendChild(e), e;
    }
    var options = o, inputs = [], uuids = [], detachLoadEvents = {}, uploadComplete = uploadCompleteCallback, log = logCallback, api;
    return api = {
        add: function(a) {
            a.setAttribute("name", options.inputName);
            var b = inputs.push(a) - 1;
            return uuids[b] = qq.getUniqueId(), a.parentNode && qq(a).remove(), b;
        },
        getName: function(a) {
            return inputs[a].value.replace(/.*(\/|\\)/, "");
        },
        isValid: function(a) {
            return void 0 !== inputs[a];
        },
        reset: function() {
            qq.UploadHandler.prototype.reset.apply(this, arguments), inputs = [], uuids = [], 
            detachLoadEvents = {};
        },
        getUuid: function(a) {
            return uuids[a];
        },
        cancel: function(a) {
            options.onCancel(a, this.getName(a)), delete inputs[a], delete uuids[a], delete detachLoadEvents[a];
            var b = document.getElementById(a);
            b && (b.setAttribute("src", "java" + String.fromCharCode(115) + "cript:false;"), 
            qq(b).remove());
        },
        upload: function(a) {
            var b = inputs[a], c = api.getName(a), d = createIframe(a), e = createForm(a, d);
            if (!b) throw new Error("file with passed id was not added, or already uploaded or cancelled");
            return options.onUpload(a, this.getName(a)), e.appendChild(b), attachLoadEvent(d, function() {
                log("iframe loaded");
                var b = getIframeContentJson(d);
                setTimeout(function() {
                    detachLoadEvents[a](), delete detachLoadEvents[a], qq(d).remove();
                }, 1), (b.success || !options.onAutoRetry(a, c, b)) && (options.onComplete(a, c, b), 
                uploadComplete(a));
            }), log("Sending upload request for " + a), e.submit(), qq(e).remove(), a;
        }
    };
}, qq.UploadHandlerXhr = function(a, b, c) {
    "use strict";
    function d(a, b, c) {
        var d = D.getSize(a), e = D.getName(a);
        b[E.chunking.paramNames.partIndex] = c.part, b[E.chunking.paramNames.partByteOffset] = c.start, 
        b[E.chunking.paramNames.chunkSize] = c.end - c.start, b[E.chunking.paramNames.totalParts] = c.count, 
        b[E.totalFileSizeParamName] = d, M && (b[E.chunking.paramNames.filename] = e);
    }
    function e(a) {
        a[E.resume.paramNames.resuming] = !0;
    }
    function f(a, b, c) {
        return a.slice ? a.slice(b, c) : a.mozSlice ? a.mozSlice(b, c) : a.webkitSlice ? a.webkitSlice(b, c) : void 0;
    }
    function g(a, b) {
        var c = E.chunking.partSize, d = D.getSize(a), e = H[a].file, g = c * b, i = g + c >= d ? d : g + c, j = h(a);
        return {
            part: b,
            start: g,
            end: i,
            count: j,
            blob: f(e, g, i)
        };
    }
    function h(a) {
        var b = D.getSize(a), c = E.chunking.partSize;
        return Math.ceil(b / c);
    }
    function i(a) {
        return H[a].xhr = new XMLHttpRequest(), H[a].xhr;
    }
    function j(a, b, c, d) {
        var e = new FormData(), f = E.demoMode ? "GET" : "POST", g = E.endpointStore.getEndpoint(d), h = g, i = D.getName(d), j = D.getSize(d);
        return a[E.uuidParamName] = H[d].uuid, M && (a[E.totalFileSizeParamName] = j), E.paramsInBody || (a[E.inputName] = i, 
        h = qq.obj2url(a, g)), b.open(f, h, !0), M ? (E.paramsInBody && qq.obj2FormData(a, e), 
        e.append(E.inputName, c), e) : c;
    }
    function k(a, b) {
        var c = E.customHeaders, d = (D.getName(a), H[a].file);
        b.setRequestHeader("X-Requested-With", "XMLHttpRequest"), b.setRequestHeader("Cache-Control", "no-cache"), 
        M || (b.setRequestHeader("Content-Type", "application/octet-stream"), b.setRequestHeader("X-Mime-Type", d.type)), 
        qq.each(c, function(a, c) {
            b.setRequestHeader(a, c);
        });
    }
    function l(a, b, c) {
        var d = D.getName(a), e = D.getSize(a);
        H[a].attemptingResume = !1, E.onProgress(a, d, e, e), E.onComplete(a, d, b, c), 
        delete H[a].xhr, F(a);
    }
    function m(a) {
        var b, c, f = g(a, H[a].remainingChunkIdxs[0]), h = i(a), l = D.getSize(a), m = D.getName(a);
        void 0 === H[a].loaded && (H[a].loaded = 0), w(a, f), h.onreadystatechange = v(a, h), 
        h.upload.onprogress = function(b) {
            if (b.lengthComputable && H[a].loaded < l) {
                var c = b.loaded + H[a].loaded;
                E.onProgress(a, m, c, l);
            }
        }, E.onUploadChunk(a, m, u(f)), c = E.paramsStore.getParams(a), d(a, c, f), H[a].attemptingResume && e(c), 
        b = j(c, h, f.blob, a), k(a, h), G("Sending chunked upload request for " + a + ": bytes " + (f.start + 1) + "-" + f.end + " of " + l), 
        h.send(b);
    }
    function n(a, b, c) {
        var d = H[a].remainingChunkIdxs.shift(), e = g(a, d);
        H[a].attemptingResume = !1, H[a].loaded += e.end - e.start, H[a].remainingChunkIdxs.length > 0 ? m(a) : (x(a), 
        l(a, b, c));
    }
    function o(a, b) {
        return 200 !== a.status || !b.success || b.reset;
    }
    function p(a) {
        var b;
        try {
            b = qq.parseJson(a.responseText);
        } catch (c) {
            G("Error when attempting to parse xhr response text (" + c + ")", "error"), b = {};
        }
        return b;
    }
    function q(a) {
        G("Server has ordered chunking effort to be restarted on next attempt for file ID " + a, "error"), 
        K && x(a), H[a].remainingChunkIdxs = [], delete H[a].loaded;
    }
    function r(a) {
        H[a].attemptingResume = !1, G("Server has declared that it cannot handle resume for file ID " + a + " - starting from the first chunk", "error"), 
        D.upload(a, !0);
    }
    function s(a, b, c) {
        var d = D.getName(a);
        E.onAutoRetry(a, d, b, c) || l(a, b, c);
    }
    function t(a, b) {
        var c;
        H[a] && (G("xhr - server response received for " + a), G("responseText = " + b.responseText), 
        c = p(b), o(b, c) ? (c.reset && q(a), H[a].attemptingResume && c.reset ? r(a) : s(a, c, b)) : J ? n(a, c, b) : l(a, c, b));
    }
    function u(a) {
        return {
            partIndex: a.part,
            startByte: a.start + 1,
            endByte: a.end,
            totalParts: a.count
        };
    }
    function v(a, b) {
        return function() {
            4 === b.readyState && t(a, b);
        };
    }
    function w(a, b) {
        var c = D.getUuid(a), d = z(a), e = c + I + b.part, f = E.resume.cookiesExpireIn;
        qq.setCookie(d, e, f);
    }
    function x(a) {
        var b = z(a);
        qq.deleteCookie(b);
    }
    function y(a) {
        var b, c, d, e = qq.getCookie(z(a));
        return e ? (b = e.indexOf(I), c = e.substr(0, b), d = parseInt(e.substr(b + 1, e.length - b), 10), 
        {
            uuid: c,
            part: d
        }) : void 0;
    }
    function z(a) {
        var b, c = D.getName(a), d = D.getSize(a), e = E.chunking.partSize;
        return b = "qqfilechunk" + I + encodeURIComponent(c) + I + d + I + e, void 0 !== L && (b += I + L), 
        b;
    }
    function A() {
        return null === E.resume.id || void 0 === E.resume.id || qq.isFunction(E.resume.id) || qq.isObject(E.resume.id) ? void 0 : E.resume.id;
    }
    function B(a, b) {
        var c, d, e, f = D.getName(a), i = 0;
        if (!H[a].remainingChunkIdxs || 0 === H[a].remainingChunkIdxs.length) for (H[a].remainingChunkIdxs = [], 
        K && !b && (c = y(a), c && (d = g(a, c.part), E.onResume(a, f, u(d)) !== !1 && (i = c.part, 
        H[a].uuid = c.uuid, H[a].loaded = d.start, H[a].attemptingResume = !0, G("Resuming " + f + " at partition index " + i)))), 
        e = h(a) - 1; e >= i; e -= 1) H[a].remainingChunkIdxs.unshift(e);
        m(a);
    }
    function C(a) {
        var b, c, d, e = H[a].file, f = D.getName(a);
        H[a].loaded = 0, b = i(a), b.upload.onprogress = function(b) {
            b.lengthComputable && (H[a].loaded = b.loaded, E.onProgress(a, f, b.loaded, b.total));
        }, b.onreadystatechange = v(a, b), c = E.paramsStore.getParams(a), d = j(c, b, e, a), 
        k(a, b), G("Sending upload request for " + a), b.send(d);
    }
    var D, E = a, F = b, G = c, H = [], I = "|", J = E.chunking.enabled && qq.isFileChunkingSupported(), K = E.resume.enabled && J && qq.areCookiesEnabled(), L = A(), M = E.forceMultipart || E.paramsInBody;
    return D = {
        add: function(a) {
            if (!(a instanceof File)) throw new Error("Passed obj in not a File (in qq.UploadHandlerXhr)");
            var b = H.push({
                file: a
            }) - 1;
            return H[b].uuid = qq.getUniqueId(), b;
        },
        getName: function(a) {
            var b = H[a].file;
            return null !== b.fileName && void 0 !== b.fileName ? b.fileName : b.name;
        },
        getSize: function(a) {
            var b = H[a].file;
            return null != b.fileSize ? b.fileSize : b.size;
        },
        getFile: function(a) {
            return H[a] ? H[a].file : void 0;
        },
        getLoaded: function(a) {
            return H[a].loaded || 0;
        },
        isValid: function(a) {
            return void 0 !== H[a];
        },
        reset: function() {
            H = [];
        },
        getUuid: function(a) {
            return H[a].uuid;
        },
        upload: function(a, b) {
            var c = this.getName(a);
            E.onUpload(a, c), J ? B(a, b) : C(a);
        },
        cancel: function(a) {
            E.onCancel(a, this.getName(a)), H[a].xhr && H[a].xhr.abort(), K && x(a), delete H[a];
        },
        getResumableFilesData: function() {
            var a = [], b = [];
            return J && K ? (a = void 0 === L ? qq.getCookieNames(new RegExp("^qqfilechunk\\" + I + ".+\\" + I + "\\d+\\" + I + E.chunking.partSize + "=")) : qq.getCookieNames(new RegExp("^qqfilechunk\\" + I + ".+\\" + I + "\\d+\\" + I + E.chunking.partSize + "\\" + I + L + "=")), 
            qq.each(a, function(a, c) {
                var d = c.split(I), e = qq.getCookie(c).split(I);
                b.push({
                    name: decodeURIComponent(d[1]),
                    size: d[2],
                    uuid: e[0],
                    partIdx: e[1]
                });
            }), b) : [];
        }
    };
}, function(a) {
    "use strict";
    var b, c, d, e, f, g, h, i, j, k;
    g = [ "uploaderType" ], d = function(a) {
        if (a) {
            var d = i(a);
            h(d), b("basic" === f("uploaderType") ? new qq.FineUploaderBasic(d) : new qq.FineUploader(d));
        }
        return c;
    }, e = function(a, b) {
        var d = c.data("fineuploader");
        return b ? (void 0 === d && (d = {}), d[a] = b, c.data("fineuploader", d), void 0) : void 0 === d ? null : d[a];
    }, b = function(a) {
        return e("uploader", a);
    }, f = function(a, b) {
        return e(a, b);
    }, h = function(b) {
        var d = b.callbacks = {};
        a.each(new qq.FineUploaderBasic()._options.callbacks, function(a, b) {
            var e, f;
            e = /^on(\w+)/.exec(a)[1], e = e.substring(0, 1).toLowerCase() + e.substring(1), 
            f = c, d[a] = function() {
                var a = Array.prototype.slice.call(arguments);
                return f.triggerHandler(e, a);
            };
        });
    }, i = function(b, d) {
        var e, h;
        return e = void 0 === d ? "basic" !== b.uploaderType ? {
            element: c[0]
        } : {} : d, a.each(b, function(b, c) {
            a.inArray(b, g) >= 0 ? f(b, c) : c instanceof a ? e[b] = c[0] : a.isPlainObject(c) ? (e[b] = {}, 
            i(c, e[b])) : a.isArray(c) ? (h = [], a.each(c, function(b, c) {
                c instanceof a ? a.merge(h, c) : h.push(c);
            }), e[b] = h) : e[b] = c;
        }), void 0 === d ? e : void 0;
    }, j = function(c) {
        return "string" === a.type(c) && !c.match(/^_/) && void 0 !== b()[c];
    }, k = function(a) {
        var c = [], d = Array.prototype.slice.call(arguments, 1);
        return i(d, c), b()[a].apply(b(), c);
    }, a.fn.fineUploader = function(e) {
        var f = this, g = arguments, h = [];
        return this.each(function(i, l) {
            if (c = a(l), b() && j(e)) {
                if (h.push(k.apply(f, g)), 1 === f.length) return !1;
            } else "object" != typeof e && e ? a.error("Method " + e + " does not exist on jQuery.fineUploader") : d.apply(f, g);
        }), 1 === h.length ? h[0] : h.length > 1 ? h : this;
    };
}(jQuery);