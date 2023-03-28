/*
	Masked Input plugin for jQuery
	Copyright (c) 2007-2013 Josh Bush (digitalbush.com)
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
	Version: 1.3.1
*/
(function (e) {
	function t() {
		var e = document.createElement("input"),
			t = "onpaste";
		return e.setAttribute(t, ""), "function" == typeof e[t] ? "paste" : "input"
	}
	var n, a = t() + ".mask",
		r = navigator.userAgent,
		i = /iphone/i.test(r),
		o = /android/i.test(r);
	e.mask = {
		definitions: {
			9: "[0-9]",
			a: "[A-Za-z]",
			"*": "[A-Za-z0-9]"
		},
		dataName: "rawMaskFn",
		placeholder: "_"
	}, e.fn.extend({
		caret: function (e, t) {
			var n;
			if (0 !== this.length && !this.is(":hidden")) return "number" == typeof e ? (t = "number" == typeof t ? t : e, this.each(function () {
				this.setSelectionRange ? this.setSelectionRange(e, t) : this.createTextRange && (n = this.createTextRange(), n.collapse(!0), n.moveEnd("character", t), n.moveStart("character", e), n.select())
			})) : (this[0].setSelectionRange ? (e = this[0].selectionStart, t = this[0].selectionEnd) : document.selection && document.selection.createRange && (n = document.selection.createRange(), e = 0 - n.duplicate().moveStart("character", -1e5), t = e + n.text.length), {
				begin: e,
				end: t
			})
		},
		unmask: function () {
			return this.trigger("unmask")
		},
		mask: function (t, r) {
			var c, l, s, u, f, h;
			return !t && this.length > 0 ? (c = e(this[0]), c.data(e.mask.dataName)()) : (r = e.extend({
				placeholder: e.mask.placeholder,
				completed: null
			}, r), l = e.mask.definitions, s = [], u = h = t.length, f = null, e.each(t.split(""), function (e, t) {
				"?" == t ? (h--, u = e) : l[t] ? (s.push(RegExp(l[t])), null === f && (f = s.length - 1)) : s.push(null)
			}), this.trigger("unmask").each(function () {
				function c(e) {
					for (; h > ++e && !s[e];);
					return e
				}

				function d(e) {
					for (; --e >= 0 && !s[e];);
					return e
				}

				function m(e, t) {
					var n, a;
					if (!(0 > e)) {
						for (n = e, a = c(t); h > n; n++)
							if (s[n]) {
								if (!(h > a && s[n].test(R[a]))) break;
								R[n] = R[a], R[a] = r.placeholder, a = c(a)
							} b(), x.caret(Math.max(f, e))
					}
				}

				function p(e) {
					var t, n, a, i;
					for (t = e, n = r.placeholder; h > t; t++)
						if (s[t]) {
							if (a = c(t), i = R[t], R[t] = n, !(h > a && s[a].test(i))) break;
							n = i
						}
				}

				function g(e) {
					var t, n, a, r = e.which;
					8 === r || 46 === r || i && 127 === r ? (t = x.caret(), n = t.begin, a = t.end, 0 === a - n && (n = 46 !== r ? d(n) : a = c(n - 1), a = 46 === r ? c(a) : a), k(n, a), m(n, a - 1), e.preventDefault()) : 27 == r && (x.val(S), x.caret(0, y()), e.preventDefault())
				}

				function v(t) {
					var n, a, i, l = t.which,
						u = x.caret();
					t.ctrlKey || t.altKey || t.metaKey || 32 > l || l && (0 !== u.end - u.begin && (k(u.begin, u.end), m(u.begin, u.end - 1)), n = c(u.begin - 1), h > n && (a = String.fromCharCode(l), s[n].test(a) && (p(n), R[n] = a, b(), i = c(n), o ? setTimeout(e.proxy(e.fn.caret, x, i), 0) : x.caret(i), r.completed && i >= h && r.completed.call(x))), t.preventDefault())
				}

				function k(e, t) {
					var n;
					for (n = e; t > n && h > n; n++) s[n] && (R[n] = r.placeholder)
				}

				function b() {
					x.val(R.join(""))
				}

				function y(e) {
					var t, n, a = x.val(),
						i = -1;
					for (t = 0, pos = 0; h > t; t++)
						if (s[t]) {
							for (R[t] = r.placeholder; pos++ < a.length;)
								if (n = a.charAt(pos - 1), s[t].test(n)) {
									R[t] = n, i = t;
									break
								} if (pos > a.length) break
						} else R[t] === a.charAt(pos) && t !== u && (pos++, i = t);
					return e ? b() : u > i + 1 ? (x.val(""), k(0, h)) : (b(), x.val(x.val().substring(0, i + 1))), u ? t : f
				}
				var x = e(this),
					R = e.map(t.split(""), function (e) {
						return "?" != e ? l[e] ? r.placeholder : e : void 0
					}),
					S = x.val();
				x.data(e.mask.dataName, function () {
					return e.map(R, function (e, t) {
						return s[t] && e != r.placeholder ? e : null
					}).join("")
				}), x.attr("readonly") || x.one("unmask", function () {
					x.unbind(".mask").removeData(e.mask.dataName)
				}).bind("focus.mask", function () {
					clearTimeout(n);
					var e;
					S = x.val(), e = y(), n = setTimeout(function () {
						b(), e == t.length ? x.caret(0, e) : x.caret(e)
					}, 10)
				}).bind("blur.mask", function () {
					y(), x.val() != S && x.change()
				}).bind("keydown.mask", g).bind("keypress.mask", v).bind(a, function () {
					setTimeout(function () {
						var e = y(!0);
						x.caret(e), r.completed && e == x.val().length && r.completed.call(x)
					}, 0)
				}), y()
			}))
		}
	})
})(jQuery);
/*! For license information please see choices.min.js.LICENSE.txt */
! function () {
	"use strict";
	var e = {
			282: function (e, t, i) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.clearChoices = t.activateChoices = t.filterChoices = t.addChoice = void 0;
				var n = i(883);
				t.addChoice = function (e) {
					var t = e.value,
						i = e.label,
						r = e.id,
						s = e.groupId,
						o = e.disabled,
						a = e.elementId,
						c = e.customProperties,
						l = e.placeholder,
						h = e.keyCode;
					return {
						type: n.ACTION_TYPES.ADD_CHOICE,
						value: t,
						label: i,
						id: r,
						groupId: s,
						disabled: o,
						elementId: a,
						customProperties: c,
						placeholder: l,
						keyCode: h
					}
				}, t.filterChoices = function (e) {
					return {
						type: n.ACTION_TYPES.FILTER_CHOICES,
						results: e
					}
				}, t.activateChoices = function (e) {
					return void 0 === e && (e = !0), {
						type: n.ACTION_TYPES.ACTIVATE_CHOICES,
						active: e
					}
				}, t.clearChoices = function () {
					return {
						type: n.ACTION_TYPES.CLEAR_CHOICES
					}
				}
			},
			783: function (e, t, i) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.addGroup = void 0;
				var n = i(883);
				t.addGroup = function (e) {
					var t = e.value,
						i = e.id,
						r = e.active,
						s = e.disabled;
					return {
						type: n.ACTION_TYPES.ADD_GROUP,
						value: t,
						id: i,
						active: r,
						disabled: s
					}
				}
			},
			464: function (e, t, i) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.highlightItem = t.removeItem = t.addItem = void 0;
				var n = i(883);
				t.addItem = function (e) {
					var t = e.value,
						i = e.label,
						r = e.id,
						s = e.choiceId,
						o = e.groupId,
						a = e.customProperties,
						c = e.placeholder,
						l = e.keyCode;
					return {
						type: n.ACTION_TYPES.ADD_ITEM,
						value: t,
						label: i,
						id: r,
						choiceId: s,
						groupId: o,
						customProperties: a,
						placeholder: c,
						keyCode: l
					}
				}, t.removeItem = function (e, t) {
					return {
						type: n.ACTION_TYPES.REMOVE_ITEM,
						id: e,
						choiceId: t
					}
				}, t.highlightItem = function (e, t) {
					return {
						type: n.ACTION_TYPES.HIGHLIGHT_ITEM,
						id: e,
						highlighted: t
					}
				}
			},
			137: function (e, t, i) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.setIsLoading = t.resetTo = t.clearAll = void 0;
				var n = i(883);
				t.clearAll = function () {
					return {
						type: n.ACTION_TYPES.CLEAR_ALL
					}
				}, t.resetTo = function (e) {
					return {
						type: n.ACTION_TYPES.RESET_TO,
						state: e
					}
				}, t.setIsLoading = function (e) {
					return {
						type: n.ACTION_TYPES.SET_IS_LOADING,
						isLoading: e
					}
				}
			},
			373: function (e, t, i) {
				var n = this && this.__spreadArray || function (e, t, i) {
						if (i || 2 === arguments.length)
							for (var n, r = 0, s = t.length; r < s; r++) !n && r in t || (n || (n = Array.prototype.slice.call(t, 0, r)), n[r] = t[r]);
						return e.concat(n || Array.prototype.slice.call(t))
					},
					r = this && this.__importDefault || function (e) {
						return e && e.__esModule ? e : {
							default: e
						}
					};
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var s = r(i(996)),
					o = r(i(221)),
					a = i(282),
					c = i(783),
					l = i(464),
					h = i(137),
					u = i(520),
					d = i(883),
					p = i(789),
					f = i(799),
					m = i(655),
					v = r(i(744)),
					g = r(i(686)),
					_ = "-ms-scroll-limit" in document.documentElement.style && "-ms-ime-align" in document.documentElement.style,
					y = {},
					E = function () {
						function e(t, i) {
							void 0 === t && (t = "[data-choice]"), void 0 === i && (i = {});
							var r = this;
							void 0 === i.allowHTML && console.warn("Deprecation warning: allowHTML will default to false in a future release. To render HTML in Choices, you will need to set it to true. Setting allowHTML will suppress this message."), this.config = s.default.all([p.DEFAULT_CONFIG, e.defaults.options, i], {
								arrayMerge: function (e, t) {
									return n([], t, !0)
								}
							});
							var o = (0, f.diff)(this.config, p.DEFAULT_CONFIG);
							o.length && console.warn("Unknown config option(s) passed", o.join(", "));
							var a = "string" == typeof t ? document.querySelector(t) : t;
							if (!(a instanceof HTMLInputElement || a instanceof HTMLSelectElement)) throw TypeError("Expected one of the following types text|select-one|select-multiple");
							if (this._isTextElement = a.type === d.TEXT_TYPE, this._isSelectOneElement = a.type === d.SELECT_ONE_TYPE, this._isSelectMultipleElement = a.type === d.SELECT_MULTIPLE_TYPE, this._isSelectElement = this._isSelectOneElement || this._isSelectMultipleElement, this.config.searchEnabled = this._isSelectMultipleElement || this.config.searchEnabled, ["auto", "always"].includes("".concat(this.config.renderSelectedChoices)) || (this.config.renderSelectedChoices = "auto"), i.addItemFilter && "function" != typeof i.addItemFilter) {
								var c = i.addItemFilter instanceof RegExp ? i.addItemFilter : new RegExp(i.addItemFilter);
								this.config.addItemFilter = c.test.bind(c)
							}
							if (this._isTextElement ? this.passedElement = new u.WrappedInput({
									element: a,
									classNames: this.config.classNames,
									delimiter: this.config.delimiter
								}) : this.passedElement = new u.WrappedSelect({
									element: a,
									classNames: this.config.classNames,
									template: function (e) {
										return r._templates.option(e)
									}
								}), this.initialised = !1, this._store = new v.default, this._initialState = m.defaultState, this._currentState = m.defaultState, this._prevState = m.defaultState, this._currentValue = "", this._canSearch = !!this.config.searchEnabled, this._isScrollingOnIe = !1, this._highlightPosition = 0, this._wasTap = !0, this._placeholderValue = this._generatePlaceholderValue(), this._baseId = (0, f.generateId)(this.passedElement.element, "choices-"), this._direction = this.passedElement.dir, !this._direction) {
								var l = window.getComputedStyle(this.passedElement.element).direction;
								l !== window.getComputedStyle(document.documentElement).direction && (this._direction = l)
							}
							if (this._idNames = {
									itemChoice: "item-choice"
								}, this._isSelectElement && (this._presetGroups = this.passedElement.optionGroups, this._presetOptions = this.passedElement.options), this._presetChoices = this.config.choices, this._presetItems = this.config.items, this.passedElement.value && this._isTextElement) {
								var h = this.passedElement.value.split(this.config.delimiter);
								this._presetItems = this._presetItems.concat(h)
							}
							if (this.passedElement.options && this.passedElement.options.forEach((function (e) {
									r._presetChoices.push({
										value: e.value,
										label: e.innerHTML,
										selected: !!e.selected,
										disabled: e.disabled || e.parentNode.disabled,
										placeholder: "" === e.value || e.hasAttribute("placeholder"),
										customProperties: (0, f.parseCustomProperties)(e.dataset.customProperties)
									})
								})), this._render = this._render.bind(this), this._onFocus = this._onFocus.bind(this), this._onBlur = this._onBlur.bind(this), this._onKeyUp = this._onKeyUp.bind(this), this._onKeyDown = this._onKeyDown.bind(this), this._onClick = this._onClick.bind(this), this._onTouchMove = this._onTouchMove.bind(this), this._onTouchEnd = this._onTouchEnd.bind(this), this._onMouseDown = this._onMouseDown.bind(this), this._onMouseOver = this._onMouseOver.bind(this), this._onFormReset = this._onFormReset.bind(this), this._onSelectKey = this._onSelectKey.bind(this), this._onEnterKey = this._onEnterKey.bind(this), this._onEscapeKey = this._onEscapeKey.bind(this), this._onDirectionKey = this._onDirectionKey.bind(this), this._onDeleteKey = this._onDeleteKey.bind(this), this.passedElement.isActive) return this.config.silent || console.warn("Trying to initialise Choices on element already initialised", {
								element: t
							}), void(this.initialised = !0);
							this.init()
						}
						return Object.defineProperty(e, "defaults", {
							get: function () {
								return Object.preventExtensions({
									get options() {
										return y
									},
									get templates() {
										return g.default
									}
								})
							},
							enumerable: !1,
							configurable: !0
						}), e.prototype.init = function () {
							if (!this.initialised) {
								this._createTemplates(), this._createElements(), this._createStructure(), this._store.subscribe(this._render), this._render(), this._addEventListeners(), (!this.config.addItems || this.passedElement.element.hasAttribute("disabled")) && this.disable(), this.initialised = !0;
								var e = this.config.callbackOnInit;
								e && "function" == typeof e && e.call(this)
							}
						}, e.prototype.destroy = function () {
							this.initialised && (this._removeEventListeners(), this.passedElement.reveal(), this.containerOuter.unwrap(this.passedElement.element), this.clearStore(), this._isSelectElement && (this.passedElement.options = this._presetOptions), this._templates = g.default, this.initialised = !1)
						}, e.prototype.enable = function () {
							return this.passedElement.isDisabled && this.passedElement.enable(), this.containerOuter.isDisabled && (this._addEventListeners(), this.input.enable(), this.containerOuter.enable()), this
						}, e.prototype.disable = function () {
							return this.passedElement.isDisabled || this.passedElement.disable(), this.containerOuter.isDisabled || (this._removeEventListeners(), this.input.disable(), this.containerOuter.disable()), this
						}, e.prototype.highlightItem = function (e, t) {
							if (void 0 === t && (t = !0), !e || !e.id) return this;
							var i = e.id,
								n = e.groupId,
								r = void 0 === n ? -1 : n,
								s = e.value,
								o = void 0 === s ? "" : s,
								a = e.label,
								c = void 0 === a ? "" : a,
								h = r >= 0 ? this._store.getGroupById(r) : null;
							return this._store.dispatch((0, l.highlightItem)(i, !0)), t && this.passedElement.triggerEvent(d.EVENTS.highlightItem, {
								id: i,
								value: o,
								label: c,
								groupValue: h && h.value ? h.value : null
							}), this
						}, e.prototype.unhighlightItem = function (e) {
							if (!e || !e.id) return this;
							var t = e.id,
								i = e.groupId,
								n = void 0 === i ? -1 : i,
								r = e.value,
								s = void 0 === r ? "" : r,
								o = e.label,
								a = void 0 === o ? "" : o,
								c = n >= 0 ? this._store.getGroupById(n) : null;
							return this._store.dispatch((0, l.highlightItem)(t, !1)), this.passedElement.triggerEvent(d.EVENTS.highlightItem, {
								id: t,
								value: s,
								label: a,
								groupValue: c && c.value ? c.value : null
							}), this
						}, e.prototype.highlightAll = function () {
							var e = this;
							return this._store.items.forEach((function (t) {
								return e.highlightItem(t)
							})), this
						}, e.prototype.unhighlightAll = function () {
							var e = this;
							return this._store.items.forEach((function (t) {
								return e.unhighlightItem(t)
							})), this
						}, e.prototype.removeActiveItemsByValue = function (e) {
							var t = this;
							return this._store.activeItems.filter((function (t) {
								return t.value === e
							})).forEach((function (e) {
								return t._removeItem(e)
							})), this
						}, e.prototype.removeActiveItems = function (e) {
							var t = this;
							return this._store.activeItems.filter((function (t) {
								return t.id !== e
							})).forEach((function (e) {
								return t._removeItem(e)
							})), this
						}, e.prototype.removeHighlightedItems = function (e) {
							var t = this;
							return void 0 === e && (e = !1), this._store.highlightedActiveItems.forEach((function (i) {
								t._removeItem(i), e && t._triggerChange(i.value)
							})), this
						}, e.prototype.showDropdown = function (e) {
							var t = this;
							return this.dropdown.isActive || requestAnimationFrame((function () {
								t.dropdown.show(), t.containerOuter.open(t.dropdown.distanceFromTopWindow), !e && t._canSearch && t.input.focus(), t.passedElement.triggerEvent(d.EVENTS.showDropdown, {})
							})), this
						}, e.prototype.hideDropdown = function (e) {
							var t = this;
							return this.dropdown.isActive ? (requestAnimationFrame((function () {
								t.dropdown.hide(), t.containerOuter.close(), !e && t._canSearch && (t.input.removeActiveDescendant(), t.input.blur()), t.passedElement.triggerEvent(d.EVENTS.hideDropdown, {})
							})), this) : this
						}, e.prototype.getValue = function (e) {
							void 0 === e && (e = !1);
							var t = this._store.activeItems.reduce((function (t, i) {
								var n = e ? i.value : i;
								return t.push(n), t
							}), []);
							return this._isSelectOneElement ? t[0] : t
						}, e.prototype.setValue = function (e) {
							var t = this;
							return this.initialised ? (e.forEach((function (e) {
								return t._setChoiceOrItem(e)
							})), this) : this
						}, e.prototype.setChoiceByValue = function (e) {
							var t = this;
							return !this.initialised || this._isTextElement || (Array.isArray(e) ? e : [e]).forEach((function (e) {
								return t._findAndSelectChoiceByValue(e)
							})), this
						}, e.prototype.setChoices = function (e, t, i, n) {
							var r = this;
							if (void 0 === e && (e = []), void 0 === t && (t = "value"), void 0 === i && (i = "label"), void 0 === n && (n = !1), !this.initialised) throw new ReferenceError("setChoices was called on a non-initialized instance of Choices");
							if (!this._isSelectElement) throw new TypeError("setChoices can't be used with INPUT based Choices");
							if ("string" != typeof t || !t) throw new TypeError("value parameter must be a name of 'value' field in passed objects");
							if (n && this.clearChoices(), "function" == typeof e) {
								var s = e(this);
								if ("function" == typeof Promise && s instanceof Promise) return new Promise((function (e) {
									return requestAnimationFrame(e)
								})).then((function () {
									return r._handleLoadingState(!0)
								})).then((function () {
									return s
								})).then((function (e) {
									return r.setChoices(e, t, i, n)
								})).catch((function (e) {
									r.config.silent || console.error(e)
								})).then((function () {
									return r._handleLoadingState(!1)
								})).then((function () {
									return r
								}));
								if (!Array.isArray(s)) throw new TypeError(".setChoices first argument function must return either array of choices or Promise, got: ".concat(typeof s));
								return this.setChoices(s, t, i, !1)
							}
							if (!Array.isArray(e)) throw new TypeError(".setChoices must be called either with array of choices with a function resulting into Promise of array of choices");
							return this.containerOuter.removeLoadingState(), this._startLoading(), e.forEach((function (e) {
								if (e.choices) r._addGroup({
									id: e.id ? parseInt("".concat(e.id), 10) : null,
									group: e,
									valueKey: t,
									labelKey: i
								});
								else {
									var n = e;
									r._addChoice({
										value: n[t],
										label: n[i],
										isSelected: !!n.selected,
										isDisabled: !!n.disabled,
										placeholder: !!n.placeholder,
										customProperties: n.customProperties
									})
								}
							})), this._stopLoading(), this
						}, e.prototype.clearChoices = function () {
							return this._store.dispatch((0, a.clearChoices)()), this
						}, e.prototype.clearStore = function () {
							return this._store.dispatch((0, h.clearAll)()), this
						}, e.prototype.clearInput = function () {
							var e = !this._isSelectOneElement;
							return this.input.clear(e), !this._isTextElement && this._canSearch && (this._isSearching = !1, this._store.dispatch((0, a.activateChoices)(!0))), this
						}, e.prototype._render = function () {
							if (!this._store.isLoading()) {
								this._currentState = this._store.state;
								var e = this._currentState.choices !== this._prevState.choices || this._currentState.groups !== this._prevState.groups || this._currentState.items !== this._prevState.items,
									t = this._isSelectElement,
									i = this._currentState.items !== this._prevState.items;
								e && (t && this._renderChoices(), i && this._renderItems(), this._prevState = this._currentState)
							}
						}, e.prototype._renderChoices = function () {
							var e = this,
								t = this._store,
								i = t.activeGroups,
								n = t.activeChoices,
								r = document.createDocumentFragment();
							if (this.choiceList.clear(), this.config.resetScrollPosition && requestAnimationFrame((function () {
									return e.choiceList.scrollToTop()
								})), i.length >= 1 && !this._isSearching) {
								var s = n.filter((function (e) {
									return !0 === e.placeholder && -1 === e.groupId
								}));
								s.length >= 1 && (r = this._createChoicesFragment(s, r)), r = this._createGroupsFragment(i, n, r)
							} else n.length >= 1 && (r = this._createChoicesFragment(n, r));
							if (r.childNodes && r.childNodes.length > 0) {
								var o = this._store.activeItems,
									a = this._canAddItem(o, this.input.value);
								if (a.response) this.choiceList.append(r), this._highlightChoice();
								else {
									var c = this._getTemplate("notice", a.notice);
									this.choiceList.append(c)
								}
							} else {
								var l = void 0;
								c = void 0, this._isSearching ? (c = "function" == typeof this.config.noResultsText ? this.config.noResultsText() : this.config.noResultsText, l = this._getTemplate("notice", c, "no-results")) : (c = "function" == typeof this.config.noChoicesText ? this.config.noChoicesText() : this.config.noChoicesText, l = this._getTemplate("notice", c, "no-choices")), this.choiceList.append(l)
							}
						}, e.prototype._renderItems = function () {
							var e = this._store.activeItems || [];
							this.itemList.clear();
							var t = this._createItemsFragment(e);
							t.childNodes && this.itemList.append(t)
						}, e.prototype._createGroupsFragment = function (e, t, i) {
							var n = this;
							return void 0 === i && (i = document.createDocumentFragment()), this.config.shouldSort && e.sort(this.config.sorter), e.forEach((function (e) {
								var r = function (e) {
									return t.filter((function (t) {
										return n._isSelectOneElement ? t.groupId === e.id : t.groupId === e.id && ("always" === n.config.renderSelectedChoices || !t.selected)
									}))
								}(e);
								if (r.length >= 1) {
									var s = n._getTemplate("choiceGroup", e);
									i.appendChild(s), n._createChoicesFragment(r, i, !0)
								}
							})), i
						}, e.prototype._createChoicesFragment = function (e, t, i) {
							var r = this;
							void 0 === t && (t = document.createDocumentFragment()), void 0 === i && (i = !1);
							var s = this.config,
								o = s.renderSelectedChoices,
								a = s.searchResultLimit,
								c = s.renderChoiceLimit,
								l = this._isSearching ? f.sortByScore : this.config.sorter,
								h = function (e) {
									if ("auto" !== o || r._isSelectOneElement || !e.selected) {
										var i = r._getTemplate("choice", e, r.config.itemSelectText);
										t.appendChild(i)
									}
								},
								u = e;
							"auto" !== o || this._isSelectOneElement || (u = e.filter((function (e) {
								return !e.selected
							})));
							var d = u.reduce((function (e, t) {
									return t.placeholder ? e.placeholderChoices.push(t) : e.normalChoices.push(t), e
								}), {
									placeholderChoices: [],
									normalChoices: []
								}),
								p = d.placeholderChoices,
								m = d.normalChoices;
							(this.config.shouldSort || this._isSearching) && m.sort(l);
							var v = u.length,
								g = this._isSelectOneElement ? n(n([], p, !0), m, !0) : m;
							this._isSearching ? v = a : c && c > 0 && !i && (v = c);
							for (var _ = 0; _ < v; _ += 1) g[_] && h(g[_]);
							return t
						}, e.prototype._createItemsFragment = function (e, t) {
							var i = this;
							void 0 === t && (t = document.createDocumentFragment());
							var n = this.config,
								r = n.shouldSortItems,
								s = n.sorter,
								o = n.removeItemButton;
							return r && !this._isSelectOneElement && e.sort(s), this._isTextElement ? this.passedElement.value = e.map((function (e) {
								return e.value
							})).join(this.config.delimiter) : this.passedElement.options = e, e.forEach((function (e) {
								var n = i._getTemplate("item", e, o);
								t.appendChild(n)
							})), t
						}, e.prototype._triggerChange = function (e) {
							null != e && this.passedElement.triggerEvent(d.EVENTS.change, {
								value: e
							})
						}, e.prototype._selectPlaceholderChoice = function (e) {
							this._addItem({
								value: e.value,
								label: e.label,
								choiceId: e.id,
								groupId: e.groupId,
								placeholder: e.placeholder
							}), this._triggerChange(e.value)
						}, e.prototype._handleButtonAction = function (e, t) {
							if (e && t && this.config.removeItems && this.config.removeItemButton) {
								var i = t.parentNode && t.parentNode.dataset.id,
									n = i && e.find((function (e) {
										return e.id === parseInt(i, 10)
									}));
								n && (this._removeItem(n), this._triggerChange(n.value), this._isSelectOneElement && this._store.placeholderChoice && this._selectPlaceholderChoice(this._store.placeholderChoice))
							}
						}, e.prototype._handleItemAction = function (e, t, i) {
							var n = this;
							if (void 0 === i && (i = !1), e && t && this.config.removeItems && !this._isSelectOneElement) {
								var r = t.dataset.id;
								e.forEach((function (e) {
									e.id !== parseInt("".concat(r), 10) || e.highlighted ? !i && e.highlighted && n.unhighlightItem(e) : n.highlightItem(e)
								})), this.input.focus()
							}
						}, e.prototype._handleChoiceAction = function (e, t) {
							if (e && t) {
								var i = t.dataset.id,
									n = i && this._store.getChoiceById(i);
								if (n) {
									var r = e[0] && e[0].keyCode ? e[0].keyCode : void 0,
										s = this.dropdown.isActive;
									n.keyCode = r, this.passedElement.triggerEvent(d.EVENTS.choice, {
										choice: n
									}), n.selected || n.disabled || this._canAddItem(e, n.value).response && (this._addItem({
										value: n.value,
										label: n.label,
										choiceId: n.id,
										groupId: n.groupId,
										customProperties: n.customProperties,
										placeholder: n.placeholder,
										keyCode: n.keyCode
									}), this._triggerChange(n.value)), this.clearInput(), s && this._isSelectOneElement && (this.hideDropdown(!0), this.containerOuter.focus())
								}
							}
						}, e.prototype._handleBackspace = function (e) {
							if (this.config.removeItems && e) {
								var t = e[e.length - 1],
									i = e.some((function (e) {
										return e.highlighted
									}));
								this.config.editItems && !i && t ? (this.input.value = t.value, this.input.setWidth(), this._removeItem(t), this._triggerChange(t.value)) : (i || this.highlightItem(t, !1), this.removeHighlightedItems(!0))
							}
						}, e.prototype._startLoading = function () {
							this._store.dispatch((0, h.setIsLoading)(!0))
						}, e.prototype._stopLoading = function () {
							this._store.dispatch((0, h.setIsLoading)(!1))
						}, e.prototype._handleLoadingState = function (e) {
							void 0 === e && (e = !0);
							var t = this.itemList.getChild(".".concat(this.config.classNames.placeholder));
							e ? (this.disable(), this.containerOuter.addLoadingState(), this._isSelectOneElement ? t ? t.innerHTML = this.config.loadingText : (t = this._getTemplate("placeholder", this.config.loadingText)) && this.itemList.append(t) : this.input.placeholder = this.config.loadingText) : (this.enable(), this.containerOuter.removeLoadingState(), this._isSelectOneElement ? t && (t.innerHTML = this._placeholderValue || "") : this.input.placeholder = this._placeholderValue || "")
						}, e.prototype._handleSearch = function (e) {
							if (this.input.isFocussed) {
								var t = this._store.choices,
									i = this.config,
									n = i.searchFloor,
									r = i.searchChoices,
									s = t.some((function (e) {
										return !e.active
									}));
								if (null != e && e.length >= n) {
									var o = r ? this._searchChoices(e) : 0;
									this.passedElement.triggerEvent(d.EVENTS.search, {
										value: e,
										resultCount: o
									})
								} else s && (this._isSearching = !1, this._store.dispatch((0, a.activateChoices)(!0)))
							}
						}, e.prototype._canAddItem = function (e, t) {
							var i = !0,
								n = "function" == typeof this.config.addItemText ? this.config.addItemText(t) : this.config.addItemText;
							if (!this._isSelectOneElement) {
								var r = (0, f.existsInArray)(e, t);
								this.config.maxItemCount > 0 && this.config.maxItemCount <= e.length && (i = !1, n = "function" == typeof this.config.maxItemText ? this.config.maxItemText(this.config.maxItemCount) : this.config.maxItemText), !this.config.duplicateItemsAllowed && r && i && (i = !1, n = "function" == typeof this.config.uniqueItemText ? this.config.uniqueItemText(t) : this.config.uniqueItemText), this._isTextElement && this.config.addItems && i && "function" == typeof this.config.addItemFilter && !this.config.addItemFilter(t) && (i = !1, n = "function" == typeof this.config.customAddItemText ? this.config.customAddItemText(t) : this.config.customAddItemText)
							}
							return {
								response: i,
								notice: n
							}
						}, e.prototype._searchChoices = function (e) {
							var t = "string" == typeof e ? e.trim() : e,
								i = "string" == typeof this._currentValue ? this._currentValue.trim() : this._currentValue;
							if (t.length < 1 && t === "".concat(i, " ")) return 0;
							var r = this._store.searchableChoices,
								s = t,
								c = Object.assign(this.config.fuseOptions, {
									keys: n([], this.config.searchFields, !0),
									includeMatches: !0
								}),
								l = new o.default(r, c).search(s);
							return this._currentValue = t, this._highlightPosition = 0, this._isSearching = !0, this._store.dispatch((0, a.filterChoices)(l)), l.length
						}, e.prototype._addEventListeners = function () {
							var e = document.documentElement;
							e.addEventListener("touchend", this._onTouchEnd, !0), this.containerOuter.element.addEventListener("keydown", this._onKeyDown, !0), this.containerOuter.element.addEventListener("mousedown", this._onMouseDown, !0), e.addEventListener("click", this._onClick, {
								passive: !0
							}), e.addEventListener("touchmove", this._onTouchMove, {
								passive: !0
							}), this.dropdown.element.addEventListener("mouseover", this._onMouseOver, {
								passive: !0
							}), this._isSelectOneElement && (this.containerOuter.element.addEventListener("focus", this._onFocus, {
								passive: !0
							}), this.containerOuter.element.addEventListener("blur", this._onBlur, {
								passive: !0
							})), this.input.element.addEventListener("keyup", this._onKeyUp, {
								passive: !0
							}), this.input.element.addEventListener("focus", this._onFocus, {
								passive: !0
							}), this.input.element.addEventListener("blur", this._onBlur, {
								passive: !0
							}), this.input.element.form && this.input.element.form.addEventListener("reset", this._onFormReset, {
								passive: !0
							}), this.input.addEventListeners()
						}, e.prototype._removeEventListeners = function () {
							var e = document.documentElement;
							e.removeEventListener("touchend", this._onTouchEnd, !0), this.containerOuter.element.removeEventListener("keydown", this._onKeyDown, !0), this.containerOuter.element.removeEventListener("mousedown", this._onMouseDown, !0), e.removeEventListener("click", this._onClick), e.removeEventListener("touchmove", this._onTouchMove), this.dropdown.element.removeEventListener("mouseover", this._onMouseOver), this._isSelectOneElement && (this.containerOuter.element.removeEventListener("focus", this._onFocus), this.containerOuter.element.removeEventListener("blur", this._onBlur)), this.input.element.removeEventListener("keyup", this._onKeyUp), this.input.element.removeEventListener("focus", this._onFocus), this.input.element.removeEventListener("blur", this._onBlur), this.input.element.form && this.input.element.form.removeEventListener("reset", this._onFormReset), this.input.removeEventListeners()
						}, e.prototype._onKeyDown = function (e) {
							var t = e.keyCode,
								i = this._store.activeItems,
								n = this.input.isFocussed,
								r = this.dropdown.isActive,
								s = this.itemList.hasChildren(),
								o = String.fromCharCode(t),
								a = /[^\x00-\x1F]/.test(o),
								c = d.KEY_CODES.BACK_KEY,
								l = d.KEY_CODES.DELETE_KEY,
								h = d.KEY_CODES.ENTER_KEY,
								u = d.KEY_CODES.A_KEY,
								p = d.KEY_CODES.ESC_KEY,
								f = d.KEY_CODES.UP_KEY,
								m = d.KEY_CODES.DOWN_KEY,
								v = d.KEY_CODES.PAGE_UP_KEY,
								g = d.KEY_CODES.PAGE_DOWN_KEY;
							switch (this._isTextElement || r || !a || (this.showDropdown(), this.input.isFocussed || (this.input.value += e.key.toLowerCase())), t) {
								case u:
									return this._onSelectKey(e, s);
								case h:
									return this._onEnterKey(e, i, r);
								case p:
									return this._onEscapeKey(r);
								case f:
								case v:
								case m:
								case g:
									return this._onDirectionKey(e, r);
								case l:
								case c:
									return this._onDeleteKey(e, i, n)
							}
						}, e.prototype._onKeyUp = function (e) {
							var t = e.target,
								i = e.keyCode,
								n = this.input.value,
								r = this._store.activeItems,
								s = this._canAddItem(r, n),
								o = d.KEY_CODES.BACK_KEY,
								c = d.KEY_CODES.DELETE_KEY;
							if (this._isTextElement)
								if (s.notice && n) {
									var l = this._getTemplate("notice", s.notice);
									this.dropdown.element.innerHTML = l.outerHTML, this.showDropdown(!0)
								} else this.hideDropdown(!0);
							else {
								var h = (i === o || i === c) && t && !t.value,
									u = !this._isTextElement && this._isSearching,
									p = this._canSearch && s.response;
								h && u ? (this._isSearching = !1, this._store.dispatch((0, a.activateChoices)(!0))) : p && this._handleSearch(this.input.rawValue)
							}
							this._canSearch = this.config.searchEnabled
						}, e.prototype._onSelectKey = function (e, t) {
							var i = e.ctrlKey,
								n = e.metaKey;
							(i || n) && t && (this._canSearch = !1, this.config.removeItems && !this.input.value && this.input.element === document.activeElement && this.highlightAll())
						}, e.prototype._onEnterKey = function (e, t, i) {
							var n = e.target,
								r = d.KEY_CODES.ENTER_KEY,
								s = n && n.hasAttribute("data-button");
							if (this._isTextElement && n && n.value) {
								var o = this.input.value;
								this._canAddItem(t, o).response && (this.hideDropdown(!0), this._addItem({
									value: o
								}), this._triggerChange(o), this.clearInput())
							}
							if (s && (this._handleButtonAction(t, n), e.preventDefault()), i) {
								var a = this.dropdown.getChild(".".concat(this.config.classNames.highlightedState));
								a && (t[0] && (t[0].keyCode = r), this._handleChoiceAction(t, a)), e.preventDefault()
							} else this._isSelectOneElement && (this.showDropdown(), e.preventDefault())
						}, e.prototype._onEscapeKey = function (e) {
							e && (this.hideDropdown(!0), this.containerOuter.focus())
						}, e.prototype._onDirectionKey = function (e, t) {
							var i = e.keyCode,
								n = e.metaKey,
								r = d.KEY_CODES.DOWN_KEY,
								s = d.KEY_CODES.PAGE_UP_KEY,
								o = d.KEY_CODES.PAGE_DOWN_KEY;
							if (t || this._isSelectOneElement) {
								this.showDropdown(), this._canSearch = !1;
								var a = i === r || i === o ? 1 : -1,
									c = "[data-choice-selectable]",
									l = void 0;
								if (n || i === o || i === s) l = a > 0 ? this.dropdown.element.querySelector("".concat(c, ":last-of-type")) : this.dropdown.element.querySelector(c);
								else {
									var h = this.dropdown.element.querySelector(".".concat(this.config.classNames.highlightedState));
									l = h ? (0, f.getAdjacentEl)(h, c, a) : this.dropdown.element.querySelector(c)
								}
								l && ((0, f.isScrolledIntoView)(l, this.choiceList.element, a) || this.choiceList.scrollToChildElement(l, a), this._highlightChoice(l)), e.preventDefault()
							}
						}, e.prototype._onDeleteKey = function (e, t, i) {
							var n = e.target;
							this._isSelectOneElement || n.value || !i || (this._handleBackspace(t), e.preventDefault())
						}, e.prototype._onTouchMove = function () {
							this._wasTap && (this._wasTap = !1)
						}, e.prototype._onTouchEnd = function (e) {
							var t = (e || e.touches[0]).target;
							this._wasTap && this.containerOuter.element.contains(t) && ((t === this.containerOuter.element || t === this.containerInner.element) && (this._isTextElement ? this.input.focus() : this._isSelectMultipleElement && this.showDropdown()), e.stopPropagation()), this._wasTap = !0
						}, e.prototype._onMouseDown = function (e) {
							var t = e.target;
							if (t instanceof HTMLElement) {
								if (_ && this.choiceList.element.contains(t)) {
									var i = this.choiceList.element.firstElementChild,
										n = "ltr" === this._direction ? e.offsetX >= i.offsetWidth : e.offsetX < i.offsetLeft;
									this._isScrollingOnIe = n
								}
								if (t !== this.input.element) {
									var r = t.closest("[data-button],[data-item],[data-choice]");
									if (r instanceof HTMLElement) {
										var s = e.shiftKey,
											o = this._store.activeItems,
											a = r.dataset;
										"button" in a ? this._handleButtonAction(o, r) : "item" in a ? this._handleItemAction(o, r, s) : "choice" in a && this._handleChoiceAction(o, r)
									}
									e.preventDefault()
								}
							}
						}, e.prototype._onMouseOver = function (e) {
							var t = e.target;
							t instanceof HTMLElement && "choice" in t.dataset && this._highlightChoice(t)
						}, e.prototype._onClick = function (e) {
							var t = e.target;
							this.containerOuter.element.contains(t) ? this.dropdown.isActive || this.containerOuter.isDisabled ? this._isSelectOneElement && t !== this.input.element && !this.dropdown.element.contains(t) && this.hideDropdown() : this._isTextElement ? document.activeElement !== this.input.element && this.input.focus() : (this.showDropdown(), this.containerOuter.focus()) : (this._store.highlightedActiveItems.length > 0 && this.unhighlightAll(), this.containerOuter.removeFocusState(), this.hideDropdown(!0))
						}, e.prototype._onFocus = function (e) {
							var t, i = this,
								n = e.target;
							n && this.containerOuter.element.contains(n) && ((t = {})[d.TEXT_TYPE] = function () {
								n === i.input.element && i.containerOuter.addFocusState()
							}, t[d.SELECT_ONE_TYPE] = function () {
								i.containerOuter.addFocusState(), n === i.input.element && i.showDropdown(!0)
							}, t[d.SELECT_MULTIPLE_TYPE] = function () {
								n === i.input.element && (i.showDropdown(!0), i.containerOuter.addFocusState())
							}, t)[this.passedElement.element.type]()
						}, e.prototype._onBlur = function (e) {
							var t, i = this,
								n = e.target;
							if (n && this.containerOuter.element.contains(n) && !this._isScrollingOnIe) {
								var r = this._store.activeItems.some((function (e) {
									return e.highlighted
								}));
								((t = {})[d.TEXT_TYPE] = function () {
									n === i.input.element && (i.containerOuter.removeFocusState(), r && i.unhighlightAll(), i.hideDropdown(!0))
								}, t[d.SELECT_ONE_TYPE] = function () {
									i.containerOuter.removeFocusState(), (n === i.input.element || n === i.containerOuter.element && !i._canSearch) && i.hideDropdown(!0)
								}, t[d.SELECT_MULTIPLE_TYPE] = function () {
									n === i.input.element && (i.containerOuter.removeFocusState(), i.hideDropdown(!0), r && i.unhighlightAll())
								}, t)[this.passedElement.element.type]()
							} else this._isScrollingOnIe = !1, this.input.element.focus()
						}, e.prototype._onFormReset = function () {
							this._store.dispatch((0, h.resetTo)(this._initialState))
						}, e.prototype._highlightChoice = function (e) {
							var t = this;
							void 0 === e && (e = null);
							var i = Array.from(this.dropdown.element.querySelectorAll("[data-choice-selectable]"));
							if (i.length) {
								var n = e;
								Array.from(this.dropdown.element.querySelectorAll(".".concat(this.config.classNames.highlightedState))).forEach((function (e) {
									e.classList.remove(t.config.classNames.highlightedState), e.setAttribute("aria-selected", "false")
								})), n ? this._highlightPosition = i.indexOf(n) : (n = i.length > this._highlightPosition ? i[this._highlightPosition] : i[i.length - 1]) || (n = i[0]), n.classList.add(this.config.classNames.highlightedState), n.setAttribute("aria-selected", "true"), this.passedElement.triggerEvent(d.EVENTS.highlightChoice, {
									el: n
								}), this.dropdown.isActive && (this.input.setActiveDescendant(n.id), this.containerOuter.setActiveDescendant(n.id))
							}
						}, e.prototype._addItem = function (e) {
							var t = e.value,
								i = e.label,
								n = void 0 === i ? null : i,
								r = e.choiceId,
								s = void 0 === r ? -1 : r,
								o = e.groupId,
								a = void 0 === o ? -1 : o,
								c = e.customProperties,
								h = void 0 === c ? {} : c,
								u = e.placeholder,
								p = void 0 !== u && u,
								f = e.keyCode,
								m = void 0 === f ? -1 : f,
								v = "string" == typeof t ? t.trim() : t,
								g = this._store.items,
								_ = n || v,
								y = s || -1,
								E = a >= 0 ? this._store.getGroupById(a) : null,
								b = g ? g.length + 1 : 1;
							this.config.prependValue && (v = this.config.prependValue + v.toString()), this.config.appendValue && (v += this.config.appendValue.toString()), this._store.dispatch((0, l.addItem)({
								value: v,
								label: _,
								id: b,
								choiceId: y,
								groupId: a,
								customProperties: h,
								placeholder: p,
								keyCode: m
							})), this._isSelectOneElement && this.removeActiveItems(b), this.passedElement.triggerEvent(d.EVENTS.addItem, {
								id: b,
								value: v,
								label: _,
								customProperties: h,
								groupValue: E && E.value ? E.value : null,
								keyCode: m
							})
						}, e.prototype._removeItem = function (e) {
							var t = e.id,
								i = e.value,
								n = e.label,
								r = e.customProperties,
								s = e.choiceId,
								o = e.groupId,
								a = o && o >= 0 ? this._store.getGroupById(o) : null;
							t && s && (this._store.dispatch((0, l.removeItem)(t, s)), this.passedElement.triggerEvent(d.EVENTS.removeItem, {
								id: t,
								value: i,
								label: n,
								customProperties: r,
								groupValue: a && a.value ? a.value : null
							}))
						}, e.prototype._addChoice = function (e) {
							var t = e.value,
								i = e.label,
								n = void 0 === i ? null : i,
								r = e.isSelected,
								s = void 0 !== r && r,
								o = e.isDisabled,
								c = void 0 !== o && o,
								l = e.groupId,
								h = void 0 === l ? -1 : l,
								u = e.customProperties,
								d = void 0 === u ? {} : u,
								p = e.placeholder,
								f = void 0 !== p && p,
								m = e.keyCode,
								v = void 0 === m ? -1 : m;
							if (null != t) {
								var g = this._store.choices,
									_ = n || t,
									y = g ? g.length + 1 : 1,
									E = "".concat(this._baseId, "-").concat(this._idNames.itemChoice, "-").concat(y);
								this._store.dispatch((0, a.addChoice)({
									id: y,
									groupId: h,
									elementId: E,
									value: t,
									label: _,
									disabled: c,
									customProperties: d,
									placeholder: f,
									keyCode: v
								})), s && this._addItem({
									value: t,
									label: _,
									choiceId: y,
									customProperties: d,
									placeholder: f,
									keyCode: v
								})
							}
						}, e.prototype._addGroup = function (e) {
							var t = this,
								i = e.group,
								n = e.id,
								r = e.valueKey,
								s = void 0 === r ? "value" : r,
								o = e.labelKey,
								a = void 0 === o ? "label" : o,
								l = (0, f.isType)("Object", i) ? i.choices : Array.from(i.getElementsByTagName("OPTION")),
								h = n || Math.floor((new Date).valueOf() * Math.random()),
								u = !!i.disabled && i.disabled;
							l ? (this._store.dispatch((0, c.addGroup)({
								value: i.label,
								id: h,
								active: !0,
								disabled: u
							})), l.forEach((function (e) {
								var i = e.disabled || e.parentNode && e.parentNode.disabled;
								t._addChoice({
									value: e[s],
									label: (0, f.isType)("Object", e) ? e[a] : e.innerHTML,
									isSelected: e.selected,
									isDisabled: i,
									groupId: h,
									customProperties: e.customProperties,
									placeholder: e.placeholder
								})
							}))) : this._store.dispatch((0, c.addGroup)({
								value: i.label,
								id: i.id,
								active: !1,
								disabled: i.disabled
							}))
						}, e.prototype._getTemplate = function (e) {
							for (var t, i = [], r = 1; r < arguments.length; r++) i[r - 1] = arguments[r];
							return (t = this._templates[e]).call.apply(t, n([this, this.config], i, !1))
						}, e.prototype._createTemplates = function () {
							var e = this.config.callbackOnCreateTemplates,
								t = {};
							e && "function" == typeof e && (t = e.call(this, f.strToEl)), this._templates = (0, s.default)(g.default, t)
						}, e.prototype._createElements = function () {
							this.containerOuter = new u.Container({
								element: this._getTemplate("containerOuter", this._direction, this._isSelectElement, this._isSelectOneElement, this.config.searchEnabled, this.passedElement.element.type, this.config.labelId),
								classNames: this.config.classNames,
								type: this.passedElement.element.type,
								position: this.config.position
							}), this.containerInner = new u.Container({
								element: this._getTemplate("containerInner"),
								classNames: this.config.classNames,
								type: this.passedElement.element.type,
								position: this.config.position
							}), this.input = new u.Input({
								element: this._getTemplate("input", this._placeholderValue),
								classNames: this.config.classNames,
								type: this.passedElement.element.type,
								preventPaste: !this.config.paste
							}), this.choiceList = new u.List({
								element: this._getTemplate("choiceList", this._isSelectOneElement)
							}), this.itemList = new u.List({
								element: this._getTemplate("itemList", this._isSelectOneElement)
							}), this.dropdown = new u.Dropdown({
								element: this._getTemplate("dropdown"),
								classNames: this.config.classNames,
								type: this.passedElement.element.type
							})
						}, e.prototype._createStructure = function () {
							this.passedElement.conceal(), this.containerInner.wrap(this.passedElement.element), this.containerOuter.wrap(this.containerInner.element), this._isSelectOneElement ? this.input.placeholder = this.config.searchPlaceholderValue || "" : this._placeholderValue && (this.input.placeholder = this._placeholderValue, this.input.setWidth()), this.containerOuter.element.appendChild(this.containerInner.element), this.containerOuter.element.appendChild(this.dropdown.element), this.containerInner.element.appendChild(this.itemList.element), this._isTextElement || this.dropdown.element.appendChild(this.choiceList.element), this._isSelectOneElement ? this.config.searchEnabled && this.dropdown.element.insertBefore(this.input.element, this.dropdown.element.firstChild) : this.containerInner.element.appendChild(this.input.element), this._isSelectElement && (this._highlightPosition = 0, this._isSearching = !1, this._startLoading(), this._presetGroups.length ? this._addPredefinedGroups(this._presetGroups) : this._addPredefinedChoices(this._presetChoices), this._stopLoading()), this._isTextElement && this._addPredefinedItems(this._presetItems)
						}, e.prototype._addPredefinedGroups = function (e) {
							var t = this,
								i = this.passedElement.placeholderOption;
							i && i.parentNode && "SELECT" === i.parentNode.tagName && this._addChoice({
								value: i.value,
								label: i.innerHTML,
								isSelected: i.selected,
								isDisabled: i.disabled,
								placeholder: !0
							}), e.forEach((function (e) {
								return t._addGroup({
									group: e,
									id: e.id || null
								})
							}))
						}, e.prototype._addPredefinedChoices = function (e) {
							var t = this;
							this.config.shouldSort && e.sort(this.config.sorter);
							var i = e.some((function (e) {
									return e.selected
								})),
								n = e.findIndex((function (e) {
									return void 0 === e.disabled || !e.disabled
								}));
							e.forEach((function (e, r) {
								var s = e.value,
									o = void 0 === s ? "" : s,
									a = e.label,
									c = e.customProperties,
									l = e.placeholder;
								if (t._isSelectElement)
									if (e.choices) t._addGroup({
										group: e,
										id: e.id || null
									});
									else {
										var h = !(!t._isSelectOneElement || i || r !== n) || e.selected,
											u = e.disabled;
										t._addChoice({
											value: o,
											label: a,
											isSelected: !!h,
											isDisabled: !!u,
											placeholder: !!l,
											customProperties: c
										})
									}
								else t._addChoice({
									value: o,
									label: a,
									isSelected: !!e.selected,
									isDisabled: !!e.disabled,
									placeholder: !!e.placeholder,
									customProperties: c
								})
							}))
						}, e.prototype._addPredefinedItems = function (e) {
							var t = this;
							e.forEach((function (e) {
								"object" == typeof e && e.value && t._addItem({
									value: e.value,
									label: e.label,
									choiceId: e.id,
									customProperties: e.customProperties,
									placeholder: e.placeholder
								}), "string" == typeof e && t._addItem({
									value: e
								})
							}))
						}, e.prototype._setChoiceOrItem = function (e) {
							var t = this;
							({
								object: function () {
									e.value && (t._isTextElement ? t._addItem({
										value: e.value,
										label: e.label,
										choiceId: e.id,
										customProperties: e.customProperties,
										placeholder: e.placeholder
									}) : t._addChoice({
										value: e.value,
										label: e.label,
										isSelected: !0,
										isDisabled: !1,
										customProperties: e.customProperties,
										placeholder: e.placeholder
									}))
								},
								string: function () {
									t._isTextElement ? t._addItem({
										value: e
									}) : t._addChoice({
										value: e,
										label: e,
										isSelected: !0,
										isDisabled: !1
									})
								}
							})[(0, f.getType)(e).toLowerCase()]()
						}, e.prototype._findAndSelectChoiceByValue = function (e) {
							var t = this,
								i = this._store.choices.find((function (i) {
									return t.config.valueComparer(i.value, e)
								}));
							i && !i.selected && this._addItem({
								value: i.value,
								label: i.label,
								choiceId: i.id,
								groupId: i.groupId,
								customProperties: i.customProperties,
								placeholder: i.placeholder,
								keyCode: i.keyCode
							})
						}, e.prototype._generatePlaceholderValue = function () {
							if (this._isSelectElement && this.passedElement.placeholderOption) {
								var e = this.passedElement.placeholderOption;
								return e ? e.text : null
							}
							var t = this.config,
								i = t.placeholder,
								n = t.placeholderValue,
								r = this.passedElement.element.dataset;
							if (i) {
								if (n) return n;
								if (r.placeholder) return r.placeholder
							}
							return null
						}, e
					}();
				t.default = E
			},
			613: function (e, t, i) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var n = i(799),
					r = i(883),
					s = function () {
						function e(e) {
							var t = e.element,
								i = e.type,
								n = e.classNames,
								r = e.position;
							this.element = t, this.classNames = n, this.type = i, this.position = r, this.isOpen = !1, this.isFlipped = !1, this.isFocussed = !1, this.isDisabled = !1, this.isLoading = !1, this._onFocus = this._onFocus.bind(this), this._onBlur = this._onBlur.bind(this)
						}
						return e.prototype.addEventListeners = function () {
							this.element.addEventListener("focus", this._onFocus), this.element.addEventListener("blur", this._onBlur)
						}, e.prototype.removeEventListeners = function () {
							this.element.removeEventListener("focus", this._onFocus), this.element.removeEventListener("blur", this._onBlur)
						}, e.prototype.shouldFlip = function (e) {
							if ("number" != typeof e) return !1;
							var t = !1;
							return "auto" === this.position ? t = !window.matchMedia("(min-height: ".concat(e + 1, "px)")).matches : "top" === this.position && (t = !0), t
						}, e.prototype.setActiveDescendant = function (e) {
							this.element.setAttribute("aria-activedescendant", e)
						}, e.prototype.removeActiveDescendant = function () {
							this.element.removeAttribute("aria-activedescendant")
						}, e.prototype.open = function (e) {
							this.element.classList.add(this.classNames.openState), this.element.setAttribute("aria-expanded", "true"), this.isOpen = !0, this.shouldFlip(e) && (this.element.classList.add(this.classNames.flippedState), this.isFlipped = !0)
						}, e.prototype.close = function () {
							this.element.classList.remove(this.classNames.openState), this.element.setAttribute("aria-expanded", "false"), this.removeActiveDescendant(), this.isOpen = !1, this.isFlipped && (this.element.classList.remove(this.classNames.flippedState), this.isFlipped = !1)
						}, e.prototype.focus = function () {
							this.isFocussed || this.element.focus()
						}, e.prototype.addFocusState = function () {
							this.element.classList.add(this.classNames.focusState)
						}, e.prototype.removeFocusState = function () {
							this.element.classList.remove(this.classNames.focusState)
						}, e.prototype.enable = function () {
							this.element.classList.remove(this.classNames.disabledState), this.element.removeAttribute("aria-disabled"), this.type === r.SELECT_ONE_TYPE && this.element.setAttribute("tabindex", "0"), this.isDisabled = !1
						}, e.prototype.disable = function () {
							this.element.classList.add(this.classNames.disabledState), this.element.setAttribute("aria-disabled", "true"), this.type === r.SELECT_ONE_TYPE && this.element.setAttribute("tabindex", "-1"), this.isDisabled = !0
						}, e.prototype.wrap = function (e) {
							(0, n.wrap)(e, this.element)
						}, e.prototype.unwrap = function (e) {
							this.element.parentNode && (this.element.parentNode.insertBefore(e, this.element), this.element.parentNode.removeChild(this.element))
						}, e.prototype.addLoadingState = function () {
							this.element.classList.add(this.classNames.loadingState), this.element.setAttribute("aria-busy", "true"), this.isLoading = !0
						}, e.prototype.removeLoadingState = function () {
							this.element.classList.remove(this.classNames.loadingState), this.element.removeAttribute("aria-busy"), this.isLoading = !1
						}, e.prototype._onFocus = function () {
							this.isFocussed = !0
						}, e.prototype._onBlur = function () {
							this.isFocussed = !1
						}, e
					}();
				t.default = s
			},
			217: function (e, t) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var i = function () {
					function e(e) {
						var t = e.element,
							i = e.type,
							n = e.classNames;
						this.element = t, this.classNames = n, this.type = i, this.isActive = !1
					}
					return Object.defineProperty(e.prototype, "distanceFromTopWindow", {
						get: function () {
							return this.element.getBoundingClientRect().bottom
						},
						enumerable: !1,
						configurable: !0
					}), e.prototype.getChild = function (e) {
						return this.element.querySelector(e)
					}, e.prototype.show = function () {
						return this.element.classList.add(this.classNames.activeState), this.element.setAttribute("aria-expanded", "true"), this.isActive = !0, this
					}, e.prototype.hide = function () {
						return this.element.classList.remove(this.classNames.activeState), this.element.setAttribute("aria-expanded", "false"), this.isActive = !1, this
					}, e
				}();
				t.default = i
			},
			520: function (e, t, i) {
				var n = this && this.__importDefault || function (e) {
					return e && e.__esModule ? e : {
						default: e
					}
				};
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.WrappedSelect = t.WrappedInput = t.List = t.Input = t.Container = t.Dropdown = void 0;
				var r = n(i(217));
				t.Dropdown = r.default;
				var s = n(i(613));
				t.Container = s.default;
				var o = n(i(11));
				t.Input = o.default;
				var a = n(i(624));
				t.List = a.default;
				var c = n(i(541));
				t.WrappedInput = c.default;
				var l = n(i(982));
				t.WrappedSelect = l.default
			},
			11: function (e, t, i) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var n = i(799),
					r = i(883),
					s = function () {
						function e(e) {
							var t = e.element,
								i = e.type,
								n = e.classNames,
								r = e.preventPaste;
							this.element = t, this.type = i, this.classNames = n, this.preventPaste = r, this.isFocussed = this.element.isEqualNode(document.activeElement), this.isDisabled = t.disabled, this._onPaste = this._onPaste.bind(this), this._onInput = this._onInput.bind(this), this._onFocus = this._onFocus.bind(this), this._onBlur = this._onBlur.bind(this)
						}
						return Object.defineProperty(e.prototype, "placeholder", {
							set: function (e) {
								this.element.placeholder = e
							},
							enumerable: !1,
							configurable: !0
						}), Object.defineProperty(e.prototype, "value", {
							get: function () {
								return (0, n.sanitise)(this.element.value)
							},
							set: function (e) {
								this.element.value = e
							},
							enumerable: !1,
							configurable: !0
						}), Object.defineProperty(e.prototype, "rawValue", {
							get: function () {
								return this.element.value
							},
							enumerable: !1,
							configurable: !0
						}), e.prototype.addEventListeners = function () {
							this.element.addEventListener("paste", this._onPaste), this.element.addEventListener("input", this._onInput, {
								passive: !0
							}), this.element.addEventListener("focus", this._onFocus, {
								passive: !0
							}), this.element.addEventListener("blur", this._onBlur, {
								passive: !0
							})
						}, e.prototype.removeEventListeners = function () {
							this.element.removeEventListener("input", this._onInput), this.element.removeEventListener("paste", this._onPaste), this.element.removeEventListener("focus", this._onFocus), this.element.removeEventListener("blur", this._onBlur)
						}, e.prototype.enable = function () {
							this.element.removeAttribute("disabled"), this.isDisabled = !1
						}, e.prototype.disable = function () {
							this.element.setAttribute("disabled", ""), this.isDisabled = !0
						}, e.prototype.focus = function () {
							this.isFocussed || this.element.focus()
						}, e.prototype.blur = function () {
							this.isFocussed && this.element.blur()
						}, e.prototype.clear = function (e) {
							return void 0 === e && (e = !0), this.element.value && (this.element.value = ""), e && this.setWidth(), this
						}, e.prototype.setWidth = function () {
							var e = this.element,
								t = e.style,
								i = e.value,
								n = e.placeholder;
							t.minWidth = "".concat(n.length + 1, "ch"), t.width = "".concat(i.length + 1, "ch")
						}, e.prototype.setActiveDescendant = function (e) {
							this.element.setAttribute("aria-activedescendant", e)
						}, e.prototype.removeActiveDescendant = function () {
							this.element.removeAttribute("aria-activedescendant")
						}, e.prototype._onInput = function () {
							this.type !== r.SELECT_ONE_TYPE && this.setWidth()
						}, e.prototype._onPaste = function (e) {
							this.preventPaste && e.preventDefault()
						}, e.prototype._onFocus = function () {
							this.isFocussed = !0
						}, e.prototype._onBlur = function () {
							this.isFocussed = !1
						}, e
					}();
				t.default = s
			},
			624: function (e, t, i) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var n = i(883),
					r = function () {
						function e(e) {
							var t = e.element;
							this.element = t, this.scrollPos = this.element.scrollTop, this.height = this.element.offsetHeight
						}
						return e.prototype.clear = function () {
							this.element.innerHTML = ""
						}, e.prototype.append = function (e) {
							this.element.appendChild(e)
						}, e.prototype.getChild = function (e) {
							return this.element.querySelector(e)
						}, e.prototype.hasChildren = function () {
							return this.element.hasChildNodes()
						}, e.prototype.scrollToTop = function () {
							this.element.scrollTop = 0
						}, e.prototype.scrollToChildElement = function (e, t) {
							var i = this;
							if (e) {
								var n = this.element.offsetHeight,
									r = this.element.scrollTop + n,
									s = e.offsetHeight,
									o = e.offsetTop + s,
									a = t > 0 ? this.element.scrollTop + o - r : e.offsetTop;
								requestAnimationFrame((function () {
									i._animateScroll(a, t)
								}))
							}
						}, e.prototype._scrollDown = function (e, t, i) {
							var n = (i - e) / t,
								r = n > 1 ? n : 1;
							this.element.scrollTop = e + r
						}, e.prototype._scrollUp = function (e, t, i) {
							var n = (e - i) / t,
								r = n > 1 ? n : 1;
							this.element.scrollTop = e - r
						}, e.prototype._animateScroll = function (e, t) {
							var i = this,
								r = n.SCROLLING_SPEED,
								s = this.element.scrollTop,
								o = !1;
							t > 0 ? (this._scrollDown(s, r, e), s < e && (o = !0)) : (this._scrollUp(s, r, e), s > e && (o = !0)), o && requestAnimationFrame((function () {
								i._animateScroll(e, t)
							}))
						}, e
					}();
				t.default = r
			},
			730: function (e, t, i) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var n = i(799),
					r = function () {
						function e(e) {
							var t = e.element,
								i = e.classNames;
							if (this.element = t, this.classNames = i, !(t instanceof HTMLInputElement || t instanceof HTMLSelectElement)) throw new TypeError("Invalid element passed");
							this.isDisabled = !1
						}
						return Object.defineProperty(e.prototype, "isActive", {
							get: function () {
								return "active" === this.element.dataset.choice
							},
							enumerable: !1,
							configurable: !0
						}), Object.defineProperty(e.prototype, "dir", {
							get: function () {
								return this.element.dir
							},
							enumerable: !1,
							configurable: !0
						}), Object.defineProperty(e.prototype, "value", {
							get: function () {
								return this.element.value
							},
							set: function (e) {
								this.element.value = e
							},
							enumerable: !1,
							configurable: !0
						}), e.prototype.conceal = function () {
							this.element.classList.add(this.classNames.input), this.element.hidden = !0, this.element.tabIndex = -1;
							var e = this.element.getAttribute("style");
							e && this.element.setAttribute("data-choice-orig-style", e), this.element.setAttribute("data-choice", "active")
						}, e.prototype.reveal = function () {
							this.element.classList.remove(this.classNames.input), this.element.hidden = !1, this.element.removeAttribute("tabindex");
							var e = this.element.getAttribute("data-choice-orig-style");
							e ? (this.element.removeAttribute("data-choice-orig-style"), this.element.setAttribute("style", e)) : this.element.removeAttribute("style"), this.element.removeAttribute("data-choice"), this.element.value = this.element.value
						}, e.prototype.enable = function () {
							this.element.removeAttribute("disabled"), this.element.disabled = !1, this.isDisabled = !1
						}, e.prototype.disable = function () {
							this.element.setAttribute("disabled", ""), this.element.disabled = !0, this.isDisabled = !0
						}, e.prototype.triggerEvent = function (e, t) {
							(0, n.dispatchEvent)(this.element, e, t)
						}, e
					}();
				t.default = r
			},
			541: function (e, t, i) {
				var n, r = this && this.__extends || (n = function (e, t) {
						return n = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
						}, n(e, t)
					}, function (e, t) {
						if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

						function i() {
							this.constructor = e
						}
						n(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i)
					}),
					s = this && this.__importDefault || function (e) {
						return e && e.__esModule ? e : {
							default: e
						}
					};
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var o = function (e) {
					function t(t) {
						var i = t.element,
							n = t.classNames,
							r = t.delimiter,
							s = e.call(this, {
								element: i,
								classNames: n
							}) || this;
						return s.delimiter = r, s
					}
					return r(t, e), Object.defineProperty(t.prototype, "value", {
						get: function () {
							return this.element.value
						},
						set: function (e) {
							this.element.setAttribute("value", e), this.element.value = e
						},
						enumerable: !1,
						configurable: !0
					}), t
				}(s(i(730)).default);
				t.default = o
			},
			982: function (e, t, i) {
				var n, r = this && this.__extends || (n = function (e, t) {
						return n = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
						}, n(e, t)
					}, function (e, t) {
						if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

						function i() {
							this.constructor = e
						}
						n(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i)
					}),
					s = this && this.__importDefault || function (e) {
						return e && e.__esModule ? e : {
							default: e
						}
					};
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var o = function (e) {
					function t(t) {
						var i = t.element,
							n = t.classNames,
							r = t.template,
							s = e.call(this, {
								element: i,
								classNames: n
							}) || this;
						return s.template = r, s
					}
					return r(t, e), Object.defineProperty(t.prototype, "placeholderOption", {
						get: function () {
							return this.element.querySelector('option[value=""]') || this.element.querySelector("option[placeholder]")
						},
						enumerable: !1,
						configurable: !0
					}), Object.defineProperty(t.prototype, "optionGroups", {
						get: function () {
							return Array.from(this.element.getElementsByTagName("OPTGROUP"))
						},
						enumerable: !1,
						configurable: !0
					}), Object.defineProperty(t.prototype, "options", {
						get: function () {
							return Array.from(this.element.options)
						},
						set: function (e) {
							var t = this,
								i = document.createDocumentFragment();
							e.forEach((function (e) {
								return n = e, r = t.template(n), void i.appendChild(r);
								var n, r
							})), this.appendDocFragment(i)
						},
						enumerable: !1,
						configurable: !0
					}), t.prototype.appendDocFragment = function (e) {
						this.element.innerHTML = "", this.element.appendChild(e)
					}, t
				}(s(i(730)).default);
				t.default = o
			},
			883: function (e, t) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.SCROLLING_SPEED = t.SELECT_MULTIPLE_TYPE = t.SELECT_ONE_TYPE = t.TEXT_TYPE = t.KEY_CODES = t.ACTION_TYPES = t.EVENTS = void 0, t.EVENTS = {
					showDropdown: "showDropdown",
					hideDropdown: "hideDropdown",
					change: "change",
					choice: "choice",
					search: "search",
					addItem: "addItem",
					removeItem: "removeItem",
					highlightItem: "highlightItem",
					highlightChoice: "highlightChoice",
					unhighlightItem: "unhighlightItem"
				}, t.ACTION_TYPES = {
					ADD_CHOICE: "ADD_CHOICE",
					FILTER_CHOICES: "FILTER_CHOICES",
					ACTIVATE_CHOICES: "ACTIVATE_CHOICES",
					CLEAR_CHOICES: "CLEAR_CHOICES",
					ADD_GROUP: "ADD_GROUP",
					ADD_ITEM: "ADD_ITEM",
					REMOVE_ITEM: "REMOVE_ITEM",
					HIGHLIGHT_ITEM: "HIGHLIGHT_ITEM",
					CLEAR_ALL: "CLEAR_ALL",
					RESET_TO: "RESET_TO",
					SET_IS_LOADING: "SET_IS_LOADING"
				}, t.KEY_CODES = {
					BACK_KEY: 46,
					DELETE_KEY: 8,
					ENTER_KEY: 13,
					A_KEY: 65,
					ESC_KEY: 27,
					UP_KEY: 38,
					DOWN_KEY: 40,
					PAGE_UP_KEY: 33,
					PAGE_DOWN_KEY: 34
				}, t.TEXT_TYPE = "text", t.SELECT_ONE_TYPE = "select-one", t.SELECT_MULTIPLE_TYPE = "select-multiple", t.SCROLLING_SPEED = 4
			},
			789: function (e, t, i) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.DEFAULT_CONFIG = t.DEFAULT_CLASSNAMES = void 0;
				var n = i(799);
				t.DEFAULT_CLASSNAMES = {
					containerOuter: "choices",
					containerInner: "choices__inner",
					input: "choices__input",
					inputCloned: "choices__input--cloned",
					list: "choices__list",
					listItems: "choices__list--multiple",
					listSingle: "choices__list--single",
					listDropdown: "choices__list--dropdown",
					item: "choices__item",
					itemSelectable: "choices__item--selectable",
					itemDisabled: "choices__item--disabled",
					itemChoice: "choices__item--choice",
					placeholder: "choices__placeholder",
					group: "choices__group",
					groupHeading: "choices__heading",
					button: "choices__button",
					activeState: "is-active",
					focusState: "is-focused",
					openState: "is-open",
					disabledState: "is-disabled",
					highlightedState: "is-highlighted",
					selectedState: "is-selected",
					flippedState: "is-flipped",
					loadingState: "is-loading",
					noResults: "has-no-results",
					noChoices: "has-no-choices"
				}, t.DEFAULT_CONFIG = {
					items: [],
					choices: [],
					silent: !1,
					renderChoiceLimit: -1,
					maxItemCount: -1,
					addItems: !0,
					addItemFilter: null,
					removeItems: !0,
					removeItemButton: !1,
					editItems: !1,
					allowHTML: !0,
					duplicateItemsAllowed: !0,
					delimiter: ",",
					paste: !0,
					searchEnabled: !0,
					searchChoices: !0,
					searchFloor: 1,
					searchResultLimit: 4,
					searchFields: ["label", "value"],
					position: "auto",
					resetScrollPosition: !0,
					shouldSort: !0,
					shouldSortItems: !1,
					sorter: n.sortByAlpha,
					placeholder: !0,
					placeholderValue: null,
					searchPlaceholderValue: null,
					prependValue: null,
					appendValue: null,
					renderSelectedChoices: "auto",
					loadingText: "Loading...",
					noResultsText: "No results found",
					noChoicesText: "No choices to choose from",
					itemSelectText: "Press to select",
					uniqueItemText: "Only unique values can be added",
					customAddItemText: "Only values matching specific conditions can be added",
					addItemText: function (e) {
						return 'Press Enter to add <b>"'.concat((0, n.sanitise)(e), '"</b>')
					},
					maxItemText: function (e) {
						return "Only ".concat(e, " values can be added")
					},
					valueComparer: function (e, t) {
						return e === t
					},
					fuseOptions: {
						includeScore: !0
					},
					labelId: "",
					callbackOnInit: null,
					callbackOnCreateTemplates: null,
					classNames: t.DEFAULT_CLASSNAMES
				}
			},
			18: function (e, t) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				})
			},
			978: function (e, t) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				})
			},
			948: function (e, t) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				})
			},
			359: function (e, t) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				})
			},
			285: function (e, t) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				})
			},
			533: function (e, t) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				})
			},
			187: function (e, t, i) {
				var n = this && this.__createBinding || (Object.create ? function (e, t, i, n) {
						void 0 === n && (n = i);
						var r = Object.getOwnPropertyDescriptor(t, i);
						r && !("get" in r ? !t.__esModule : r.writable || r.configurable) || (r = {
							enumerable: !0,
							get: function () {
								return t[i]
							}
						}), Object.defineProperty(e, n, r)
					} : function (e, t, i, n) {
						void 0 === n && (n = i), e[n] = t[i]
					}),
					r = this && this.__exportStar || function (e, t) {
						for (var i in e) "default" === i || Object.prototype.hasOwnProperty.call(t, i) || n(t, e, i)
					};
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), r(i(18), t), r(i(978), t), r(i(948), t), r(i(359), t), r(i(285), t), r(i(533), t), r(i(287), t), r(i(132), t), r(i(837), t), r(i(598), t), r(i(369), t), r(i(37), t), r(i(47), t), r(i(923), t), r(i(876), t)
			},
			287: function (e, t) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				})
			},
			132: function (e, t) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				})
			},
			837: function (e, t) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				})
			},
			598: function (e, t) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				})
			},
			37: function (e, t) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				})
			},
			369: function (e, t) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				})
			},
			47: function (e, t) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				})
			},
			923: function (e, t) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				})
			},
			876: function (e, t) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				})
			},
			799: function (e, t) {
				var i;
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.parseCustomProperties = t.diff = t.cloneObject = t.existsInArray = t.dispatchEvent = t.sortByScore = t.sortByAlpha = t.strToEl = t.sanitise = t.isScrolledIntoView = t.getAdjacentEl = t.wrap = t.isType = t.getType = t.generateId = t.generateChars = t.getRandomNumber = void 0, t.getRandomNumber = function (e, t) {
					return Math.floor(Math.random() * (t - e) + e)
				}, t.generateChars = function (e) {
					return Array.from({
						length: e
					}, (function () {
						return (0, t.getRandomNumber)(0, 36).toString(36)
					})).join("")
				}, t.generateId = function (e, i) {
					var n = e.id || e.name && "".concat(e.name, "-").concat((0, t.generateChars)(2)) || (0, t.generateChars)(4);
					return n = n.replace(/(:|\.|\[|\]|,)/g, ""), "".concat(i, "-").concat(n)
				}, t.getType = function (e) {
					return Object.prototype.toString.call(e).slice(8, -1)
				}, t.isType = function (e, i) {
					return null != i && (0, t.getType)(i) === e
				}, t.wrap = function (e, t) {
					return void 0 === t && (t = document.createElement("div")), e.parentNode && (e.nextSibling ? e.parentNode.insertBefore(t, e.nextSibling) : e.parentNode.appendChild(t)), t.appendChild(e)
				}, t.getAdjacentEl = function (e, t, i) {
					void 0 === i && (i = 1);
					for (var n = "".concat(i > 0 ? "next" : "previous", "ElementSibling"), r = e[n]; r;) {
						if (r.matches(t)) return r;
						r = r[n]
					}
					return r
				}, t.isScrolledIntoView = function (e, t, i) {
					return void 0 === i && (i = 1), !!e && (i > 0 ? t.scrollTop + t.offsetHeight >= e.offsetTop + e.offsetHeight : e.offsetTop >= t.scrollTop)
				}, t.sanitise = function (e) {
					return "string" != typeof e ? e : e.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")
				}, t.strToEl = (i = document.createElement("div"), function (e) {
					var t = e.trim();
					i.innerHTML = t;
					for (var n = i.children[0]; i.firstChild;) i.removeChild(i.firstChild);
					return n
				}), t.sortByAlpha = function (e, t) {
					var i = e.value,
						n = e.label,
						r = void 0 === n ? i : n,
						s = t.value,
						o = t.label,
						a = void 0 === o ? s : o;
					return r.localeCompare(a, [], {
						sensitivity: "base",
						ignorePunctuation: !0,
						numeric: !0
					})
				}, t.sortByScore = function (e, t) {
					var i = e.score,
						n = void 0 === i ? 0 : i,
						r = t.score;
					return n - (void 0 === r ? 0 : r)
				}, t.dispatchEvent = function (e, t, i) {
					void 0 === i && (i = null);
					var n = new CustomEvent(t, {
						detail: i,
						bubbles: !0,
						cancelable: !0
					});
					return e.dispatchEvent(n)
				}, t.existsInArray = function (e, t, i) {
					return void 0 === i && (i = "value"), e.some((function (e) {
						return "string" == typeof t ? e[i] === t.trim() : e[i] === t
					}))
				}, t.cloneObject = function (e) {
					return JSON.parse(JSON.stringify(e))
				}, t.diff = function (e, t) {
					var i = Object.keys(e).sort(),
						n = Object.keys(t).sort();
					return i.filter((function (e) {
						return n.indexOf(e) < 0
					}))
				}, t.parseCustomProperties = function (e) {
					if (void 0 !== e) try {
						return JSON.parse(e)
					} catch (t) {
						return e
					}
					return {}
				}
			},
			273: function (e, t) {
				var i = this && this.__spreadArray || function (e, t, i) {
					if (i || 2 === arguments.length)
						for (var n, r = 0, s = t.length; r < s; r++) !n && r in t || (n || (n = Array.prototype.slice.call(t, 0, r)), n[r] = t[r]);
					return e.concat(n || Array.prototype.slice.call(t))
				};
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.defaultState = void 0, t.defaultState = [], t.default = function (e, n) {
					switch (void 0 === e && (e = t.defaultState), void 0 === n && (n = {}), n.type) {
						case "ADD_CHOICE":
							var r = n,
								s = {
									id: r.id,
									elementId: r.elementId,
									groupId: r.groupId,
									value: r.value,
									label: r.label || r.value,
									disabled: r.disabled || !1,
									selected: !1,
									active: !0,
									score: 9999,
									customProperties: r.customProperties,
									placeholder: r.placeholder || !1
								};
							return i(i([], e, !0), [s], !1);
						case "ADD_ITEM":
							var o = n;
							return o.choiceId > -1 ? e.map((function (e) {
								var t = e;
								return t.id === parseInt("".concat(o.choiceId), 10) && (t.selected = !0), t
							})) : e;
						case "REMOVE_ITEM":
							var a = n;
							return a.choiceId && a.choiceId > -1 ? e.map((function (e) {
								var t = e;
								return t.id === parseInt("".concat(a.choiceId), 10) && (t.selected = !1), t
							})) : e;
						case "FILTER_CHOICES":
							var c = n;
							return e.map((function (e) {
								var t = e;
								return t.active = c.results.some((function (e) {
									var i = e.item,
										n = e.score;
									return i.id === t.id && (t.score = n, !0)
								})), t
							}));
						case "ACTIVATE_CHOICES":
							var l = n;
							return e.map((function (e) {
								var t = e;
								return t.active = l.active, t
							}));
						case "CLEAR_CHOICES":
							return t.defaultState;
						default:
							return e
					}
				}
			},
			871: function (e, t) {
				var i = this && this.__spreadArray || function (e, t, i) {
					if (i || 2 === arguments.length)
						for (var n, r = 0, s = t.length; r < s; r++) !n && r in t || (n || (n = Array.prototype.slice.call(t, 0, r)), n[r] = t[r]);
					return e.concat(n || Array.prototype.slice.call(t))
				};
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.defaultState = void 0, t.defaultState = [], t.default = function (e, n) {
					switch (void 0 === e && (e = t.defaultState), void 0 === n && (n = {}), n.type) {
						case "ADD_GROUP":
							var r = n;
							return i(i([], e, !0), [{
								id: r.id,
								value: r.value,
								active: r.active,
								disabled: r.disabled
							}], !1);
						case "CLEAR_CHOICES":
							return [];
						default:
							return e
					}
				}
			},
			655: function (e, t, i) {
				var n = this && this.__importDefault || function (e) {
					return e && e.__esModule ? e : {
						default: e
					}
				};
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.defaultState = void 0;
				var r = i(791),
					s = n(i(52)),
					o = n(i(871)),
					a = n(i(273)),
					c = n(i(502)),
					l = i(799);
				t.defaultState = {
					groups: [],
					items: [],
					choices: [],
					loading: !1
				};
				var h = (0, r.combineReducers)({
					items: s.default,
					groups: o.default,
					choices: a.default,
					loading: c.default
				});
				t.default = function (e, i) {
					var n = e;
					if ("CLEAR_ALL" === i.type) n = t.defaultState;
					else if ("RESET_TO" === i.type) return (0, l.cloneObject)(i.state);
					return h(n, i)
				}
			},
			52: function (e, t) {
				var i = this && this.__spreadArray || function (e, t, i) {
					if (i || 2 === arguments.length)
						for (var n, r = 0, s = t.length; r < s; r++) !n && r in t || (n || (n = Array.prototype.slice.call(t, 0, r)), n[r] = t[r]);
					return e.concat(n || Array.prototype.slice.call(t))
				};
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.defaultState = void 0, t.defaultState = [], t.default = function (e, n) {
					switch (void 0 === e && (e = t.defaultState), void 0 === n && (n = {}), n.type) {
						case "ADD_ITEM":
							var r = n;
							return i(i([], e, !0), [{
								id: r.id,
								choiceId: r.choiceId,
								groupId: r.groupId,
								value: r.value,
								label: r.label,
								active: !0,
								highlighted: !1,
								customProperties: r.customProperties,
								placeholder: r.placeholder || !1,
								keyCode: null
							}], !1).map((function (e) {
								var t = e;
								return t.highlighted = !1, t
							}));
						case "REMOVE_ITEM":
							return e.map((function (e) {
								var t = e;
								return t.id === n.id && (t.active = !1), t
							}));
						case "HIGHLIGHT_ITEM":
							var s = n;
							return e.map((function (e) {
								var t = e;
								return t.id === s.id && (t.highlighted = s.highlighted), t
							}));
						default:
							return e
					}
				}
			},
			502: function (e, t) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.defaultState = void 0, t.defaultState = !1, t.default = function (e, i) {
					return void 0 === e && (e = t.defaultState), void 0 === i && (i = {}), "SET_IS_LOADING" === i.type ? i.isLoading : e
				}
			},
			744: function (e, t, i) {
				var n = this && this.__spreadArray || function (e, t, i) {
						if (i || 2 === arguments.length)
							for (var n, r = 0, s = t.length; r < s; r++) !n && r in t || (n || (n = Array.prototype.slice.call(t, 0, r)), n[r] = t[r]);
						return e.concat(n || Array.prototype.slice.call(t))
					},
					r = this && this.__importDefault || function (e) {
						return e && e.__esModule ? e : {
							default: e
						}
					};
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var s = i(791),
					o = r(i(655)),
					a = function () {
						function e() {
							this._store = (0, s.createStore)(o.default, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
						}
						return e.prototype.subscribe = function (e) {
							this._store.subscribe(e)
						}, e.prototype.dispatch = function (e) {
							this._store.dispatch(e)
						}, Object.defineProperty(e.prototype, "state", {
							get: function () {
								return this._store.getState()
							},
							enumerable: !1,
							configurable: !0
						}), Object.defineProperty(e.prototype, "items", {
							get: function () {
								return this.state.items
							},
							enumerable: !1,
							configurable: !0
						}), Object.defineProperty(e.prototype, "activeItems", {
							get: function () {
								return this.items.filter((function (e) {
									return !0 === e.active
								}))
							},
							enumerable: !1,
							configurable: !0
						}), Object.defineProperty(e.prototype, "highlightedActiveItems", {
							get: function () {
								return this.items.filter((function (e) {
									return e.active && e.highlighted
								}))
							},
							enumerable: !1,
							configurable: !0
						}), Object.defineProperty(e.prototype, "choices", {
							get: function () {
								return this.state.choices
							},
							enumerable: !1,
							configurable: !0
						}), Object.defineProperty(e.prototype, "activeChoices", {
							get: function () {
								return this.choices.filter((function (e) {
									return !0 === e.active
								}))
							},
							enumerable: !1,
							configurable: !0
						}), Object.defineProperty(e.prototype, "selectableChoices", {
							get: function () {
								return this.choices.filter((function (e) {
									return !0 !== e.disabled
								}))
							},
							enumerable: !1,
							configurable: !0
						}), Object.defineProperty(e.prototype, "searchableChoices", {
							get: function () {
								return this.selectableChoices.filter((function (e) {
									return !0 !== e.placeholder
								}))
							},
							enumerable: !1,
							configurable: !0
						}), Object.defineProperty(e.prototype, "placeholderChoice", {
							get: function () {
								return n([], this.choices, !0).reverse().find((function (e) {
									return !0 === e.placeholder
								}))
							},
							enumerable: !1,
							configurable: !0
						}), Object.defineProperty(e.prototype, "groups", {
							get: function () {
								return this.state.groups
							},
							enumerable: !1,
							configurable: !0
						}), Object.defineProperty(e.prototype, "activeGroups", {
							get: function () {
								var e = this.groups,
									t = this.choices;
								return e.filter((function (e) {
									var i = !0 === e.active && !1 === e.disabled,
										n = t.some((function (e) {
											return !0 === e.active && !1 === e.disabled
										}));
									return i && n
								}), [])
							},
							enumerable: !1,
							configurable: !0
						}), e.prototype.isLoading = function () {
							return this.state.loading
						}, e.prototype.getChoiceById = function (e) {
							return this.activeChoices.find((function (t) {
								return t.id === parseInt(e, 10)
							}))
						}, e.prototype.getGroupById = function (e) {
							return this.groups.find((function (t) {
								return t.id === e
							}))
						}, e
					}();
				t.default = a
			},
			686: function (e, t) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
				var i = {
					containerOuter: function (e, t, i, n, r, s, o) {
						var a = e.classNames.containerOuter,
							c = Object.assign(document.createElement("div"), {
								className: a
							});
						return c.dataset.type = s, t && (c.dir = t), n && (c.tabIndex = 0), i && (c.setAttribute("role", r ? "combobox" : "listbox"), r && c.setAttribute("aria-autocomplete", "list")), c.setAttribute("aria-haspopup", "true"), c.setAttribute("aria-expanded", "false"), o && c.setAttribute("aria-labelledby", o), c
					},
					containerInner: function (e) {
						var t = e.classNames.containerInner;
						return Object.assign(document.createElement("div"), {
							className: t
						})
					},
					itemList: function (e, t) {
						var i = e.classNames,
							n = i.list,
							r = i.listSingle,
							s = i.listItems;
						return Object.assign(document.createElement("div"), {
							className: "".concat(n, " ").concat(t ? r : s)
						})
					},
					placeholder: function (e, t) {
						var i, n = e.allowHTML,
							r = e.classNames.placeholder;
						return Object.assign(document.createElement("div"), ((i = {
							className: r
						})[n ? "innerHTML" : "innerText"] = t, i))
					},
					item: function (e, t, i) {
						var n, r, s = e.allowHTML,
							o = e.classNames,
							a = o.item,
							c = o.button,
							l = o.highlightedState,
							h = o.itemSelectable,
							u = o.placeholder,
							d = t.id,
							p = t.value,
							f = t.label,
							m = t.customProperties,
							v = t.active,
							g = t.disabled,
							_ = t.highlighted,
							y = t.placeholder,
							E = Object.assign(document.createElement("div"), ((n = {
								className: a
							})[s ? "innerHTML" : "innerText"] = f, n));
						if (Object.assign(E.dataset, {
								item: "",
								id: d,
								value: p,
								customProperties: m
							}), v && E.setAttribute("aria-selected", "true"), g && E.setAttribute("aria-disabled", "true"), y && E.classList.add(u), E.classList.add(_ ? l : h), i) {
							g && E.classList.remove(h), E.dataset.deletable = "";
							var b = "Remove item",
								S = Object.assign(document.createElement("button"), ((r = {
									type: "button",
									className: c
								})[s ? "innerHTML" : "innerText"] = b, r));
							S.setAttribute("aria-label", "".concat(b, ": '").concat(p, "'")), S.dataset.button = "", E.appendChild(S)
						}
						return E
					},
					choiceList: function (e, t) {
						var i = e.classNames.list,
							n = Object.assign(document.createElement("div"), {
								className: i
							});
						return t || n.setAttribute("aria-multiselectable", "true"), n.setAttribute("role", "listbox"), n
					},
					choiceGroup: function (e, t) {
						var i, n = e.allowHTML,
							r = e.classNames,
							s = r.group,
							o = r.groupHeading,
							a = r.itemDisabled,
							c = t.id,
							l = t.value,
							h = t.disabled,
							u = Object.assign(document.createElement("div"), {
								className: "".concat(s, " ").concat(h ? a : "")
							});
						return u.setAttribute("role", "group"), Object.assign(u.dataset, {
							group: "",
							id: c,
							value: l
						}), h && u.setAttribute("aria-disabled", "true"), u.appendChild(Object.assign(document.createElement("div"), ((i = {
							className: o
						})[n ? "innerHTML" : "innerText"] = l, i))), u
					},
					choice: function (e, t, i) {
						var n, r = e.allowHTML,
							s = e.classNames,
							o = s.item,
							a = s.itemChoice,
							c = s.itemSelectable,
							l = s.selectedState,
							h = s.itemDisabled,
							u = s.placeholder,
							d = t.id,
							p = t.value,
							f = t.label,
							m = t.groupId,
							v = t.elementId,
							g = t.disabled,
							_ = t.selected,
							y = t.placeholder,
							E = Object.assign(document.createElement("div"), ((n = {
								id: v
							})[r ? "innerHTML" : "innerText"] = f, n.className = "".concat(o, " ").concat(a), n));
						return _ && E.classList.add(l), y && E.classList.add(u), E.setAttribute("role", m && m > 0 ? "treeitem" : "option"), Object.assign(E.dataset, {
							choice: "",
							id: d,
							value: p,
							selectText: i
						}), g ? (E.classList.add(h), E.dataset.choiceDisabled = "", E.setAttribute("aria-disabled", "true")) : (E.classList.add(c), E.dataset.choiceSelectable = ""), E
					},
					input: function (e, t) {
						var i = e.classNames,
							n = i.input,
							r = i.inputCloned,
							s = Object.assign(document.createElement("input"), {
								type: "search",
								name: "search_terms",
								className: "".concat(n, " ").concat(r),
								autocomplete: "off",
								autocapitalize: "off",
								spellcheck: !1
							});
						return s.setAttribute("role", "textbox"), s.setAttribute("aria-autocomplete", "list"), s.setAttribute("aria-label", t), s
					},
					dropdown: function (e) {
						var t = e.classNames,
							i = t.list,
							n = t.listDropdown,
							r = document.createElement("div");
						return r.classList.add(i, n), r.setAttribute("aria-expanded", "false"), r
					},
					notice: function (e, t, i) {
						var n, r = e.allowHTML,
							s = e.classNames,
							o = s.item,
							a = s.itemChoice,
							c = s.noResults,
							l = s.noChoices;
						void 0 === i && (i = "");
						var h = [o, a];
						return "no-choices" === i ? h.push(l) : "no-results" === i && h.push(c), Object.assign(document.createElement("div"), ((n = {})[r ? "innerHTML" : "innerText"] = t, n.className = h.join(" "), n))
					},
					option: function (e) {
						var t = e.label,
							i = e.value,
							n = e.customProperties,
							r = e.active,
							s = e.disabled,
							o = new Option(t, i, !1, r);
						return n && (o.dataset.customProperties = "".concat(n)), o.disabled = !!s, o
					}
				};
				t.default = i
			},
			996: function (e) {
				var t = function (e) {
						return function (e) {
							return !!e && "object" == typeof e
						}(e) && ! function (e) {
							var t = Object.prototype.toString.call(e);
							return "[object RegExp]" === t || "[object Date]" === t || function (e) {
								return e.$$typeof === i
							}(e)
						}(e)
					},
					i = "function" == typeof Symbol && Symbol.for ? Symbol.for("react.element") : 60103;

				function n(e, t) {
					return !1 !== t.clone && t.isMergeableObject(e) ? a((i = e, Array.isArray(i) ? [] : {}), e, t) : e;
					var i
				}

				function r(e, t, i) {
					return e.concat(t).map((function (e) {
						return n(e, i)
					}))
				}

				function s(e) {
					return Object.keys(e).concat(function (e) {
						return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter((function (t) {
							return e.propertyIsEnumerable(t)
						})) : []
					}(e))
				}

				function o(e, t) {
					try {
						return t in e
					} catch (e) {
						return !1
					}
				}

				function a(e, i, c) {
					(c = c || {}).arrayMerge = c.arrayMerge || r, c.isMergeableObject = c.isMergeableObject || t, c.cloneUnlessOtherwiseSpecified = n;
					var l = Array.isArray(i);
					return l === Array.isArray(e) ? l ? c.arrayMerge(e, i, c) : function (e, t, i) {
						var r = {};
						return i.isMergeableObject(e) && s(e).forEach((function (t) {
							r[t] = n(e[t], i)
						})), s(t).forEach((function (s) {
							(function (e, t) {
								return o(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t))
							})(e, s) || (o(e, s) && i.isMergeableObject(t[s]) ? r[s] = function (e, t) {
								if (!t.customMerge) return a;
								var i = t.customMerge(e);
								return "function" == typeof i ? i : a
							}(s, i)(e[s], t[s], i) : r[s] = n(t[s], i))
						})), r
					}(e, i, c) : n(i, c)
				}
				a.all = function (e, t) {
					if (!Array.isArray(e)) throw new Error("first argument should be an array");
					return e.reduce((function (e, i) {
						return a(e, i, t)
					}), {})
				};
				var c = a;
				e.exports = c
			},
			221: function (e, t, i) {
				function n(e) {
					return Array.isArray ? Array.isArray(e) : "[object Array]" === l(e)
				}

				function r(e) {
					return "string" == typeof e
				}

				function s(e) {
					return "number" == typeof e
				}

				function o(e) {
					return "object" == typeof e
				}

				function a(e) {
					return null != e
				}

				function c(e) {
					return !e.trim().length
				}

				function l(e) {
					return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e)
				}
				i.r(t), i.d(t, {
					default: function () {
						return R
					}
				});
				const h = Object.prototype.hasOwnProperty;
				class u {
					constructor(e) {
						this._keys = [], this._keyMap = {};
						let t = 0;
						e.forEach((e => {
							let i = d(e);
							t += i.weight, this._keys.push(i), this._keyMap[i.id] = i, t += i.weight
						})), this._keys.forEach((e => {
							e.weight /= t
						}))
					}
					get(e) {
						return this._keyMap[e]
					}
					keys() {
						return this._keys
					}
					toJSON() {
						return JSON.stringify(this._keys)
					}
				}

				function d(e) {
					let t = null,
						i = null,
						s = null,
						o = 1,
						a = null;
					if (r(e) || n(e)) s = e, t = p(e), i = f(e);
					else {
						if (!h.call(e, "name")) throw new Error("Missing name property in key");
						const n = e.name;
						if (s = n, h.call(e, "weight") && (o = e.weight, o <= 0)) throw new Error((e => `Property 'weight' in key '${e}' must be a positive integer`)(n));
						t = p(n), i = f(n), a = e.getFn
					}
					return {
						path: t,
						id: i,
						weight: o,
						src: s,
						getFn: a
					}
				}

				function p(e) {
					return n(e) ? e : e.split(".")
				}

				function f(e) {
					return n(e) ? e.join(".") : e
				}
				var m = {
					isCaseSensitive: !1,
					includeScore: !1,
					keys: [],
					shouldSort: !0,
					sortFn: (e, t) => e.score === t.score ? e.idx < t.idx ? -1 : 1 : e.score < t.score ? -1 : 1,
					includeMatches: !1,
					findAllMatches: !1,
					minMatchCharLength: 1,
					location: 0,
					threshold: .6,
					distance: 100,
					useExtendedSearch: !1,
					getFn: function (e, t) {
						let i = [],
							c = !1;
						const h = (e, t, u) => {
							if (a(e))
								if (t[u]) {
									const d = e[t[u]];
									if (!a(d)) return;
									if (u === t.length - 1 && (r(d) || s(d) || function (e) {
											return !0 === e || !1 === e || function (e) {
												return o(e) && null !== e
											}(e) && "[object Boolean]" == l(e)
										}(d))) i.push(function (e) {
										return null == e ? "" : function (e) {
											if ("string" == typeof e) return e;
											let t = e + "";
											return "0" == t && 1 / e == -1 / 0 ? "-0" : t
										}(e)
									}(d));
									else if (n(d)) {
										c = !0;
										for (let e = 0, i = d.length; e < i; e += 1) h(d[e], t, u + 1)
									} else t.length && h(d, t, u + 1)
								} else i.push(e)
						};
						return h(e, r(t) ? t.split(".") : t, 0), c ? i : i[0]
					},
					ignoreLocation: !1,
					ignoreFieldNorm: !1,
					fieldNormWeight: 1
				};
				const v = /[^ ]+/g;
				class g {
					constructor({
						getFn: e = m.getFn,
						fieldNormWeight: t = m.fieldNormWeight
					} = {}) {
						this.norm = function (e = 1, t = 3) {
							const i = new Map,
								n = Math.pow(10, t);
							return {
								get(t) {
									const r = t.match(v).length;
									if (i.has(r)) return i.get(r);
									const s = 1 / Math.pow(r, .5 * e),
										o = parseFloat(Math.round(s * n) / n);
									return i.set(r, o), o
								},
								clear() {
									i.clear()
								}
							}
						}(t, 3), this.getFn = e, this.isCreated = !1, this.setIndexRecords()
					}
					setSources(e = []) {
						this.docs = e
					}
					setIndexRecords(e = []) {
						this.records = e
					}
					setKeys(e = []) {
						this.keys = e, this._keysMap = {}, e.forEach(((e, t) => {
							this._keysMap[e.id] = t
						}))
					}
					create() {
						!this.isCreated && this.docs.length && (this.isCreated = !0, r(this.docs[0]) ? this.docs.forEach(((e, t) => {
							this._addString(e, t)
						})) : this.docs.forEach(((e, t) => {
							this._addObject(e, t)
						})), this.norm.clear())
					}
					add(e) {
						const t = this.size();
						r(e) ? this._addString(e, t) : this._addObject(e, t)
					}
					removeAt(e) {
						this.records.splice(e, 1);
						for (let t = e, i = this.size(); t < i; t += 1) this.records[t].i -= 1
					}
					getValueForItemAtKeyId(e, t) {
						return e[this._keysMap[t]]
					}
					size() {
						return this.records.length
					}
					_addString(e, t) {
						if (!a(e) || c(e)) return;
						let i = {
							v: e,
							i: t,
							n: this.norm.get(e)
						};
						this.records.push(i)
					}
					_addObject(e, t) {
						let i = {
							i: t,
							$: {}
						};
						this.keys.forEach(((t, s) => {
							let o = t.getFn ? t.getFn(e) : this.getFn(e, t.path);
							if (a(o))
								if (n(o)) {
									let e = [];
									const t = [{
										nestedArrIndex: -1,
										value: o
									}];
									for (; t.length;) {
										const {
											nestedArrIndex: i,
											value: s
										} = t.pop();
										if (a(s))
											if (r(s) && !c(s)) {
												let t = {
													v: s,
													i: i,
													n: this.norm.get(s)
												};
												e.push(t)
											} else n(s) && s.forEach(((e, i) => {
												t.push({
													nestedArrIndex: i,
													value: e
												})
											}))
									}
									i.$[s] = e
								} else if (r(o) && !c(o)) {
								let e = {
									v: o,
									n: this.norm.get(o)
								};
								i.$[s] = e
							}
						})), this.records.push(i)
					}
					toJSON() {
						return {
							keys: this.keys,
							records: this.records
						}
					}
				}

				function _(e, t, {
					getFn: i = m.getFn,
					fieldNormWeight: n = m.fieldNormWeight
				} = {}) {
					const r = new g({
						getFn: i,
						fieldNormWeight: n
					});
					return r.setKeys(e.map(d)), r.setSources(t), r.create(), r
				}

				function y(e, {
					errors: t = 0,
					currentLocation: i = 0,
					expectedLocation: n = 0,
					distance: r = m.distance,
					ignoreLocation: s = m.ignoreLocation
				} = {}) {
					const o = t / e.length;
					if (s) return o;
					const a = Math.abs(n - i);
					return r ? o + a / r : a ? 1 : o
				}
				const E = 32;

				function b(e) {
					let t = {};
					for (let i = 0, n = e.length; i < n; i += 1) {
						const r = e.charAt(i);
						t[r] = (t[r] || 0) | 1 << n - i - 1
					}
					return t
				}
				class S {
					constructor(e, {
						location: t = m.location,
						threshold: i = m.threshold,
						distance: n = m.distance,
						includeMatches: r = m.includeMatches,
						findAllMatches: s = m.findAllMatches,
						minMatchCharLength: o = m.minMatchCharLength,
						isCaseSensitive: a = m.isCaseSensitive,
						ignoreLocation: c = m.ignoreLocation
					} = {}) {
						if (this.options = {
								location: t,
								threshold: i,
								distance: n,
								includeMatches: r,
								findAllMatches: s,
								minMatchCharLength: o,
								isCaseSensitive: a,
								ignoreLocation: c
							}, this.pattern = a ? e : e.toLowerCase(), this.chunks = [], !this.pattern.length) return;
						const l = (e, t) => {
								this.chunks.push({
									pattern: e,
									alphabet: b(e),
									startIndex: t
								})
							},
							h = this.pattern.length;
						if (h > E) {
							let e = 0;
							const t = h % E,
								i = h - t;
							for (; e < i;) l(this.pattern.substr(e, E), e), e += E;
							if (t) {
								const e = h - E;
								l(this.pattern.substr(e), e)
							}
						} else l(this.pattern, 0)
					}
					searchIn(e) {
						const {
							isCaseSensitive: t,
							includeMatches: i
						} = this.options;
						if (t || (e = e.toLowerCase()), this.pattern === e) {
							let t = {
								isMatch: !0,
								score: 0
							};
							return i && (t.indices = [
								[0, e.length - 1]
							]), t
						}
						const {
							location: n,
							distance: r,
							threshold: s,
							findAllMatches: o,
							minMatchCharLength: a,
							ignoreLocation: c
						} = this.options;
						let l = [],
							h = 0,
							u = !1;
						this.chunks.forEach((({
							pattern: t,
							alphabet: d,
							startIndex: p
						}) => {
							const {
								isMatch: f,
								score: v,
								indices: g
							} = function (e, t, i, {
								location: n = m.location,
								distance: r = m.distance,
								threshold: s = m.threshold,
								findAllMatches: o = m.findAllMatches,
								minMatchCharLength: a = m.minMatchCharLength,
								includeMatches: c = m.includeMatches,
								ignoreLocation: l = m.ignoreLocation
							} = {}) {
								if (t.length > E) throw new Error("Pattern length exceeds max of 32.");
								const h = t.length,
									u = e.length,
									d = Math.max(0, Math.min(n, u));
								let p = s,
									f = d;
								const v = a > 1 || c,
									g = v ? Array(u) : [];
								let _;
								for (;
									(_ = e.indexOf(t, f)) > -1;) {
									let e = y(t, {
										currentLocation: _,
										expectedLocation: d,
										distance: r,
										ignoreLocation: l
									});
									if (p = Math.min(e, p), f = _ + h, v) {
										let e = 0;
										for (; e < h;) g[_ + e] = 1, e += 1
									}
								}
								f = -1;
								let b = [],
									S = 1,
									O = h + u;
								const I = 1 << h - 1;
								for (let n = 0; n < h; n += 1) {
									let s = 0,
										a = O;
									for (; s < a;) y(t, {
										errors: n,
										currentLocation: d + a,
										expectedLocation: d,
										distance: r,
										ignoreLocation: l
									}) <= p ? s = a : O = a, a = Math.floor((O - s) / 2 + s);
									O = a;
									let c = Math.max(1, d - a + 1),
										m = o ? u : Math.min(d + a, u) + h,
										_ = Array(m + 2);
									_[m + 1] = (1 << n) - 1;
									for (let s = m; s >= c; s -= 1) {
										let o = s - 1,
											a = i[e.charAt(o)];
										if (v && (g[o] = +!!a), _[s] = (_[s + 1] << 1 | 1) & a, n && (_[s] |= (b[s + 1] | b[s]) << 1 | 1 | b[s + 1]), _[s] & I && (S = y(t, {
												errors: n,
												currentLocation: o,
												expectedLocation: d,
												distance: r,
												ignoreLocation: l
											}), S <= p)) {
											if (p = S, f = o, f <= d) break;
											c = Math.max(1, 2 * d - f)
										}
									}
									if (y(t, {
											errors: n + 1,
											currentLocation: d,
											expectedLocation: d,
											distance: r,
											ignoreLocation: l
										}) > p) break;
									b = _
								}
								const C = {
									isMatch: f >= 0,
									score: Math.max(.001, S)
								};
								if (v) {
									const e = function (e = [], t = m.minMatchCharLength) {
										let i = [],
											n = -1,
											r = -1,
											s = 0;
										for (let o = e.length; s < o; s += 1) {
											let o = e[s];
											o && -1 === n ? n = s : o || -1 === n || (r = s - 1, r - n + 1 >= t && i.push([n, r]), n = -1)
										}
										return e[s - 1] && s - n >= t && i.push([n, s - 1]), i
									}(g, a);
									e.length ? c && (C.indices = e) : C.isMatch = !1
								}
								return C
							}(e, t, d, {
								location: n + p,
								distance: r,
								threshold: s,
								findAllMatches: o,
								minMatchCharLength: a,
								includeMatches: i,
								ignoreLocation: c
							});
							f && (u = !0), h += v, f && g && (l = [...l, ...g])
						}));
						let d = {
							isMatch: u,
							score: u ? h / this.chunks.length : 1
						};
						return u && i && (d.indices = l), d
					}
				}
				class O {
					constructor(e) {
						this.pattern = e
					}
					static isMultiMatch(e) {
						return I(e, this.multiRegex)
					}
					static isSingleMatch(e) {
						return I(e, this.singleRegex)
					}
					search() {}
				}

				function I(e, t) {
					const i = e.match(t);
					return i ? i[1] : null
				}
				class C extends O {
					constructor(e, {
						location: t = m.location,
						threshold: i = m.threshold,
						distance: n = m.distance,
						includeMatches: r = m.includeMatches,
						findAllMatches: s = m.findAllMatches,
						minMatchCharLength: o = m.minMatchCharLength,
						isCaseSensitive: a = m.isCaseSensitive,
						ignoreLocation: c = m.ignoreLocation
					} = {}) {
						super(e), this._bitapSearch = new S(e, {
							location: t,
							threshold: i,
							distance: n,
							includeMatches: r,
							findAllMatches: s,
							minMatchCharLength: o,
							isCaseSensitive: a,
							ignoreLocation: c
						})
					}
					static get type() {
						return "fuzzy"
					}
					static get multiRegex() {
						return /^"(.*)"$/
					}
					static get singleRegex() {
						return /^(.*)$/
					}
					search(e) {
						return this._bitapSearch.searchIn(e)
					}
				}
				class T extends O {
					constructor(e) {
						super(e)
					}
					static get type() {
						return "include"
					}
					static get multiRegex() {
						return /^'"(.*)"$/
					}
					static get singleRegex() {
						return /^'(.*)$/
					}
					search(e) {
						let t, i = 0;
						const n = [],
							r = this.pattern.length;
						for (;
							(t = e.indexOf(this.pattern, i)) > -1;) i = t + r, n.push([t, i - 1]);
						const s = !!n.length;
						return {
							isMatch: s,
							score: s ? 0 : 1,
							indices: n
						}
					}
				}
				const L = [class extends O {
						constructor(e) {
							super(e)
						}
						static get type() {
							return "exact"
						}
						static get multiRegex() {
							return /^="(.*)"$/
						}
						static get singleRegex() {
							return /^=(.*)$/
						}
						search(e) {
							const t = e === this.pattern;
							return {
								isMatch: t,
								score: t ? 0 : 1,
								indices: [0, this.pattern.length - 1]
							}
						}
					}, T, class extends O {
						constructor(e) {
							super(e)
						}
						static get type() {
							return "prefix-exact"
						}
						static get multiRegex() {
							return /^\^"(.*)"$/
						}
						static get singleRegex() {
							return /^\^(.*)$/
						}
						search(e) {
							const t = e.startsWith(this.pattern);
							return {
								isMatch: t,
								score: t ? 0 : 1,
								indices: [0, this.pattern.length - 1]
							}
						}
					}, class extends O {
						constructor(e) {
							super(e)
						}
						static get type() {
							return "inverse-prefix-exact"
						}
						static get multiRegex() {
							return /^!\^"(.*)"$/
						}
						static get singleRegex() {
							return /^!\^(.*)$/
						}
						search(e) {
							const t = !e.startsWith(this.pattern);
							return {
								isMatch: t,
								score: t ? 0 : 1,
								indices: [0, e.length - 1]
							}
						}
					}, class extends O {
						constructor(e) {
							super(e)
						}
						static get type() {
							return "inverse-suffix-exact"
						}
						static get multiRegex() {
							return /^!"(.*)"\$$/
						}
						static get singleRegex() {
							return /^!(.*)\$$/
						}
						search(e) {
							const t = !e.endsWith(this.pattern);
							return {
								isMatch: t,
								score: t ? 0 : 1,
								indices: [0, e.length - 1]
							}
						}
					}, class extends O {
						constructor(e) {
							super(e)
						}
						static get type() {
							return "suffix-exact"
						}
						static get multiRegex() {
							return /^"(.*)"\$$/
						}
						static get singleRegex() {
							return /^(.*)\$$/
						}
						search(e) {
							const t = e.endsWith(this.pattern);
							return {
								isMatch: t,
								score: t ? 0 : 1,
								indices: [e.length - this.pattern.length, e.length - 1]
							}
						}
					}, class extends O {
						constructor(e) {
							super(e)
						}
						static get type() {
							return "inverse-exact"
						}
						static get multiRegex() {
							return /^!"(.*)"$/
						}
						static get singleRegex() {
							return /^!(.*)$/
						}
						search(e) {
							const t = -1 === e.indexOf(this.pattern);
							return {
								isMatch: t,
								score: t ? 0 : 1,
								indices: [0, e.length - 1]
							}
						}
					}, C],
					w = L.length,
					A = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,
					M = new Set([C.type, T.type]);
				const P = [];

				function x(e, t) {
					for (let i = 0, n = P.length; i < n; i += 1) {
						let n = P[i];
						if (n.condition(e, t)) return new n(e, t)
					}
					return new S(e, t)
				}
				const N = "$and",
					D = e => !(!e.$and && !e.$or),
					j = e => ({
						[N]: Object.keys(e).map((t => ({
							[t]: e[t]
						})))
					});

				function F(e, t, {
					auto: i = !0
				} = {}) {
					const s = e => {
						let a = Object.keys(e);
						const c = (e => !!e.$path)(e);
						if (!c && a.length > 1 && !D(e)) return s(j(e));
						if ((e => !n(e) && o(e) && !D(e))(e)) {
							const n = c ? e.$path : a[0],
								s = c ? e.$val : e[n];
							if (!r(s)) throw new Error((e => `Invalid value for key ${e}`)(n));
							const o = {
								keyId: f(n),
								pattern: s
							};
							return i && (o.searcher = x(s, t)), o
						}
						let l = {
							children: [],
							operator: a[0]
						};
						return a.forEach((t => {
							const i = e[t];
							n(i) && i.forEach((e => {
								l.children.push(s(e))
							}))
						})), l
					};
					return D(e) || (e = j(e)), s(e)
				}

				function k(e, t) {
					const i = e.matches;
					t.matches = [], a(i) && i.forEach((e => {
						if (!a(e.indices) || !e.indices.length) return;
						const {
							indices: i,
							value: n
						} = e;
						let r = {
							indices: i,
							value: n
						};
						e.key && (r.key = e.key.src), e.idx > -1 && (r.refIndex = e.idx), t.matches.push(r)
					}))
				}

				function K(e, t) {
					t.score = e.score
				}
				class R {
					constructor(e, t = {}, i) {
						this.options = {
							...m,
							...t
						}, this.options.useExtendedSearch, this._keyStore = new u(this.options.keys), this.setCollection(e, i)
					}
					setCollection(e, t) {
						if (this._docs = e, t && !(t instanceof g)) throw new Error("Incorrect 'index' type");
						this._myIndex = t || _(this.options.keys, this._docs, {
							getFn: this.options.getFn,
							fieldNormWeight: this.options.fieldNormWeight
						})
					}
					add(e) {
						a(e) && (this._docs.push(e), this._myIndex.add(e))
					}
					remove(e = (() => !1)) {
						const t = [];
						for (let i = 0, n = this._docs.length; i < n; i += 1) {
							const r = this._docs[i];
							e(r, i) && (this.removeAt(i), i -= 1, n -= 1, t.push(r))
						}
						return t
					}
					removeAt(e) {
						this._docs.splice(e, 1), this._myIndex.removeAt(e)
					}
					getIndex() {
						return this._myIndex
					}
					search(e, {
						limit: t = -1
					} = {}) {
						const {
							includeMatches: i,
							includeScore: n,
							shouldSort: o,
							sortFn: a,
							ignoreFieldNorm: c
						} = this.options;
						let l = r(e) ? r(this._docs[0]) ? this._searchStringList(e) : this._searchObjectList(e) : this._searchLogical(e);
						return function (e, {
								ignoreFieldNorm: t = m.ignoreFieldNorm
							}) {
								e.forEach((e => {
									let i = 1;
									e.matches.forEach((({
										key: e,
										norm: n,
										score: r
									}) => {
										const s = e ? e.weight : null;
										i *= Math.pow(0 === r && s ? Number.EPSILON : r, (s || 1) * (t ? 1 : n))
									})), e.score = i
								}))
							}(l, {
								ignoreFieldNorm: c
							}), o && l.sort(a), s(t) && t > -1 && (l = l.slice(0, t)),
							function (e, t, {
								includeMatches: i = m.includeMatches,
								includeScore: n = m.includeScore
							} = {}) {
								const r = [];
								return i && r.push(k), n && r.push(K), e.map((e => {
									const {
										idx: i
									} = e, n = {
										item: t[i],
										refIndex: i
									};
									return r.length && r.forEach((t => {
										t(e, n)
									})), n
								}))
							}(l, this._docs, {
								includeMatches: i,
								includeScore: n
							})
					}
					_searchStringList(e) {
						const t = x(e, this.options),
							{
								records: i
							} = this._myIndex,
							n = [];
						return i.forEach((({
							v: e,
							i: i,
							n: r
						}) => {
							if (!a(e)) return;
							const {
								isMatch: s,
								score: o,
								indices: c
							} = t.searchIn(e);
							s && n.push({
								item: e,
								idx: i,
								matches: [{
									score: o,
									value: e,
									norm: r,
									indices: c
								}]
							})
						})), n
					}
					_searchLogical(e) {
						const t = F(e, this.options),
							i = (e, t, n) => {
								if (!e.children) {
									const {
										keyId: i,
										searcher: r
									} = e, s = this._findMatches({
										key: this._keyStore.get(i),
										value: this._myIndex.getValueForItemAtKeyId(t, i),
										searcher: r
									});
									return s && s.length ? [{
										idx: n,
										item: t,
										matches: s
									}] : []
								}
								const r = [];
								for (let s = 0, o = e.children.length; s < o; s += 1) {
									const o = e.children[s],
										a = i(o, t, n);
									if (a.length) r.push(...a);
									else if (e.operator === N) return []
								}
								return r
							},
							n = this._myIndex.records,
							r = {},
							s = [];
						return n.forEach((({
							$: e,
							i: n
						}) => {
							if (a(e)) {
								let o = i(t, e, n);
								o.length && (r[n] || (r[n] = {
									idx: n,
									item: e,
									matches: []
								}, s.push(r[n])), o.forEach((({
									matches: e
								}) => {
									r[n].matches.push(...e)
								})))
							}
						})), s
					}
					_searchObjectList(e) {
						const t = x(e, this.options),
							{
								keys: i,
								records: n
							} = this._myIndex,
							r = [];
						return n.forEach((({
							$: e,
							i: n
						}) => {
							if (!a(e)) return;
							let s = [];
							i.forEach(((i, n) => {
								s.push(...this._findMatches({
									key: i,
									value: e[n],
									searcher: t
								}))
							})), s.length && r.push({
								idx: n,
								item: e,
								matches: s
							})
						})), r
					}
					_findMatches({
						key: e,
						value: t,
						searcher: i
					}) {
						if (!a(t)) return [];
						let r = [];
						if (n(t)) t.forEach((({
							v: t,
							i: n,
							n: s
						}) => {
							if (!a(t)) return;
							const {
								isMatch: o,
								score: c,
								indices: l
							} = i.searchIn(t);
							o && r.push({
								score: c,
								key: e,
								value: t,
								idx: n,
								norm: s,
								indices: l
							})
						}));
						else {
							const {
								v: n,
								n: s
							} = t, {
								isMatch: o,
								score: a,
								indices: c
							} = i.searchIn(n);
							o && r.push({
								score: a,
								key: e,
								value: n,
								norm: s,
								indices: c
							})
						}
						return r
					}
				}
				R.version = "6.6.2", R.createIndex = _, R.parseIndex = function (e, {
						getFn: t = m.getFn,
						fieldNormWeight: i = m.fieldNormWeight
					} = {}) {
						const {
							keys: n,
							records: r
						} = e, s = new g({
							getFn: t,
							fieldNormWeight: i
						});
						return s.setKeys(n), s.setIndexRecords(r), s
					}, R.config = m, R.parseQuery = F,
					function (...e) {
						P.push(...e)
					}(class {
						constructor(e, {
							isCaseSensitive: t = m.isCaseSensitive,
							includeMatches: i = m.includeMatches,
							minMatchCharLength: n = m.minMatchCharLength,
							ignoreLocation: r = m.ignoreLocation,
							findAllMatches: s = m.findAllMatches,
							location: o = m.location,
							threshold: a = m.threshold,
							distance: c = m.distance
						} = {}) {
							this.query = null, this.options = {
								isCaseSensitive: t,
								includeMatches: i,
								minMatchCharLength: n,
								findAllMatches: s,
								ignoreLocation: r,
								location: o,
								threshold: a,
								distance: c
							}, this.pattern = t ? e : e.toLowerCase(), this.query = function (e, t = {}) {
								return e.split("|").map((e => {
									let i = e.trim().split(A).filter((e => e && !!e.trim())),
										n = [];
									for (let e = 0, r = i.length; e < r; e += 1) {
										const r = i[e];
										let s = !1,
											o = -1;
										for (; !s && ++o < w;) {
											const e = L[o];
											let i = e.isMultiMatch(r);
											i && (n.push(new e(i, t)), s = !0)
										}
										if (!s)
											for (o = -1; ++o < w;) {
												const e = L[o];
												let i = e.isSingleMatch(r);
												if (i) {
													n.push(new e(i, t));
													break
												}
											}
									}
									return n
								}))
							}(this.pattern, this.options)
						}
						static condition(e, t) {
							return t.useExtendedSearch
						}
						searchIn(e) {
							const t = this.query;
							if (!t) return {
								isMatch: !1,
								score: 1
							};
							const {
								includeMatches: i,
								isCaseSensitive: n
							} = this.options;
							e = n ? e : e.toLowerCase();
							let r = 0,
								s = [],
								o = 0;
							for (let n = 0, a = t.length; n < a; n += 1) {
								const a = t[n];
								s.length = 0, r = 0;
								for (let t = 0, n = a.length; t < n; t += 1) {
									const n = a[t],
										{
											isMatch: c,
											indices: l,
											score: h
										} = n.search(e);
									if (!c) {
										o = 0, r = 0, s.length = 0;
										break
									}
									if (r += 1, o += h, i) {
										const e = n.constructor.type;
										M.has(e) ? s = [...s, ...l] : s.push(l)
									}
								}
								if (r) {
									let e = {
										isMatch: !0,
										score: o / r
									};
									return i && (e.indices = s), e
								}
							}
							return {
								isMatch: !1,
								score: 1
							}
						}
					})
			},
			791: function (e, t, i) {
				function n(e) {
					return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
						return typeof e
					} : function (e) {
						return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
					}, n(e)
				}

				function r(e, t, i) {
					return (t = function (e) {
						var t = function (e, t) {
							if ("object" !== n(e) || null === e) return e;
							var i = e[Symbol.toPrimitive];
							if (void 0 !== i) {
								var r = i.call(e, t);
								if ("object" !== n(r)) return r;
								throw new TypeError("@@toPrimitive must return a primitive value.")
							}
							return String(e)
						}(e, "string");
						return "symbol" === n(t) ? t : String(t)
					}(t)) in e ? Object.defineProperty(e, t, {
						value: i,
						enumerable: !0,
						configurable: !0,
						writable: !0
					}) : e[t] = i, e
				}

				function s(e, t) {
					var i = Object.keys(e);
					if (Object.getOwnPropertySymbols) {
						var n = Object.getOwnPropertySymbols(e);
						t && (n = n.filter((function (t) {
							return Object.getOwnPropertyDescriptor(e, t).enumerable
						}))), i.push.apply(i, n)
					}
					return i
				}

				function o(e) {
					for (var t = 1; t < arguments.length; t++) {
						var i = null != arguments[t] ? arguments[t] : {};
						t % 2 ? s(Object(i), !0).forEach((function (t) {
							r(e, t, i[t])
						})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : s(Object(i)).forEach((function (t) {
							Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
						}))
					}
					return e
				}

				function a(e) {
					return "Minified Redux error #" + e + "; visit https://redux.js.org/Errors?code=" + e + " for the full message or use the non-minified dev environment for full errors. "
				}
				i.r(t), i.d(t, {
					__DO_NOT_USE__ActionTypes: function () {
						return h
					},
					applyMiddleware: function () {
						return _
					},
					bindActionCreators: function () {
						return v
					},
					combineReducers: function () {
						return f
					},
					compose: function () {
						return g
					},
					createStore: function () {
						return d
					},
					legacy_createStore: function () {
						return p
					}
				});
				var c = "function" == typeof Symbol && Symbol.observable || "@@observable",
					l = function () {
						return Math.random().toString(36).substring(7).split("").join(".")
					},
					h = {
						INIT: "@@redux/INIT" + l(),
						REPLACE: "@@redux/REPLACE" + l(),
						PROBE_UNKNOWN_ACTION: function () {
							return "@@redux/PROBE_UNKNOWN_ACTION" + l()
						}
					};

				function u(e) {
					if ("object" != typeof e || null === e) return !1;
					for (var t = e; null !== Object.getPrototypeOf(t);) t = Object.getPrototypeOf(t);
					return Object.getPrototypeOf(e) === t
				}

				function d(e, t, i) {
					var n;
					if ("function" == typeof t && "function" == typeof i || "function" == typeof i && "function" == typeof arguments[3]) throw new Error(a(0));
					if ("function" == typeof t && void 0 === i && (i = t, t = void 0), void 0 !== i) {
						if ("function" != typeof i) throw new Error(a(1));
						return i(d)(e, t)
					}
					if ("function" != typeof e) throw new Error(a(2));
					var r = e,
						s = t,
						o = [],
						l = o,
						p = !1;

					function f() {
						l === o && (l = o.slice())
					}

					function m() {
						if (p) throw new Error(a(3));
						return s
					}

					function v(e) {
						if ("function" != typeof e) throw new Error(a(4));
						if (p) throw new Error(a(5));
						var t = !0;
						return f(), l.push(e),
							function () {
								if (t) {
									if (p) throw new Error(a(6));
									t = !1, f();
									var i = l.indexOf(e);
									l.splice(i, 1), o = null
								}
							}
					}

					function g(e) {
						if (!u(e)) throw new Error(a(7));
						if (void 0 === e.type) throw new Error(a(8));
						if (p) throw new Error(a(9));
						try {
							p = !0, s = r(s, e)
						} finally {
							p = !1
						}
						for (var t = o = l, i = 0; i < t.length; i++)(0, t[i])();
						return e
					}

					function _(e) {
						if ("function" != typeof e) throw new Error(a(10));
						r = e, g({
							type: h.REPLACE
						})
					}

					function y() {
						var e, t = v;
						return (e = {
							subscribe: function (e) {
								if ("object" != typeof e || null === e) throw new Error(a(11));

								function i() {
									e.next && e.next(m())
								}
								return i(), {
									unsubscribe: t(i)
								}
							}
						})[c] = function () {
							return this
						}, e
					}
					return g({
						type: h.INIT
					}), (n = {
						dispatch: g,
						subscribe: v,
						getState: m,
						replaceReducer: _
					})[c] = y, n
				}
				var p = d;

				function f(e) {
					for (var t = Object.keys(e), i = {}, n = 0; n < t.length; n++) {
						var r = t[n];
						"function" == typeof e[r] && (i[r] = e[r])
					}
					var s, o = Object.keys(i);
					try {
						! function (e) {
							Object.keys(e).forEach((function (t) {
								var i = e[t];
								if (void 0 === i(void 0, {
										type: h.INIT
									})) throw new Error(a(12));
								if (void 0 === i(void 0, {
										type: h.PROBE_UNKNOWN_ACTION()
									})) throw new Error(a(13))
							}))
						}(i)
					} catch (e) {
						s = e
					}
					return function (e, t) {
						if (void 0 === e && (e = {}), s) throw s;
						for (var n = !1, r = {}, c = 0; c < o.length; c++) {
							var l = o[c],
								h = i[l],
								u = e[l],
								d = h(u, t);
							if (void 0 === d) throw t && t.type, new Error(a(14));
							r[l] = d, n = n || d !== u
						}
						return (n = n || o.length !== Object.keys(e).length) ? r : e
					}
				}

				function m(e, t) {
					return function () {
						return t(e.apply(this, arguments))
					}
				}

				function v(e, t) {
					if ("function" == typeof e) return m(e, t);
					if ("object" != typeof e || null === e) throw new Error(a(16));
					var i = {};
					for (var n in e) {
						var r = e[n];
						"function" == typeof r && (i[n] = m(r, t))
					}
					return i
				}

				function g() {
					for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
					return 0 === t.length ? function (e) {
						return e
					} : 1 === t.length ? t[0] : t.reduce((function (e, t) {
						return function () {
							return e(t.apply(void 0, arguments))
						}
					}))
				}

				function _() {
					for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
					return function (e) {
						return function () {
							var i = e.apply(void 0, arguments),
								n = function () {
									throw new Error(a(15))
								},
								r = {
									getState: i.getState,
									dispatch: function () {
										return n.apply(void 0, arguments)
									}
								},
								s = t.map((function (e) {
									return e(r)
								}));
							return n = g.apply(void 0, s)(i.dispatch), o(o({}, i), {}, {
								dispatch: n
							})
						}
					}
				}
			}
		},
		t = {};

	function i(n) {
		var r = t[n];
		if (void 0 !== r) return r.exports;
		var s = t[n] = {
			exports: {}
		};
		return e[n].call(s.exports, s, s.exports, i), s.exports
	}
	i.n = function (e) {
		var t = e && e.__esModule ? function () {
			return e.default
		} : function () {
			return e
		};
		return i.d(t, {
			a: t
		}), t
	}, i.d = function (e, t) {
		for (var n in t) i.o(t, n) && !i.o(e, n) && Object.defineProperty(e, n, {
			enumerable: !0,
			get: t[n]
		})
	}, i.o = function (e, t) {
		return Object.prototype.hasOwnProperty.call(e, t)
	}, i.r = function (e) {
		"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
			value: "Module"
		}), Object.defineProperty(e, "__esModule", {
			value: !0
		})
	};
	var n, r, s = {};
	n = i(373), r = i.n(n), i(187), i(883), i(789), i(686), s.default = r(), window.Choices = s.default
}();
"undefined" != typeof navigator && function (t, e) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).lottie = e()
}(this, (function () {
	"use strict";
	var svgNS = "http://www.w3.org/2000/svg",
		locationHref = "",
		_useWebWorker = !1,
		initialDefaultFrame = -999999,
		setWebWorker = function (t) {
			_useWebWorker = !!t
		},
		getWebWorker = function () {
			return _useWebWorker
		},
		setLocationHref = function (t) {
			locationHref = t
		},
		getLocationHref = function () {
			return locationHref
		};

	function createTag(t) {
		return document.createElement(t)
	}

	function extendPrototype(t, e) {
		var r, i, s = t.length;
		for (r = 0; r < s; r += 1)
			for (var a in i = t[r].prototype) Object.prototype.hasOwnProperty.call(i, a) && (e.prototype[a] = i[a])
	}

	function getDescriptor(t, e) {
		return Object.getOwnPropertyDescriptor(t, e)
	}

	function createProxyFunction(t) {
		function e() {}
		return e.prototype = t, e
	}
	var audioControllerFactory = function () {
			function t(t) {
				this.audios = [], this.audioFactory = t, this._volume = 1, this._isMuted = !1
			}
			return t.prototype = {
					addAudio: function (t) {
						this.audios.push(t)
					},
					pause: function () {
						var t, e = this.audios.length;
						for (t = 0; t < e; t += 1) this.audios[t].pause()
					},
					resume: function () {
						var t, e = this.audios.length;
						for (t = 0; t < e; t += 1) this.audios[t].resume()
					},
					setRate: function (t) {
						var e, r = this.audios.length;
						for (e = 0; e < r; e += 1) this.audios[e].setRate(t)
					},
					createAudio: function (t) {
						return this.audioFactory ? this.audioFactory(t) : window.Howl ? new window.Howl({
							src: [t]
						}) : {
							isPlaying: !1,
							play: function () {
								this.isPlaying = !0
							},
							seek: function () {
								this.isPlaying = !1
							},
							playing: function () {},
							rate: function () {},
							setVolume: function () {}
						}
					},
					setAudioFactory: function (t) {
						this.audioFactory = t
					},
					setVolume: function (t) {
						this._volume = t, this._updateVolume()
					},
					mute: function () {
						this._isMuted = !0, this._updateVolume()
					},
					unmute: function () {
						this._isMuted = !1, this._updateVolume()
					},
					getVolume: function () {
						return this._volume
					},
					_updateVolume: function () {
						var t, e = this.audios.length;
						for (t = 0; t < e; t += 1) this.audios[t].volume(this._volume * (this._isMuted ? 0 : 1))
					}
				},
				function () {
					return new t
				}
		}(),
		createTypedArray = function () {
			function t(t, e) {
				var r, i = 0,
					s = [];
				switch (t) {
					case "int16":
					case "uint8c":
						r = 1;
						break;
					default:
						r = 1.1
				}
				for (i = 0; i < e; i += 1) s.push(r);
				return s
			}
			return "function" == typeof Uint8ClampedArray && "function" == typeof Float32Array ? function (e, r) {
				return "float32" === e ? new Float32Array(r) : "int16" === e ? new Int16Array(r) : "uint8c" === e ? new Uint8ClampedArray(r) : t(e, r)
			} : t
		}();

	function createSizedArray(t) {
		return Array.apply(null, {
			length: t
		})
	}

	function _typeof$6(t) {
		return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
			return typeof t
		} : function (t) {
			return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
		}, _typeof$6(t)
	}
	var subframeEnabled = !0,
		expressionsPlugin = null,
		expressionsInterfaces = null,
		idPrefix$1 = "",
		isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
		_shouldRoundValues = !1,
		bmPow = Math.pow,
		bmSqrt = Math.sqrt,
		bmFloor = Math.floor,
		bmMax = Math.max,
		bmMin = Math.min,
		BMMath = {};

	function ProjectInterface$1() {
		return {}
	}! function () {
		var t, e = ["abs", "acos", "acosh", "asin", "asinh", "atan", "atanh", "atan2", "ceil", "cbrt", "expm1", "clz32", "cos", "cosh", "exp", "floor", "fround", "hypot", "imul", "log", "log1p", "log2", "log10", "max", "min", "pow", "random", "round", "sign", "sin", "sinh", "sqrt", "tan", "tanh", "trunc", "E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"],
			r = e.length;
		for (t = 0; t < r; t += 1) BMMath[e[t]] = Math[e[t]]
	}(), BMMath.random = Math.random, BMMath.abs = function (t) {
		if ("object" === _typeof$6(t) && t.length) {
			var e, r = createSizedArray(t.length),
				i = t.length;
			for (e = 0; e < i; e += 1) r[e] = Math.abs(t[e]);
			return r
		}
		return Math.abs(t)
	};
	var defaultCurveSegments = 150,
		degToRads = Math.PI / 180,
		roundCorner = .5519;

	function roundValues(t) {
		_shouldRoundValues = !!t
	}

	function bmRnd(t) {
		return _shouldRoundValues ? Math.round(t) : t
	}

	function styleDiv(t) {
		t.style.position = "absolute", t.style.top = 0, t.style.left = 0, t.style.display = "block", t.style.transformOrigin = "0 0", t.style.webkitTransformOrigin = "0 0", t.style.backfaceVisibility = "visible", t.style.webkitBackfaceVisibility = "visible", t.style.transformStyle = "preserve-3d", t.style.webkitTransformStyle = "preserve-3d", t.style.mozTransformStyle = "preserve-3d"
	}

	function BMEnterFrameEvent(t, e, r, i) {
		this.type = t, this.currentTime = e, this.totalTime = r, this.direction = i < 0 ? -1 : 1
	}

	function BMCompleteEvent(t, e) {
		this.type = t, this.direction = e < 0 ? -1 : 1
	}

	function BMCompleteLoopEvent(t, e, r, i) {
		this.type = t, this.currentLoop = r, this.totalLoops = e, this.direction = i < 0 ? -1 : 1
	}

	function BMSegmentStartEvent(t, e, r) {
		this.type = t, this.firstFrame = e, this.totalFrames = r
	}

	function BMDestroyEvent(t, e) {
		this.type = t, this.target = e
	}

	function BMRenderFrameErrorEvent(t, e) {
		this.type = "renderFrameError", this.nativeError = t, this.currentTime = e
	}

	function BMConfigErrorEvent(t) {
		this.type = "configError", this.nativeError = t
	}

	function BMAnimationConfigErrorEvent(t, e) {
		this.type = t, this.nativeError = e
	}
	var createElementID = (_count = 0, function () {
			return idPrefix$1 + "__lottie_element_" + (_count += 1)
		}),
		_count;

	function HSVtoRGB(t, e, r) {
		var i, s, a, n, o, h, l, p;
		switch (h = r * (1 - e), l = r * (1 - (o = 6 * t - (n = Math.floor(6 * t))) * e), p = r * (1 - (1 - o) * e), n % 6) {
			case 0:
				i = r, s = p, a = h;
				break;
			case 1:
				i = l, s = r, a = h;
				break;
			case 2:
				i = h, s = r, a = p;
				break;
			case 3:
				i = h, s = l, a = r;
				break;
			case 4:
				i = p, s = h, a = r;
				break;
			case 5:
				i = r, s = h, a = l
		}
		return [i, s, a]
	}

	function RGBtoHSV(t, e, r) {
		var i, s = Math.max(t, e, r),
			a = Math.min(t, e, r),
			n = s - a,
			o = 0 === s ? 0 : n / s,
			h = s / 255;
		switch (s) {
			case a:
				i = 0;
				break;
			case t:
				i = e - r + n * (e < r ? 6 : 0), i /= 6 * n;
				break;
			case e:
				i = r - t + 2 * n, i /= 6 * n;
				break;
			case r:
				i = t - e + 4 * n, i /= 6 * n
		}
		return [i, o, h]
	}

	function addSaturationToRGB(t, e) {
		var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
		return r[1] += e, r[1] > 1 ? r[1] = 1 : r[1] <= 0 && (r[1] = 0), HSVtoRGB(r[0], r[1], r[2])
	}

	function addBrightnessToRGB(t, e) {
		var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
		return r[2] += e, r[2] > 1 ? r[2] = 1 : r[2] < 0 && (r[2] = 0), HSVtoRGB(r[0], r[1], r[2])
	}

	function addHueToRGB(t, e) {
		var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
		return r[0] += e / 360, r[0] > 1 ? r[0] -= 1 : r[0] < 0 && (r[0] += 1), HSVtoRGB(r[0], r[1], r[2])
	}
	var rgbToHex = function () {
			var t, e, r = [];
			for (t = 0; t < 256; t += 1) e = t.toString(16), r[t] = 1 === e.length ? "0" + e : e;
			return function (t, e, i) {
				return t < 0 && (t = 0), e < 0 && (e = 0), i < 0 && (i = 0), "#" + r[t] + r[e] + r[i]
			}
		}(),
		setSubframeEnabled = function (t) {
			subframeEnabled = !!t
		},
		getSubframeEnabled = function () {
			return subframeEnabled
		},
		setExpressionsPlugin = function (t) {
			expressionsPlugin = t
		},
		getExpressionsPlugin = function () {
			return expressionsPlugin
		},
		setExpressionInterfaces = function (t) {
			expressionsInterfaces = t
		},
		getExpressionInterfaces = function () {
			return expressionsInterfaces
		},
		setDefaultCurveSegments = function (t) {
			defaultCurveSegments = t
		},
		getDefaultCurveSegments = function () {
			return defaultCurveSegments
		},
		setIdPrefix = function (t) {
			idPrefix$1 = t
		},
		getIdPrefix = function () {
			return idPrefix$1
		};

	function createNS(t) {
		return document.createElementNS(svgNS, t)
	}

	function _typeof$5(t) {
		return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
			return typeof t
		} : function (t) {
			return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
		}, _typeof$5(t)
	}
	var dataManager = function () {
			var t, e, r = 1,
				i = [],
				s = {
					onmessage: function () {},
					postMessage: function (e) {
						t({
							data: e
						})
					}
				},
				a = {
					postMessage: function (t) {
						s.onmessage({
							data: t
						})
					}
				};

			function n() {
				e || (e = function (e) {
					if (window.Worker && window.Blob && getWebWorker()) {
						var r = new Blob(["var _workerSelf = self; self.onmessage = ", e.toString()], {
								type: "text/javascript"
							}),
							i = URL.createObjectURL(r);
						return new Worker(i)
					}
					return t = e, s
				}((function (t) {
					if (a.dataManager || (a.dataManager = function () {
							function t(s, a) {
								var n, o, h, l, p, m, c = s.length;
								for (o = 0; o < c; o += 1)
									if ("ks" in (n = s[o]) && !n.completed) {
										if (n.completed = !0, n.hasMask) {
											var d = n.masksProperties;
											for (l = d.length, h = 0; h < l; h += 1)
												if (d[h].pt.k.i) i(d[h].pt.k);
												else
													for (m = d[h].pt.k.length, p = 0; p < m; p += 1) d[h].pt.k[p].s && i(d[h].pt.k[p].s[0]), d[h].pt.k[p].e && i(d[h].pt.k[p].e[0])
										}
										0 === n.ty ? (n.layers = e(n.refId, a), t(n.layers, a)) : 4 === n.ty ? r(n.shapes) : 5 === n.ty && f(n)
									}
							}

							function e(t, e) {
								var r = function (t, e) {
									for (var r = 0, i = e.length; r < i;) {
										if (e[r].id === t) return e[r];
										r += 1
									}
									return null
								}(t, e);
								return r ? r.layers.__used ? JSON.parse(JSON.stringify(r.layers)) : (r.layers.__used = !0, r.layers) : null
							}

							function r(t) {
								var e, s, a;
								for (e = t.length - 1; e >= 0; e -= 1)
									if ("sh" === t[e].ty)
										if (t[e].ks.k.i) i(t[e].ks.k);
										else
											for (a = t[e].ks.k.length, s = 0; s < a; s += 1) t[e].ks.k[s].s && i(t[e].ks.k[s].s[0]), t[e].ks.k[s].e && i(t[e].ks.k[s].e[0]);
								else "gr" === t[e].ty && r(t[e].it)
							}

							function i(t) {
								var e, r = t.i.length;
								for (e = 0; e < r; e += 1) t.i[e][0] += t.v[e][0], t.i[e][1] += t.v[e][1], t.o[e][0] += t.v[e][0], t.o[e][1] += t.v[e][1]
							}

							function s(t, e) {
								var r = e ? e.split(".") : [100, 100, 100];
								return t[0] > r[0] || !(r[0] > t[0]) && (t[1] > r[1] || !(r[1] > t[1]) && (t[2] > r[2] || !(r[2] > t[2]) && null))
							}
							var a, n = function () {
									var t = [4, 4, 14];

									function e(t) {
										var e, r, i, s = t.length;
										for (e = 0; e < s; e += 1) 5 === t[e].ty && (i = void 0, i = (r = t[e]).t.d, r.t.d = {
											k: [{
												s: i,
												t: 0
											}]
										})
									}
									return function (r) {
										if (s(t, r.v) && (e(r.layers), r.assets)) {
											var i, a = r.assets.length;
											for (i = 0; i < a; i += 1) r.assets[i].layers && e(r.assets[i].layers)
										}
									}
								}(),
								o = (a = [4, 7, 99], function (t) {
									if (t.chars && !s(a, t.v)) {
										var e, i = t.chars.length;
										for (e = 0; e < i; e += 1) {
											var n = t.chars[e];
											n.data && n.data.shapes && (r(n.data.shapes), n.data.ip = 0, n.data.op = 99999, n.data.st = 0, n.data.sr = 1, n.data.ks = {
												p: {
													k: [0, 0],
													a: 0
												},
												s: {
													k: [100, 100],
													a: 0
												},
												a: {
													k: [0, 0],
													a: 0
												},
												r: {
													k: 0,
													a: 0
												},
												o: {
													k: 100,
													a: 0
												}
											}, t.chars[e].t || (n.data.shapes.push({
												ty: "no"
											}), n.data.shapes[0].it.push({
												p: {
													k: [0, 0],
													a: 0
												},
												s: {
													k: [100, 100],
													a: 0
												},
												a: {
													k: [0, 0],
													a: 0
												},
												r: {
													k: 0,
													a: 0
												},
												o: {
													k: 100,
													a: 0
												},
												sk: {
													k: 0,
													a: 0
												},
												sa: {
													k: 0,
													a: 0
												},
												ty: "tr"
											})))
										}
									}
								}),
								h = function () {
									var t = [5, 7, 15];

									function e(t) {
										var e, r, i = t.length;
										for (e = 0; e < i; e += 1) 5 === t[e].ty && (r = void 0, "number" == typeof (r = t[e].t.p).a && (r.a = {
											a: 0,
											k: r.a
										}), "number" == typeof r.p && (r.p = {
											a: 0,
											k: r.p
										}), "number" == typeof r.r && (r.r = {
											a: 0,
											k: r.r
										}))
									}
									return function (r) {
										if (s(t, r.v) && (e(r.layers), r.assets)) {
											var i, a = r.assets.length;
											for (i = 0; i < a; i += 1) r.assets[i].layers && e(r.assets[i].layers)
										}
									}
								}(),
								l = function () {
									var t = [4, 1, 9];

									function e(t) {
										var r, i, s, a = t.length;
										for (r = 0; r < a; r += 1)
											if ("gr" === t[r].ty) e(t[r].it);
											else if ("fl" === t[r].ty || "st" === t[r].ty)
											if (t[r].c.k && t[r].c.k[0].i)
												for (s = t[r].c.k.length, i = 0; i < s; i += 1) t[r].c.k[i].s && (t[r].c.k[i].s[0] /= 255, t[r].c.k[i].s[1] /= 255, t[r].c.k[i].s[2] /= 255, t[r].c.k[i].s[3] /= 255), t[r].c.k[i].e && (t[r].c.k[i].e[0] /= 255, t[r].c.k[i].e[1] /= 255, t[r].c.k[i].e[2] /= 255, t[r].c.k[i].e[3] /= 255);
											else t[r].c.k[0] /= 255, t[r].c.k[1] /= 255, t[r].c.k[2] /= 255, t[r].c.k[3] /= 255
									}

									function r(t) {
										var r, i = t.length;
										for (r = 0; r < i; r += 1) 4 === t[r].ty && e(t[r].shapes)
									}
									return function (e) {
										if (s(t, e.v) && (r(e.layers), e.assets)) {
											var i, a = e.assets.length;
											for (i = 0; i < a; i += 1) e.assets[i].layers && r(e.assets[i].layers)
										}
									}
								}(),
								p = function () {
									var t = [4, 4, 18];

									function e(t) {
										var r, i, s;
										for (r = t.length - 1; r >= 0; r -= 1)
											if ("sh" === t[r].ty)
												if (t[r].ks.k.i) t[r].ks.k.c = t[r].closed;
												else
													for (s = t[r].ks.k.length, i = 0; i < s; i += 1) t[r].ks.k[i].s && (t[r].ks.k[i].s[0].c = t[r].closed), t[r].ks.k[i].e && (t[r].ks.k[i].e[0].c = t[r].closed);
										else "gr" === t[r].ty && e(t[r].it)
									}

									function r(t) {
										var r, i, s, a, n, o, h = t.length;
										for (i = 0; i < h; i += 1) {
											if ((r = t[i]).hasMask) {
												var l = r.masksProperties;
												for (a = l.length, s = 0; s < a; s += 1)
													if (l[s].pt.k.i) l[s].pt.k.c = l[s].cl;
													else
														for (o = l[s].pt.k.length, n = 0; n < o; n += 1) l[s].pt.k[n].s && (l[s].pt.k[n].s[0].c = l[s].cl), l[s].pt.k[n].e && (l[s].pt.k[n].e[0].c = l[s].cl)
											}
											4 === r.ty && e(r.shapes)
										}
									}
									return function (e) {
										if (s(t, e.v) && (r(e.layers), e.assets)) {
											var i, a = e.assets.length;
											for (i = 0; i < a; i += 1) e.assets[i].layers && r(e.assets[i].layers)
										}
									}
								}();

							function f(t) {
								0 === t.t.a.length && t.t.p
							}
							var m = {
								completeData: function (r) {
									r.__complete || (l(r), n(r), o(r), h(r), p(r), t(r.layers, r.assets), function (r, i) {
										if (r) {
											var s = 0,
												a = r.length;
											for (s = 0; s < a; s += 1) 1 === r[s].t && (r[s].data.layers = e(r[s].data.refId, i), t(r[s].data.layers, i))
										}
									}(r.chars, r.assets), r.__complete = !0)
								}
							};
							return m.checkColors = l, m.checkChars = o, m.checkPathProperties = h, m.checkShapes = p, m.completeLayers = t, m
						}()), a.assetLoader || (a.assetLoader = function () {
							function t(t) {
								var e = t.getResponseHeader("content-type");
								return e && "json" === t.responseType && -1 !== e.indexOf("json") || t.response && "object" === _typeof$5(t.response) ? t.response : t.response && "string" == typeof t.response ? JSON.parse(t.response) : t.responseText ? JSON.parse(t.responseText) : null
							}
							return {
								load: function (e, r, i, s) {
									var a, n = new XMLHttpRequest;
									try {
										n.responseType = "json"
									} catch (t) {}
									n.onreadystatechange = function () {
										if (4 === n.readyState)
											if (200 === n.status) a = t(n), i(a);
											else try {
												a = t(n), i(a)
											} catch (t) {
												s && s(t)
											}
									};
									try {
										n.open(["G", "E", "T"].join(""), e, !0)
									} catch (t) {
										n.open(["G", "E", "T"].join(""), r + "/" + e, !0)
									}
									n.send()
								}
							}
						}()), "loadAnimation" === t.data.type) a.assetLoader.load(t.data.path, t.data.fullPath, (function (e) {
						a.dataManager.completeData(e), a.postMessage({
							id: t.data.id,
							payload: e,
							status: "success"
						})
					}), (function () {
						a.postMessage({
							id: t.data.id,
							status: "error"
						})
					}));
					else if ("complete" === t.data.type) {
						var e = t.data.animation;
						a.dataManager.completeData(e), a.postMessage({
							id: t.data.id,
							payload: e,
							status: "success"
						})
					} else "loadData" === t.data.type && a.assetLoader.load(t.data.path, t.data.fullPath, (function (e) {
						a.postMessage({
							id: t.data.id,
							payload: e,
							status: "success"
						})
					}), (function () {
						a.postMessage({
							id: t.data.id,
							status: "error"
						})
					}))
				})), e.onmessage = function (t) {
					var e = t.data,
						r = e.id,
						s = i[r];
					i[r] = null, "success" === e.status ? s.onComplete(e.payload) : s.onError && s.onError()
				})
			}

			function o(t, e) {
				var s = "processId_" + (r += 1);
				return i[s] = {
					onComplete: t,
					onError: e
				}, s
			}
			return {
				loadAnimation: function (t, r, i) {
					n();
					var s = o(r, i);
					e.postMessage({
						type: "loadAnimation",
						path: t,
						fullPath: window.location.origin + window.location.pathname,
						id: s
					})
				},
				loadData: function (t, r, i) {
					n();
					var s = o(r, i);
					e.postMessage({
						type: "loadData",
						path: t,
						fullPath: window.location.origin + window.location.pathname,
						id: s
					})
				},
				completeAnimation: function (t, r, i) {
					n();
					var s = o(r, i);
					e.postMessage({
						type: "complete",
						animation: t,
						id: s
					})
				}
			}
		}(),
		ImagePreloader = function () {
			var t = function () {
				var t = createTag("canvas");
				t.width = 1, t.height = 1;
				var e = t.getContext("2d");
				return e.fillStyle = "rgba(0,0,0,0)", e.fillRect(0, 0, 1, 1), t
			}();

			function e() {
				this.loadedAssets += 1, this.loadedAssets === this.totalImages && this.loadedFootagesCount === this.totalFootages && this.imagesLoadedCb && this.imagesLoadedCb(null)
			}

			function r() {
				this.loadedFootagesCount += 1, this.loadedAssets === this.totalImages && this.loadedFootagesCount === this.totalFootages && this.imagesLoadedCb && this.imagesLoadedCb(null)
			}

			function i(t, e, r) {
				var i = "";
				if (t.e) i = t.p;
				else if (e) {
					var s = t.p; - 1 !== s.indexOf("images/") && (s = s.split("/")[1]), i = e + s
				} else i = r, i += t.u ? t.u : "", i += t.p;
				return i
			}

			function s(t) {
				var e = 0,
					r = setInterval(function () {
						(t.getBBox().width || e > 500) && (this._imageLoaded(), clearInterval(r)), e += 1
					}.bind(this), 50)
			}

			function a(t) {
				var e = {
						assetData: t
					},
					r = i(t, this.assetsPath, this.path);
				return dataManager.loadData(r, function (t) {
					e.img = t, this._footageLoaded()
				}.bind(this), function () {
					e.img = {}, this._footageLoaded()
				}.bind(this)), e
			}

			function n() {
				this._imageLoaded = e.bind(this), this._footageLoaded = r.bind(this), this.testImageLoaded = s.bind(this), this.createFootageData = a.bind(this), this.assetsPath = "", this.path = "", this.totalImages = 0, this.totalFootages = 0, this.loadedAssets = 0, this.loadedFootagesCount = 0, this.imagesLoadedCb = null, this.images = []
			}
			return n.prototype = {
				loadAssets: function (t, e) {
					var r;
					this.imagesLoadedCb = e;
					var i = t.length;
					for (r = 0; r < i; r += 1) t[r].layers || (t[r].t && "seq" !== t[r].t ? 3 === t[r].t && (this.totalFootages += 1, this.images.push(this.createFootageData(t[r]))) : (this.totalImages += 1, this.images.push(this._createImageData(t[r]))))
				},
				setAssetsPath: function (t) {
					this.assetsPath = t || ""
				},
				setPath: function (t) {
					this.path = t || ""
				},
				loadedImages: function () {
					return this.totalImages === this.loadedAssets
				},
				loadedFootages: function () {
					return this.totalFootages === this.loadedFootagesCount
				},
				destroy: function () {
					this.imagesLoadedCb = null, this.images.length = 0
				},
				getAsset: function (t) {
					for (var e = 0, r = this.images.length; e < r;) {
						if (this.images[e].assetData === t) return this.images[e].img;
						e += 1
					}
					return null
				},
				createImgData: function (e) {
					var r = i(e, this.assetsPath, this.path),
						s = createTag("img");
					s.crossOrigin = "anonymous", s.addEventListener("load", this._imageLoaded, !1), s.addEventListener("error", function () {
						a.img = t, this._imageLoaded()
					}.bind(this), !1), s.src = r;
					var a = {
						img: s,
						assetData: e
					};
					return a
				},
				createImageData: function (e) {
					var r = i(e, this.assetsPath, this.path),
						s = createNS("image");
					isSafari ? this.testImageLoaded(s) : s.addEventListener("load", this._imageLoaded, !1), s.addEventListener("error", function () {
						a.img = t, this._imageLoaded()
					}.bind(this), !1), s.setAttributeNS("http://www.w3.org/1999/xlink", "href", r), this._elementHelper.append ? this._elementHelper.append(s) : this._elementHelper.appendChild(s);
					var a = {
						img: s,
						assetData: e
					};
					return a
				},
				imageLoaded: e,
				footageLoaded: r,
				setCacheType: function (t, e) {
					"svg" === t ? (this._elementHelper = e, this._createImageData = this.createImageData.bind(this)) : this._createImageData = this.createImgData.bind(this)
				}
			}, n
		}();

	function BaseEvent() {}
	BaseEvent.prototype = {
		triggerEvent: function (t, e) {
			if (this._cbs[t])
				for (var r = this._cbs[t], i = 0; i < r.length; i += 1) r[i](e)
		},
		addEventListener: function (t, e) {
			return this._cbs[t] || (this._cbs[t] = []), this._cbs[t].push(e),
				function () {
					this.removeEventListener(t, e)
				}.bind(this)
		},
		removeEventListener: function (t, e) {
			if (e) {
				if (this._cbs[t]) {
					for (var r = 0, i = this._cbs[t].length; r < i;) this._cbs[t][r] === e && (this._cbs[t].splice(r, 1), r -= 1, i -= 1), r += 1;
					this._cbs[t].length || (this._cbs[t] = null)
				}
			} else this._cbs[t] = null
		}
	};
	var markerParser = function () {
			function t(t) {
				for (var e, r = t.split("\r\n"), i = {}, s = 0, a = 0; a < r.length; a += 1) 2 === (e = r[a].split(":")).length && (i[e[0]] = e[1].trim(), s += 1);
				if (0 === s) throw new Error;
				return i
			}
			return function (e) {
				for (var r = [], i = 0; i < e.length; i += 1) {
					var s = e[i],
						a = {
							time: s.tm,
							duration: s.dr
						};
					try {
						a.payload = JSON.parse(e[i].cm)
					} catch (r) {
						try {
							a.payload = t(e[i].cm)
						} catch (t) {
							a.payload = {
								name: e[i].cm
							}
						}
					}
					r.push(a)
				}
				return r
			}
		}(),
		ProjectInterface = function () {
			function t(t) {
				this.compositions.push(t)
			}
			return function () {
				function e(t) {
					for (var e = 0, r = this.compositions.length; e < r;) {
						if (this.compositions[e].data && this.compositions[e].data.nm === t) return this.compositions[e].prepareFrame && this.compositions[e].data.xt && this.compositions[e].prepareFrame(this.currentFrame), this.compositions[e].compInterface;
						e += 1
					}
					return null
				}
				return e.compositions = [], e.currentFrame = 0, e.registerComposition = t, e
			}
		}(),
		renderers = {},
		registerRenderer = function (t, e) {
			renderers[t] = e
		};

	function getRenderer(t) {
		return renderers[t]
	}

	function _typeof$4(t) {
		return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
			return typeof t
		} : function (t) {
			return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
		}, _typeof$4(t)
	}
	var AnimationItem = function () {
		this._cbs = [], this.name = "", this.path = "", this.isLoaded = !1, this.currentFrame = 0, this.currentRawFrame = 0, this.firstFrame = 0, this.totalFrames = 0, this.frameRate = 0, this.frameMult = 0, this.playSpeed = 1, this.playDirection = 1, this.playCount = 0, this.animationData = {}, this.assets = [], this.isPaused = !0, this.autoplay = !1, this.loop = !0, this.renderer = null, this.animationID = createElementID(), this.assetsPath = "", this.timeCompleted = 0, this.segmentPos = 0, this.isSubframeEnabled = getSubframeEnabled(), this.segments = [], this._idle = !0, this._completedLoop = !1, this.projectInterface = ProjectInterface(), this.imagePreloader = new ImagePreloader, this.audioController = audioControllerFactory(), this.markers = [], this.configAnimation = this.configAnimation.bind(this), this.onSetupError = this.onSetupError.bind(this), this.onSegmentComplete = this.onSegmentComplete.bind(this), this.drawnFrameEvent = new BMEnterFrameEvent("drawnFrame", 0, 0, 0)
	};
	extendPrototype([BaseEvent], AnimationItem), AnimationItem.prototype.setParams = function (t) {
		(t.wrapper || t.container) && (this.wrapper = t.wrapper || t.container);
		var e = "svg";
		t.animType ? e = t.animType : t.renderer && (e = t.renderer);
		var r = getRenderer(e);
		this.renderer = new r(this, t.rendererSettings), this.imagePreloader.setCacheType(e, this.renderer.globalData.defs), this.renderer.setProjectInterface(this.projectInterface), this.animType = e, "" === t.loop || null === t.loop || void 0 === t.loop || !0 === t.loop ? this.loop = !0 : !1 === t.loop ? this.loop = !1 : this.loop = parseInt(t.loop, 10), this.autoplay = !("autoplay" in t) || t.autoplay, this.name = t.name ? t.name : "", this.autoloadSegments = !Object.prototype.hasOwnProperty.call(t, "autoloadSegments") || t.autoloadSegments, this.assetsPath = t.assetsPath, this.initialSegment = t.initialSegment, t.audioFactory && this.audioController.setAudioFactory(t.audioFactory), t.animationData ? this.setupAnimation(t.animationData) : t.path && (-1 !== t.path.lastIndexOf("\\") ? this.path = t.path.substr(0, t.path.lastIndexOf("\\") + 1) : this.path = t.path.substr(0, t.path.lastIndexOf("/") + 1), this.fileName = t.path.substr(t.path.lastIndexOf("/") + 1), this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json")), dataManager.loadAnimation(t.path, this.configAnimation, this.onSetupError))
	}, AnimationItem.prototype.onSetupError = function () {
		this.trigger("data_failed")
	}, AnimationItem.prototype.setupAnimation = function (t) {
		dataManager.completeAnimation(t, this.configAnimation)
	}, AnimationItem.prototype.setData = function (t, e) {
		e && "object" !== _typeof$4(e) && (e = JSON.parse(e));
		var r = {
				wrapper: t,
				animationData: e
			},
			i = t.attributes;
		r.path = i.getNamedItem("data-animation-path") ? i.getNamedItem("data-animation-path").value : i.getNamedItem("data-bm-path") ? i.getNamedItem("data-bm-path").value : i.getNamedItem("bm-path") ? i.getNamedItem("bm-path").value : "", r.animType = i.getNamedItem("data-anim-type") ? i.getNamedItem("data-anim-type").value : i.getNamedItem("data-bm-type") ? i.getNamedItem("data-bm-type").value : i.getNamedItem("bm-type") ? i.getNamedItem("bm-type").value : i.getNamedItem("data-bm-renderer") ? i.getNamedItem("data-bm-renderer").value : i.getNamedItem("bm-renderer") ? i.getNamedItem("bm-renderer").value : "canvas";
		var s = i.getNamedItem("data-anim-loop") ? i.getNamedItem("data-anim-loop").value : i.getNamedItem("data-bm-loop") ? i.getNamedItem("data-bm-loop").value : i.getNamedItem("bm-loop") ? i.getNamedItem("bm-loop").value : "";
		"false" === s ? r.loop = !1 : "true" === s ? r.loop = !0 : "" !== s && (r.loop = parseInt(s, 10));
		var a = i.getNamedItem("data-anim-autoplay") ? i.getNamedItem("data-anim-autoplay").value : i.getNamedItem("data-bm-autoplay") ? i.getNamedItem("data-bm-autoplay").value : !i.getNamedItem("bm-autoplay") || i.getNamedItem("bm-autoplay").value;
		r.autoplay = "false" !== a, r.name = i.getNamedItem("data-name") ? i.getNamedItem("data-name").value : i.getNamedItem("data-bm-name") ? i.getNamedItem("data-bm-name").value : i.getNamedItem("bm-name") ? i.getNamedItem("bm-name").value : "", "false" === (i.getNamedItem("data-anim-prerender") ? i.getNamedItem("data-anim-prerender").value : i.getNamedItem("data-bm-prerender") ? i.getNamedItem("data-bm-prerender").value : i.getNamedItem("bm-prerender") ? i.getNamedItem("bm-prerender").value : "") && (r.prerender = !1), this.setParams(r)
	}, AnimationItem.prototype.includeLayers = function (t) {
		t.op > this.animationData.op && (this.animationData.op = t.op, this.totalFrames = Math.floor(t.op - this.animationData.ip));
		var e, r, i = this.animationData.layers,
			s = i.length,
			a = t.layers,
			n = a.length;
		for (r = 0; r < n; r += 1)
			for (e = 0; e < s;) {
				if (i[e].id === a[r].id) {
					i[e] = a[r];
					break
				}
				e += 1
			}
		if ((t.chars || t.fonts) && (this.renderer.globalData.fontManager.addChars(t.chars), this.renderer.globalData.fontManager.addFonts(t.fonts, this.renderer.globalData.defs)), t.assets)
			for (s = t.assets.length, e = 0; e < s; e += 1) this.animationData.assets.push(t.assets[e]);
		this.animationData.__complete = !1, dataManager.completeAnimation(this.animationData, this.onSegmentComplete)
	}, AnimationItem.prototype.onSegmentComplete = function (t) {
		this.animationData = t;
		var e = getExpressionsPlugin();
		e && e.initExpressions(this), this.loadNextSegment()
	}, AnimationItem.prototype.loadNextSegment = function () {
		var t = this.animationData.segments;
		if (!t || 0 === t.length || !this.autoloadSegments) return this.trigger("data_ready"), void(this.timeCompleted = this.totalFrames);
		var e = t.shift();
		this.timeCompleted = e.time * this.frameRate;
		var r = this.path + this.fileName + "_" + this.segmentPos + ".json";
		this.segmentPos += 1, dataManager.loadData(r, this.includeLayers.bind(this), function () {
			this.trigger("data_failed")
		}.bind(this))
	}, AnimationItem.prototype.loadSegments = function () {
		this.animationData.segments || (this.timeCompleted = this.totalFrames), this.loadNextSegment()
	}, AnimationItem.prototype.imagesLoaded = function () {
		this.trigger("loaded_images"), this.checkLoaded()
	}, AnimationItem.prototype.preloadImages = function () {
		this.imagePreloader.setAssetsPath(this.assetsPath), this.imagePreloader.setPath(this.path), this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this))
	}, AnimationItem.prototype.configAnimation = function (t) {
		if (this.renderer) try {
			this.animationData = t, this.initialSegment ? (this.totalFrames = Math.floor(this.initialSegment[1] - this.initialSegment[0]), this.firstFrame = Math.round(this.initialSegment[0])) : (this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip), this.firstFrame = Math.round(this.animationData.ip)), this.renderer.configAnimation(t), t.assets || (t.assets = []), this.assets = this.animationData.assets, this.frameRate = this.animationData.fr, this.frameMult = this.animationData.fr / 1e3, this.renderer.searchExtraCompositions(t.assets), this.markers = markerParser(t.markers || []), this.trigger("config_ready"), this.preloadImages(), this.loadSegments(), this.updaFrameModifier(), this.waitForFontsLoaded(), this.isPaused && this.audioController.pause()
		} catch (t) {
			this.triggerConfigError(t)
		}
	}, AnimationItem.prototype.waitForFontsLoaded = function () {
		this.renderer && (this.renderer.globalData.fontManager.isLoaded ? this.checkLoaded() : setTimeout(this.waitForFontsLoaded.bind(this), 20))
	}, AnimationItem.prototype.checkLoaded = function () {
		if (!this.isLoaded && this.renderer.globalData.fontManager.isLoaded && (this.imagePreloader.loadedImages() || "canvas" !== this.renderer.rendererType) && this.imagePreloader.loadedFootages()) {
			this.isLoaded = !0;
			var t = getExpressionsPlugin();
			t && t.initExpressions(this), this.renderer.initItems(), setTimeout(function () {
				this.trigger("DOMLoaded")
			}.bind(this), 0), this.gotoFrame(), this.autoplay && this.play()
		}
	}, AnimationItem.prototype.resize = function (t, e) {
		var r = "number" == typeof t ? t : void 0,
			i = "number" == typeof e ? e : void 0;
		this.renderer.updateContainerSize(r, i)
	}, AnimationItem.prototype.setSubframe = function (t) {
		this.isSubframeEnabled = !!t
	}, AnimationItem.prototype.gotoFrame = function () {
		this.currentFrame = this.isSubframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame, this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted), this.trigger("enterFrame"), this.renderFrame(), this.trigger("drawnFrame")
	}, AnimationItem.prototype.renderFrame = function () {
		if (!1 !== this.isLoaded && this.renderer) try {
			this.renderer.renderFrame(this.currentFrame + this.firstFrame)
		} catch (t) {
			this.triggerRenderFrameError(t)
		}
	}, AnimationItem.prototype.play = function (t) {
		t && this.name !== t || !0 === this.isPaused && (this.isPaused = !1, this.trigger("_pause"), this.audioController.resume(), this._idle && (this._idle = !1, this.trigger("_active")))
	}, AnimationItem.prototype.pause = function (t) {
		t && this.name !== t || !1 === this.isPaused && (this.isPaused = !0, this.trigger("_play"), this._idle = !0, this.trigger("_idle"), this.audioController.pause())
	}, AnimationItem.prototype.togglePause = function (t) {
		t && this.name !== t || (!0 === this.isPaused ? this.play() : this.pause())
	}, AnimationItem.prototype.stop = function (t) {
		t && this.name !== t || (this.pause(), this.playCount = 0, this._completedLoop = !1, this.setCurrentRawFrameValue(0))
	}, AnimationItem.prototype.getMarkerData = function (t) {
		for (var e, r = 0; r < this.markers.length; r += 1)
			if ((e = this.markers[r]).payload && e.payload.name === t) return e;
		return null
	}, AnimationItem.prototype.goToAndStop = function (t, e, r) {
		if (!r || this.name === r) {
			var i = Number(t);
			if (isNaN(i)) {
				var s = this.getMarkerData(t);
				s && this.goToAndStop(s.time, !0)
			} else e ? this.setCurrentRawFrameValue(t) : this.setCurrentRawFrameValue(t * this.frameModifier);
			this.pause()
		}
	}, AnimationItem.prototype.goToAndPlay = function (t, e, r) {
		if (!r || this.name === r) {
			var i = Number(t);
			if (isNaN(i)) {
				var s = this.getMarkerData(t);
				s && (s.duration ? this.playSegments([s.time, s.time + s.duration], !0) : this.goToAndStop(s.time, !0))
			} else this.goToAndStop(i, e, r);
			this.play()
		}
	}, AnimationItem.prototype.advanceTime = function (t) {
		if (!0 !== this.isPaused && !1 !== this.isLoaded) {
			var e = this.currentRawFrame + t * this.frameModifier,
				r = !1;
			e >= this.totalFrames - 1 && this.frameModifier > 0 ? this.loop && this.playCount !== this.loop ? e >= this.totalFrames ? (this.playCount += 1, this.checkSegments(e % this.totalFrames) || (this.setCurrentRawFrameValue(e % this.totalFrames), this._completedLoop = !0, this.trigger("loopComplete"))) : this.setCurrentRawFrameValue(e) : this.checkSegments(e > this.totalFrames ? e % this.totalFrames : 0) || (r = !0, e = this.totalFrames - 1) : e < 0 ? this.checkSegments(e % this.totalFrames) || (!this.loop || this.playCount-- <= 0 && !0 !== this.loop ? (r = !0, e = 0) : (this.setCurrentRawFrameValue(this.totalFrames + e % this.totalFrames), this._completedLoop ? this.trigger("loopComplete") : this._completedLoop = !0)) : this.setCurrentRawFrameValue(e), r && (this.setCurrentRawFrameValue(e), this.pause(), this.trigger("complete"))
		}
	}, AnimationItem.prototype.adjustSegment = function (t, e) {
		this.playCount = 0, t[1] < t[0] ? (this.frameModifier > 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)), this.totalFrames = t[0] - t[1], this.timeCompleted = this.totalFrames, this.firstFrame = t[1], this.setCurrentRawFrameValue(this.totalFrames - .001 - e)) : t[1] > t[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)), this.totalFrames = t[1] - t[0], this.timeCompleted = this.totalFrames, this.firstFrame = t[0], this.setCurrentRawFrameValue(.001 + e)), this.trigger("segmentStart")
	}, AnimationItem.prototype.setSegment = function (t, e) {
		var r = -1;
		this.isPaused && (this.currentRawFrame + this.firstFrame < t ? r = t : this.currentRawFrame + this.firstFrame > e && (r = e - t)), this.firstFrame = t, this.totalFrames = e - t, this.timeCompleted = this.totalFrames, -1 !== r && this.goToAndStop(r, !0)
	}, AnimationItem.prototype.playSegments = function (t, e) {
		if (e && (this.segments.length = 0), "object" === _typeof$4(t[0])) {
			var r, i = t.length;
			for (r = 0; r < i; r += 1) this.segments.push(t[r])
		} else this.segments.push(t);
		this.segments.length && e && this.adjustSegment(this.segments.shift(), 0), this.isPaused && this.play()
	}, AnimationItem.prototype.resetSegments = function (t) {
		this.segments.length = 0, this.segments.push([this.animationData.ip, this.animationData.op]), t && this.checkSegments(0)
	}, AnimationItem.prototype.checkSegments = function (t) {
		return !!this.segments.length && (this.adjustSegment(this.segments.shift(), t), !0)
	}, AnimationItem.prototype.destroy = function (t) {
		t && this.name !== t || !this.renderer || (this.renderer.destroy(), this.imagePreloader.destroy(), this.trigger("destroy"), this._cbs = null, this.onEnterFrame = null, this.onLoopComplete = null, this.onComplete = null, this.onSegmentStart = null, this.onDestroy = null, this.renderer = null, this.renderer = null, this.imagePreloader = null, this.projectInterface = null)
	}, AnimationItem.prototype.setCurrentRawFrameValue = function (t) {
		this.currentRawFrame = t, this.gotoFrame()
	}, AnimationItem.prototype.setSpeed = function (t) {
		this.playSpeed = t, this.updaFrameModifier()
	}, AnimationItem.prototype.setDirection = function (t) {
		this.playDirection = t < 0 ? -1 : 1, this.updaFrameModifier()
	}, AnimationItem.prototype.setLoop = function (t) {
		this.loop = t
	}, AnimationItem.prototype.setVolume = function (t, e) {
		e && this.name !== e || this.audioController.setVolume(t)
	}, AnimationItem.prototype.getVolume = function () {
		return this.audioController.getVolume()
	}, AnimationItem.prototype.mute = function (t) {
		t && this.name !== t || this.audioController.mute()
	}, AnimationItem.prototype.unmute = function (t) {
		t && this.name !== t || this.audioController.unmute()
	}, AnimationItem.prototype.updaFrameModifier = function () {
		this.frameModifier = this.frameMult * this.playSpeed * this.playDirection, this.audioController.setRate(this.playSpeed * this.playDirection)
	}, AnimationItem.prototype.getPath = function () {
		return this.path
	}, AnimationItem.prototype.getAssetsPath = function (t) {
		var e = "";
		if (t.e) e = t.p;
		else if (this.assetsPath) {
			var r = t.p; - 1 !== r.indexOf("images/") && (r = r.split("/")[1]), e = this.assetsPath + r
		} else e = this.path, e += t.u ? t.u : "", e += t.p;
		return e
	}, AnimationItem.prototype.getAssetData = function (t) {
		for (var e = 0, r = this.assets.length; e < r;) {
			if (t === this.assets[e].id) return this.assets[e];
			e += 1
		}
		return null
	}, AnimationItem.prototype.hide = function () {
		this.renderer.hide()
	}, AnimationItem.prototype.show = function () {
		this.renderer.show()
	}, AnimationItem.prototype.getDuration = function (t) {
		return t ? this.totalFrames : this.totalFrames / this.frameRate
	}, AnimationItem.prototype.updateDocumentData = function (t, e, r) {
		try {
			this.renderer.getElementByPath(t).updateDocumentData(e, r)
		} catch (t) {}
	}, AnimationItem.prototype.trigger = function (t) {
		if (this._cbs && this._cbs[t]) switch (t) {
			case "enterFrame":
				this.triggerEvent(t, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameModifier));
				break;
			case "drawnFrame":
				this.drawnFrameEvent.currentTime = this.currentFrame, this.drawnFrameEvent.totalTime = this.totalFrames, this.drawnFrameEvent.direction = this.frameModifier, this.triggerEvent(t, this.drawnFrameEvent);
				break;
			case "loopComplete":
				this.triggerEvent(t, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult));
				break;
			case "complete":
				this.triggerEvent(t, new BMCompleteEvent(t, this.frameMult));
				break;
			case "segmentStart":
				this.triggerEvent(t, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames));
				break;
			case "destroy":
				this.triggerEvent(t, new BMDestroyEvent(t, this));
				break;
			default:
				this.triggerEvent(t)
		}
		"enterFrame" === t && this.onEnterFrame && this.onEnterFrame.call(this, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameMult)), "loopComplete" === t && this.onLoopComplete && this.onLoopComplete.call(this, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult)), "complete" === t && this.onComplete && this.onComplete.call(this, new BMCompleteEvent(t, this.frameMult)), "segmentStart" === t && this.onSegmentStart && this.onSegmentStart.call(this, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames)), "destroy" === t && this.onDestroy && this.onDestroy.call(this, new BMDestroyEvent(t, this))
	}, AnimationItem.prototype.triggerRenderFrameError = function (t) {
		var e = new BMRenderFrameErrorEvent(t, this.currentFrame);
		this.triggerEvent("error", e), this.onError && this.onError.call(this, e)
	}, AnimationItem.prototype.triggerConfigError = function (t) {
		var e = new BMConfigErrorEvent(t, this.currentFrame);
		this.triggerEvent("error", e), this.onError && this.onError.call(this, e)
	};
	var animationManager = function () {
			var t = {},
				e = [],
				r = 0,
				i = 0,
				s = 0,
				a = !0,
				n = !1;

			function o(t) {
				for (var r = 0, s = t.target; r < i;) e[r].animation === s && (e.splice(r, 1), r -= 1, i -= 1, s.isPaused || p()), r += 1
			}

			function h(t, r) {
				if (!t) return null;
				for (var s = 0; s < i;) {
					if (e[s].elem === t && null !== e[s].elem) return e[s].animation;
					s += 1
				}
				var a = new AnimationItem;
				return f(a, t), a.setData(t, r), a
			}

			function l() {
				s += 1, d()
			}

			function p() {
				s -= 1
			}

			function f(t, r) {
				t.addEventListener("destroy", o), t.addEventListener("_active", l), t.addEventListener("_idle", p), e.push({
					elem: r,
					animation: t
				}), i += 1
			}

			function m(t) {
				var o, h = t - r;
				for (o = 0; o < i; o += 1) e[o].animation.advanceTime(h);
				r = t, s && !n ? window.requestAnimationFrame(m) : a = !0
			}

			function c(t) {
				r = t, window.requestAnimationFrame(m)
			}

			function d() {
				!n && s && a && (window.requestAnimationFrame(c), a = !1)
			}
			return t.registerAnimation = h, t.loadAnimation = function (t) {
				var e = new AnimationItem;
				return f(e, null), e.setParams(t), e
			}, t.setSpeed = function (t, r) {
				var s;
				for (s = 0; s < i; s += 1) e[s].animation.setSpeed(t, r)
			}, t.setDirection = function (t, r) {
				var s;
				for (s = 0; s < i; s += 1) e[s].animation.setDirection(t, r)
			}, t.play = function (t) {
				var r;
				for (r = 0; r < i; r += 1) e[r].animation.play(t)
			}, t.pause = function (t) {
				var r;
				for (r = 0; r < i; r += 1) e[r].animation.pause(t)
			}, t.stop = function (t) {
				var r;
				for (r = 0; r < i; r += 1) e[r].animation.stop(t)
			}, t.togglePause = function (t) {
				var r;
				for (r = 0; r < i; r += 1) e[r].animation.togglePause(t)
			}, t.searchAnimations = function (t, e, r) {
				var i, s = [].concat([].slice.call(document.getElementsByClassName("lottie")), [].slice.call(document.getElementsByClassName("bodymovin"))),
					a = s.length;
				for (i = 0; i < a; i += 1) r && s[i].setAttribute("data-bm-type", r), h(s[i], t);
				if (e && 0 === a) {
					r || (r = "svg");
					var n = document.getElementsByTagName("body")[0];
					n.innerText = "";
					var o = createTag("div");
					o.style.width = "100%", o.style.height = "100%", o.setAttribute("data-bm-type", r), n.appendChild(o), h(o, t)
				}
			}, t.resize = function () {
				var t;
				for (t = 0; t < i; t += 1) e[t].animation.resize()
			}, t.goToAndStop = function (t, r, s) {
				var a;
				for (a = 0; a < i; a += 1) e[a].animation.goToAndStop(t, r, s)
			}, t.destroy = function (t) {
				var r;
				for (r = i - 1; r >= 0; r -= 1) e[r].animation.destroy(t)
			}, t.freeze = function () {
				n = !0
			}, t.unfreeze = function () {
				n = !1, d()
			}, t.setVolume = function (t, r) {
				var s;
				for (s = 0; s < i; s += 1) e[s].animation.setVolume(t, r)
			}, t.mute = function (t) {
				var r;
				for (r = 0; r < i; r += 1) e[r].animation.mute(t)
			}, t.unmute = function (t) {
				var r;
				for (r = 0; r < i; r += 1) e[r].animation.unmute(t)
			}, t.getRegisteredAnimations = function () {
				var t, r = e.length,
					i = [];
				for (t = 0; t < r; t += 1) i.push(e[t].animation);
				return i
			}, t
		}(),
		BezierFactory = function () {
			var t = {
					getBezierEasing: function (t, r, i, s, a) {
						var n = a || ("bez_" + t + "_" + r + "_" + i + "_" + s).replace(/\./g, "p");
						if (e[n]) return e[n];
						var o = new l([t, r, i, s]);
						return e[n] = o, o
					}
				},
				e = {};
			var r = .1,
				i = "function" == typeof Float32Array;

			function s(t, e) {
				return 1 - 3 * e + 3 * t
			}

			function a(t, e) {
				return 3 * e - 6 * t
			}

			function n(t) {
				return 3 * t
			}

			function o(t, e, r) {
				return ((s(e, r) * t + a(e, r)) * t + n(e)) * t
			}

			function h(t, e, r) {
				return 3 * s(e, r) * t * t + 2 * a(e, r) * t + n(e)
			}

			function l(t) {
				this._p = t, this._mSampleValues = i ? new Float32Array(11) : new Array(11), this._precomputed = !1, this.get = this.get.bind(this)
			}
			return l.prototype = {
				get: function (t) {
					var e = this._p[0],
						r = this._p[1],
						i = this._p[2],
						s = this._p[3];
					return this._precomputed || this._precompute(), e === r && i === s ? t : 0 === t ? 0 : 1 === t ? 1 : o(this._getTForX(t), r, s)
				},
				_precompute: function () {
					var t = this._p[0],
						e = this._p[1],
						r = this._p[2],
						i = this._p[3];
					this._precomputed = !0, t === e && r === i || this._calcSampleValues()
				},
				_calcSampleValues: function () {
					for (var t = this._p[0], e = this._p[2], i = 0; i < 11; ++i) this._mSampleValues[i] = o(i * r, t, e)
				},
				_getTForX: function (t) {
					for (var e = this._p[0], i = this._p[2], s = this._mSampleValues, a = 0, n = 1; 10 !== n && s[n] <= t; ++n) a += r;
					var l = a + (t - s[--n]) / (s[n + 1] - s[n]) * r,
						p = h(l, e, i);
					return p >= .001 ? function (t, e, r, i) {
						for (var s = 0; s < 4; ++s) {
							var a = h(e, r, i);
							if (0 === a) return e;
							e -= (o(e, r, i) - t) / a
						}
						return e
					}(t, l, e, i) : 0 === p ? l : function (t, e, r, i, s) {
						var a, n, h = 0;
						do {
							(a = o(n = e + (r - e) / 2, i, s) - t) > 0 ? r = n : e = n
						} while (Math.abs(a) > 1e-7 && ++h < 10);
						return n
					}(t, a, a + r, e, i)
				}
			}, t
		}(),
		pooling = {
			double: function (t) {
				return t.concat(createSizedArray(t.length))
			}
		},
		poolFactory = function (t, e, r) {
			var i = 0,
				s = t,
				a = createSizedArray(s);
			return {
				newElement: function () {
					return i ? a[i -= 1] : e()
				},
				release: function (t) {
					i === s && (a = pooling.double(a), s *= 2), r && r(t), a[i] = t, i += 1
				}
			}
		},
		bezierLengthPool = poolFactory(8, (function () {
			return {
				addedLength: 0,
				percents: createTypedArray("float32", getDefaultCurveSegments()),
				lengths: createTypedArray("float32", getDefaultCurveSegments())
			}
		})),
		segmentsLengthPool = poolFactory(8, (function () {
			return {
				lengths: [],
				totalLength: 0
			}
		}), (function (t) {
			var e, r = t.lengths.length;
			for (e = 0; e < r; e += 1) bezierLengthPool.release(t.lengths[e]);
			t.lengths.length = 0
		}));

	function bezFunction() {
		var t = Math;

		function e(t, e, r, i, s, a) {
			var n = t * i + e * s + r * a - s * i - a * t - r * e;
			return n > -.001 && n < .001
		}
		var r = function (t, e, r, i) {
			var s, a, n, o, h, l, p = getDefaultCurveSegments(),
				f = 0,
				m = [],
				c = [],
				d = bezierLengthPool.newElement();
			for (n = r.length, s = 0; s < p; s += 1) {
				for (h = s / (p - 1), l = 0, a = 0; a < n; a += 1) o = bmPow(1 - h, 3) * t[a] + 3 * bmPow(1 - h, 2) * h * r[a] + 3 * (1 - h) * bmPow(h, 2) * i[a] + bmPow(h, 3) * e[a], m[a] = o, null !== c[a] && (l += bmPow(m[a] - c[a], 2)), c[a] = m[a];
				l && (f += l = bmSqrt(l)), d.percents[s] = h, d.lengths[s] = f
			}
			return d.addedLength = f, d
		};

		function i(t) {
			this.segmentLength = 0, this.points = new Array(t)
		}

		function s(t, e) {
			this.partialLength = t, this.point = e
		}
		var a, n = (a = {}, function (t, r, n, o) {
			var h = (t[0] + "_" + t[1] + "_" + r[0] + "_" + r[1] + "_" + n[0] + "_" + n[1] + "_" + o[0] + "_" + o[1]).replace(/\./g, "p");
			if (!a[h]) {
				var l, p, f, m, c, d, u, y = getDefaultCurveSegments(),
					g = 0,
					v = null;
				2 === t.length && (t[0] !== r[0] || t[1] !== r[1]) && e(t[0], t[1], r[0], r[1], t[0] + n[0], t[1] + n[1]) && e(t[0], t[1], r[0], r[1], r[0] + o[0], r[1] + o[1]) && (y = 2);
				var b = new i(y);
				for (f = n.length, l = 0; l < y; l += 1) {
					for (u = createSizedArray(f), c = l / (y - 1), d = 0, p = 0; p < f; p += 1) m = bmPow(1 - c, 3) * t[p] + 3 * bmPow(1 - c, 2) * c * (t[p] + n[p]) + 3 * (1 - c) * bmPow(c, 2) * (r[p] + o[p]) + bmPow(c, 3) * r[p], u[p] = m, null !== v && (d += bmPow(u[p] - v[p], 2));
					g += d = bmSqrt(d), b.points[l] = new s(d, u), v = u
				}
				b.segmentLength = g, a[h] = b
			}
			return a[h]
		});

		function o(t, e) {
			var r = e.percents,
				i = e.lengths,
				s = r.length,
				a = bmFloor((s - 1) * t),
				n = t * e.addedLength,
				o = 0;
			if (a === s - 1 || 0 === a || n === i[a]) return r[a];
			for (var h = i[a] > n ? -1 : 1, l = !0; l;)
				if (i[a] <= n && i[a + 1] > n ? (o = (n - i[a]) / (i[a + 1] - i[a]), l = !1) : a += h, a < 0 || a >= s - 1) {
					if (a === s - 1) return r[a];
					l = !1
				} return r[a] + (r[a + 1] - r[a]) * o
		}
		var h = createTypedArray("float32", 8);
		return {
			getSegmentsLength: function (t) {
				var e, i = segmentsLengthPool.newElement(),
					s = t.c,
					a = t.v,
					n = t.o,
					o = t.i,
					h = t._length,
					l = i.lengths,
					p = 0;
				for (e = 0; e < h - 1; e += 1) l[e] = r(a[e], a[e + 1], n[e], o[e + 1]), p += l[e].addedLength;
				return s && h && (l[e] = r(a[e], a[0], n[e], o[0]), p += l[e].addedLength), i.totalLength = p, i
			},
			getNewSegment: function (e, r, i, s, a, n, l) {
				a < 0 ? a = 0 : a > 1 && (a = 1);
				var p, f = o(a, l),
					m = o(n = n > 1 ? 1 : n, l),
					c = e.length,
					d = 1 - f,
					u = 1 - m,
					y = d * d * d,
					g = f * d * d * 3,
					v = f * f * d * 3,
					b = f * f * f,
					P = d * d * u,
					x = f * d * u + d * f * u + d * d * m,
					E = f * f * u + d * f * m + f * d * m,
					S = f * f * m,
					C = d * u * u,
					_ = f * u * u + d * m * u + d * u * m,
					A = f * m * u + d * m * m + f * u * m,
					T = f * m * m,
					M = u * u * u,
					k = m * u * u + u * m * u + u * u * m,
					D = m * m * u + u * m * m + m * u * m,
					F = m * m * m;
				for (p = 0; p < c; p += 1) h[4 * p] = t.round(1e3 * (y * e[p] + g * i[p] + v * s[p] + b * r[p])) / 1e3, h[4 * p + 1] = t.round(1e3 * (P * e[p] + x * i[p] + E * s[p] + S * r[p])) / 1e3, h[4 * p + 2] = t.round(1e3 * (C * e[p] + _ * i[p] + A * s[p] + T * r[p])) / 1e3, h[4 * p + 3] = t.round(1e3 * (M * e[p] + k * i[p] + D * s[p] + F * r[p])) / 1e3;
				return h
			},
			getPointInSegment: function (e, r, i, s, a, n) {
				var h = o(a, n),
					l = 1 - h;
				return [t.round(1e3 * (l * l * l * e[0] + (h * l * l + l * h * l + l * l * h) * i[0] + (h * h * l + l * h * h + h * l * h) * s[0] + h * h * h * r[0])) / 1e3, t.round(1e3 * (l * l * l * e[1] + (h * l * l + l * h * l + l * l * h) * i[1] + (h * h * l + l * h * h + h * l * h) * s[1] + h * h * h * r[1])) / 1e3]
			},
			buildBezierData: n,
			pointOnLine2D: e,
			pointOnLine3D: function (r, i, s, a, n, o, h, l, p) {
				if (0 === s && 0 === o && 0 === p) return e(r, i, a, n, h, l);
				var f, m = t.sqrt(t.pow(a - r, 2) + t.pow(n - i, 2) + t.pow(o - s, 2)),
					c = t.sqrt(t.pow(h - r, 2) + t.pow(l - i, 2) + t.pow(p - s, 2)),
					d = t.sqrt(t.pow(h - a, 2) + t.pow(l - n, 2) + t.pow(p - o, 2));
				return (f = m > c ? m > d ? m - c - d : d - c - m : d > c ? d - c - m : c - m - d) > -1e-4 && f < 1e-4
			}
		}
	}
	var bez = bezFunction(),
		PropertyFactory = function () {
			var t = initialDefaultFrame,
				e = Math.abs;

			function r(t, e) {
				var r, s = this.offsetTime;
				"multidimensional" === this.propType && (r = createTypedArray("float32", this.pv.length));
				for (var a, n, o, h, l, p, f, m, c, d = e.lastIndex, u = d, y = this.keyframes.length - 1, g = !0; g;) {
					if (a = this.keyframes[u], n = this.keyframes[u + 1], u === y - 1 && t >= n.t - s) {
						a.h && (a = n), d = 0;
						break
					}
					if (n.t - s > t) {
						d = u;
						break
					}
					u < y - 1 ? u += 1 : (d = 0, g = !1)
				}
				o = this.keyframesMetadata[u] || {};
				var v, b, P, x, E, S, C, _, A, T, M = n.t - s,
					k = a.t - s;
				if (a.to) {
					o.bezierData || (o.bezierData = bez.buildBezierData(a.s, n.s || a.e, a.to, a.ti));
					var D = o.bezierData;
					if (t >= M || t < k) {
						var F = t >= M ? D.points.length - 1 : 0;
						for (l = D.points[F].point.length, h = 0; h < l; h += 1) r[h] = D.points[F].point[h]
					} else {
						o.__fnct ? c = o.__fnct : (c = BezierFactory.getBezierEasing(a.o.x, a.o.y, a.i.x, a.i.y, a.n).get, o.__fnct = c), p = c((t - k) / (M - k));
						var w, I = D.segmentLength * p,
							B = e.lastFrame < t && e._lastKeyframeIndex === u ? e._lastAddedLength : 0;
						for (m = e.lastFrame < t && e._lastKeyframeIndex === u ? e._lastPoint : 0, g = !0, f = D.points.length; g;) {
							if (B += D.points[m].partialLength, 0 === I || 0 === p || m === D.points.length - 1) {
								for (l = D.points[m].point.length, h = 0; h < l; h += 1) r[h] = D.points[m].point[h];
								break
							}
							if (I >= B && I < B + D.points[m + 1].partialLength) {
								for (w = (I - B) / D.points[m + 1].partialLength, l = D.points[m].point.length, h = 0; h < l; h += 1) r[h] = D.points[m].point[h] + (D.points[m + 1].point[h] - D.points[m].point[h]) * w;
								break
							}
							m < f - 1 ? m += 1 : g = !1
						}
						e._lastPoint = m, e._lastAddedLength = B - D.points[m].partialLength, e._lastKeyframeIndex = u
					}
				} else {
					var V, R, L, z, G;
					if (y = a.s.length, v = n.s || a.e, this.sh && 1 !== a.h)
						if (t >= M) r[0] = v[0], r[1] = v[1], r[2] = v[2];
						else if (t <= k) r[0] = a.s[0], r[1] = a.s[1], r[2] = a.s[2];
					else {
						var O = i(a.s),
							N = i(v);
						b = r, P = function (t, e, r) {
							var i, s, a, n, o, h = [],
								l = t[0],
								p = t[1],
								f = t[2],
								m = t[3],
								c = e[0],
								d = e[1],
								u = e[2],
								y = e[3];
							return (s = l * c + p * d + f * u + m * y) < 0 && (s = -s, c = -c, d = -d, u = -u, y = -y), 1 - s > 1e-6 ? (i = Math.acos(s), a = Math.sin(i), n = Math.sin((1 - r) * i) / a, o = Math.sin(r * i) / a) : (n = 1 - r, o = r), h[0] = n * l + o * c, h[1] = n * p + o * d, h[2] = n * f + o * u, h[3] = n * m + o * y, h
						}(O, N, (t - k) / (M - k)), x = P[0], E = P[1], S = P[2], C = P[3], _ = Math.atan2(2 * E * C - 2 * x * S, 1 - 2 * E * E - 2 * S * S), A = Math.asin(2 * x * E + 2 * S * C), T = Math.atan2(2 * x * C - 2 * E * S, 1 - 2 * x * x - 2 * S * S), b[0] = _ / degToRads, b[1] = A / degToRads, b[2] = T / degToRads
					} else
						for (u = 0; u < y; u += 1) 1 !== a.h && (t >= M ? p = 1 : t < k ? p = 0 : (a.o.x.constructor === Array ? (o.__fnct || (o.__fnct = []), o.__fnct[u] ? c = o.__fnct[u] : (V = void 0 === a.o.x[u] ? a.o.x[0] : a.o.x[u], R = void 0 === a.o.y[u] ? a.o.y[0] : a.o.y[u], L = void 0 === a.i.x[u] ? a.i.x[0] : a.i.x[u], z = void 0 === a.i.y[u] ? a.i.y[0] : a.i.y[u], c = BezierFactory.getBezierEasing(V, R, L, z).get, o.__fnct[u] = c)) : o.__fnct ? c = o.__fnct : (V = a.o.x, R = a.o.y, L = a.i.x, z = a.i.y, c = BezierFactory.getBezierEasing(V, R, L, z).get, a.keyframeMetadata = c), p = c((t - k) / (M - k)))), v = n.s || a.e, G = 1 === a.h ? a.s[u] : a.s[u] + (v[u] - a.s[u]) * p, "multidimensional" === this.propType ? r[u] = G : r = G
				}
				return e.lastIndex = d, r
			}

			function i(t) {
				var e = t[0] * degToRads,
					r = t[1] * degToRads,
					i = t[2] * degToRads,
					s = Math.cos(e / 2),
					a = Math.cos(r / 2),
					n = Math.cos(i / 2),
					o = Math.sin(e / 2),
					h = Math.sin(r / 2),
					l = Math.sin(i / 2);
				return [o * h * n + s * a * l, o * a * n + s * h * l, s * h * n - o * a * l, s * a * n - o * h * l]
			}

			function s() {
				var e = this.comp.renderedFrame - this.offsetTime,
					r = this.keyframes[0].t - this.offsetTime,
					i = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
				if (!(e === this._caching.lastFrame || this._caching.lastFrame !== t && (this._caching.lastFrame >= i && e >= i || this._caching.lastFrame < r && e < r))) {
					this._caching.lastFrame >= e && (this._caching._lastKeyframeIndex = -1, this._caching.lastIndex = 0);
					var s = this.interpolateValue(e, this._caching);
					this.pv = s
				}
				return this._caching.lastFrame = e, this.pv
			}

			function a(t) {
				var r;
				if ("unidimensional" === this.propType) r = t * this.mult, e(this.v - r) > 1e-5 && (this.v = r, this._mdf = !0);
				else
					for (var i = 0, s = this.v.length; i < s;) r = t[i] * this.mult, e(this.v[i] - r) > 1e-5 && (this.v[i] = r, this._mdf = !0), i += 1
			}

			function n() {
				if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length)
					if (this.lock) this.setVValue(this.pv);
					else {
						var t;
						this.lock = !0, this._mdf = this._isFirstFrame;
						var e = this.effectsSequence.length,
							r = this.kf ? this.pv : this.data.k;
						for (t = 0; t < e; t += 1) r = this.effectsSequence[t](r);
						this.setVValue(r), this._isFirstFrame = !1, this.lock = !1, this.frameId = this.elem.globalData.frameId
					}
			}

			function o(t) {
				this.effectsSequence.push(t), this.container.addDynamicProperty(this)
			}

			function h(t, e, r, i) {
				this.propType = "unidimensional", this.mult = r || 1, this.data = e, this.v = r ? e.k * r : e.k, this.pv = e.k, this._mdf = !1, this.elem = t, this.container = i, this.comp = t.comp, this.k = !1, this.kf = !1, this.vel = 0, this.effectsSequence = [], this._isFirstFrame = !0, this.getValue = n, this.setVValue = a, this.addEffect = o
			}

			function l(t, e, r, i) {
				var s;
				this.propType = "multidimensional", this.mult = r || 1, this.data = e, this._mdf = !1, this.elem = t, this.container = i, this.comp = t.comp, this.k = !1, this.kf = !1, this.frameId = -1;
				var h = e.k.length;
				for (this.v = createTypedArray("float32", h), this.pv = createTypedArray("float32", h), this.vel = createTypedArray("float32", h), s = 0; s < h; s += 1) this.v[s] = e.k[s] * this.mult, this.pv[s] = e.k[s];
				this._isFirstFrame = !0, this.effectsSequence = [], this.getValue = n, this.setVValue = a, this.addEffect = o
			}

			function p(e, i, h, l) {
				this.propType = "unidimensional", this.keyframes = i.k, this.keyframesMetadata = [], this.offsetTime = e.data.st, this.frameId = -1, this._caching = {
					lastFrame: t,
					lastIndex: 0,
					value: 0,
					_lastKeyframeIndex: -1
				}, this.k = !0, this.kf = !0, this.data = i, this.mult = h || 1, this.elem = e, this.container = l, this.comp = e.comp, this.v = t, this.pv = t, this._isFirstFrame = !0, this.getValue = n, this.setVValue = a, this.interpolateValue = r, this.effectsSequence = [s.bind(this)], this.addEffect = o
			}

			function f(e, i, h, l) {
				var p;
				this.propType = "multidimensional";
				var f, m, c, d, u = i.k.length;
				for (p = 0; p < u - 1; p += 1) i.k[p].to && i.k[p].s && i.k[p + 1] && i.k[p + 1].s && (f = i.k[p].s, m = i.k[p + 1].s, c = i.k[p].to, d = i.k[p].ti, (2 === f.length && (f[0] !== m[0] || f[1] !== m[1]) && bez.pointOnLine2D(f[0], f[1], m[0], m[1], f[0] + c[0], f[1] + c[1]) && bez.pointOnLine2D(f[0], f[1], m[0], m[1], m[0] + d[0], m[1] + d[1]) || 3 === f.length && (f[0] !== m[0] || f[1] !== m[1] || f[2] !== m[2]) && bez.pointOnLine3D(f[0], f[1], f[2], m[0], m[1], m[2], f[0] + c[0], f[1] + c[1], f[2] + c[2]) && bez.pointOnLine3D(f[0], f[1], f[2], m[0], m[1], m[2], m[0] + d[0], m[1] + d[1], m[2] + d[2])) && (i.k[p].to = null, i.k[p].ti = null), f[0] === m[0] && f[1] === m[1] && 0 === c[0] && 0 === c[1] && 0 === d[0] && 0 === d[1] && (2 === f.length || f[2] === m[2] && 0 === c[2] && 0 === d[2]) && (i.k[p].to = null, i.k[p].ti = null));
				this.effectsSequence = [s.bind(this)], this.data = i, this.keyframes = i.k, this.keyframesMetadata = [], this.offsetTime = e.data.st, this.k = !0, this.kf = !0, this._isFirstFrame = !0, this.mult = h || 1, this.elem = e, this.container = l, this.comp = e.comp, this.getValue = n, this.setVValue = a, this.interpolateValue = r, this.frameId = -1;
				var y = i.k[0].s.length;
				for (this.v = createTypedArray("float32", y), this.pv = createTypedArray("float32", y), p = 0; p < y; p += 1) this.v[p] = t, this.pv[p] = t;
				this._caching = {
					lastFrame: t,
					lastIndex: 0,
					value: createTypedArray("float32", y)
				}, this.addEffect = o
			}
			return {
				getProp: function (t, e, r, i, s) {
					var a;
					if (e.k.length)
						if ("number" == typeof e.k[0]) a = new l(t, e, i, s);
						else switch (r) {
							case 0:
								a = new p(t, e, i, s);
								break;
							case 1:
								a = new f(t, e, i, s)
						} else a = new h(t, e, i, s);
					return a.effectsSequence.length && s.addDynamicProperty(a), a
				}
			}
		}();

	function DynamicPropertyContainer() {}
	DynamicPropertyContainer.prototype = {
		addDynamicProperty: function (t) {
			-1 === this.dynamicProperties.indexOf(t) && (this.dynamicProperties.push(t), this.container.addDynamicProperty(this), this._isAnimated = !0)
		},
		iterateDynamicProperties: function () {
			var t;
			this._mdf = !1;
			var e = this.dynamicProperties.length;
			for (t = 0; t < e; t += 1) this.dynamicProperties[t].getValue(), this.dynamicProperties[t]._mdf && (this._mdf = !0)
		},
		initDynamicPropertyContainer: function (t) {
			this.container = t, this.dynamicProperties = [], this._mdf = !1, this._isAnimated = !1
		}
	};
	var pointPool = poolFactory(8, (function () {
		return createTypedArray("float32", 2)
	}));

	function ShapePath() {
		this.c = !1, this._length = 0, this._maxLength = 8, this.v = createSizedArray(this._maxLength), this.o = createSizedArray(this._maxLength), this.i = createSizedArray(this._maxLength)
	}
	ShapePath.prototype.setPathData = function (t, e) {
		this.c = t, this.setLength(e);
		for (var r = 0; r < e;) this.v[r] = pointPool.newElement(), this.o[r] = pointPool.newElement(), this.i[r] = pointPool.newElement(), r += 1
	}, ShapePath.prototype.setLength = function (t) {
		for (; this._maxLength < t;) this.doubleArrayLength();
		this._length = t
	}, ShapePath.prototype.doubleArrayLength = function () {
		this.v = this.v.concat(createSizedArray(this._maxLength)), this.i = this.i.concat(createSizedArray(this._maxLength)), this.o = this.o.concat(createSizedArray(this._maxLength)), this._maxLength *= 2
	}, ShapePath.prototype.setXYAt = function (t, e, r, i, s) {
		var a;
		switch (this._length = Math.max(this._length, i + 1), this._length >= this._maxLength && this.doubleArrayLength(), r) {
			case "v":
				a = this.v;
				break;
			case "i":
				a = this.i;
				break;
			case "o":
				a = this.o;
				break;
			default:
				a = []
		}(!a[i] || a[i] && !s) && (a[i] = pointPool.newElement()), a[i][0] = t, a[i][1] = e
	}, ShapePath.prototype.setTripleAt = function (t, e, r, i, s, a, n, o) {
		this.setXYAt(t, e, "v", n, o), this.setXYAt(r, i, "o", n, o), this.setXYAt(s, a, "i", n, o)
	}, ShapePath.prototype.reverse = function () {
		var t = new ShapePath;
		t.setPathData(this.c, this._length);
		var e = this.v,
			r = this.o,
			i = this.i,
			s = 0;
		this.c && (t.setTripleAt(e[0][0], e[0][1], i[0][0], i[0][1], r[0][0], r[0][1], 0, !1), s = 1);
		var a, n = this._length - 1,
			o = this._length;
		for (a = s; a < o; a += 1) t.setTripleAt(e[n][0], e[n][1], i[n][0], i[n][1], r[n][0], r[n][1], a, !1), n -= 1;
		return t
	}, ShapePath.prototype.length = function () {
		return this._length
	};
	var shapePool = (factory = poolFactory(4, (function () {
			return new ShapePath
		}), (function (t) {
			var e, r = t._length;
			for (e = 0; e < r; e += 1) pointPool.release(t.v[e]), pointPool.release(t.i[e]), pointPool.release(t.o[e]), t.v[e] = null, t.i[e] = null, t.o[e] = null;
			t._length = 0, t.c = !1
		})), factory.clone = function (t) {
			var e, r = factory.newElement(),
				i = void 0 === t._length ? t.v.length : t._length;
			for (r.setLength(i), r.c = t.c, e = 0; e < i; e += 1) r.setTripleAt(t.v[e][0], t.v[e][1], t.o[e][0], t.o[e][1], t.i[e][0], t.i[e][1], e);
			return r
		}, factory),
		factory;

	function ShapeCollection() {
		this._length = 0, this._maxLength = 4, this.shapes = createSizedArray(this._maxLength)
	}
	ShapeCollection.prototype.addShape = function (t) {
		this._length === this._maxLength && (this.shapes = this.shapes.concat(createSizedArray(this._maxLength)), this._maxLength *= 2), this.shapes[this._length] = t, this._length += 1
	}, ShapeCollection.prototype.releaseShapes = function () {
		var t;
		for (t = 0; t < this._length; t += 1) shapePool.release(this.shapes[t]);
		this._length = 0
	};
	var shapeCollectionPool = (ob = {
			newShapeCollection: function () {
				return _length ? pool[_length -= 1] : new ShapeCollection
			},
			release: function (t) {
				var e, r = t._length;
				for (e = 0; e < r; e += 1) shapePool.release(t.shapes[e]);
				t._length = 0, _length === _maxLength && (pool = pooling.double(pool), _maxLength *= 2), pool[_length] = t, _length += 1
			}
		}, _length = 0, _maxLength = 4, pool = createSizedArray(_maxLength), ob),
		ob, _length, _maxLength, pool, ShapePropertyFactory = function () {
			var t = -999999;

			function e(t, e, r) {
				var i, s, a, n, o, h, l, p, f, m = r.lastIndex,
					c = this.keyframes;
				if (t < c[0].t - this.offsetTime) i = c[0].s[0], a = !0, m = 0;
				else if (t >= c[c.length - 1].t - this.offsetTime) i = c[c.length - 1].s ? c[c.length - 1].s[0] : c[c.length - 2].e[0], a = !0;
				else {
					for (var d, u, y, g = m, v = c.length - 1, b = !0; b && (d = c[g], !((u = c[g + 1]).t - this.offsetTime > t));) g < v - 1 ? g += 1 : b = !1;
					if (y = this.keyframesMetadata[g] || {}, m = g, !(a = 1 === d.h)) {
						if (t >= u.t - this.offsetTime) p = 1;
						else if (t < d.t - this.offsetTime) p = 0;
						else {
							var P;
							y.__fnct ? P = y.__fnct : (P = BezierFactory.getBezierEasing(d.o.x, d.o.y, d.i.x, d.i.y).get, y.__fnct = P), p = P((t - (d.t - this.offsetTime)) / (u.t - this.offsetTime - (d.t - this.offsetTime)))
						}
						s = u.s ? u.s[0] : d.e[0]
					}
					i = d.s[0]
				}
				for (h = e._length, l = i.i[0].length, r.lastIndex = m, n = 0; n < h; n += 1)
					for (o = 0; o < l; o += 1) f = a ? i.i[n][o] : i.i[n][o] + (s.i[n][o] - i.i[n][o]) * p, e.i[n][o] = f, f = a ? i.o[n][o] : i.o[n][o] + (s.o[n][o] - i.o[n][o]) * p, e.o[n][o] = f, f = a ? i.v[n][o] : i.v[n][o] + (s.v[n][o] - i.v[n][o]) * p, e.v[n][o] = f
			}

			function r() {
				var e = this.comp.renderedFrame - this.offsetTime,
					r = this.keyframes[0].t - this.offsetTime,
					i = this.keyframes[this.keyframes.length - 1].t - this.offsetTime,
					s = this._caching.lastFrame;
				return s !== t && (s < r && e < r || s > i && e > i) || (this._caching.lastIndex = s < e ? this._caching.lastIndex : 0, this.interpolateShape(e, this.pv, this._caching)), this._caching.lastFrame = e, this.pv
			}

			function i() {
				this.paths = this.localShapeCollection
			}

			function s(t) {
				(function (t, e) {
					if (t._length !== e._length || t.c !== e.c) return !1;
					var r, i = t._length;
					for (r = 0; r < i; r += 1)
						if (t.v[r][0] !== e.v[r][0] || t.v[r][1] !== e.v[r][1] || t.o[r][0] !== e.o[r][0] || t.o[r][1] !== e.o[r][1] || t.i[r][0] !== e.i[r][0] || t.i[r][1] !== e.i[r][1]) return !1;
					return !0
				})(this.v, t) || (this.v = shapePool.clone(t), this.localShapeCollection.releaseShapes(), this.localShapeCollection.addShape(this.v), this._mdf = !0, this.paths = this.localShapeCollection)
			}

			function a() {
				if (this.elem.globalData.frameId !== this.frameId)
					if (this.effectsSequence.length)
						if (this.lock) this.setVValue(this.pv);
						else {
							var t, e;
							this.lock = !0, this._mdf = !1, t = this.kf ? this.pv : this.data.ks ? this.data.ks.k : this.data.pt.k;
							var r = this.effectsSequence.length;
							for (e = 0; e < r; e += 1) t = this.effectsSequence[e](t);
							this.setVValue(t), this.lock = !1, this.frameId = this.elem.globalData.frameId
						}
				else this._mdf = !1
			}

			function n(t, e, r) {
				this.propType = "shape", this.comp = t.comp, this.container = t, this.elem = t, this.data = e, this.k = !1, this.kf = !1, this._mdf = !1;
				var s = 3 === r ? e.pt.k : e.ks.k;
				this.v = shapePool.clone(s), this.pv = shapePool.clone(this.v), this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.reset = i, this.effectsSequence = []
			}

			function o(t) {
				this.effectsSequence.push(t), this.container.addDynamicProperty(this)
			}

			function h(e, s, a) {
				this.propType = "shape", this.comp = e.comp, this.elem = e, this.container = e, this.offsetTime = e.data.st, this.keyframes = 3 === a ? s.pt.k : s.ks.k, this.keyframesMetadata = [], this.k = !0, this.kf = !0;
				var n = this.keyframes[0].s[0].i.length;
				this.v = shapePool.newElement(), this.v.setPathData(this.keyframes[0].s[0].c, n), this.pv = shapePool.clone(this.v), this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.lastFrame = t, this.reset = i, this._caching = {
					lastFrame: t,
					lastIndex: 0
				}, this.effectsSequence = [r.bind(this)]
			}
			n.prototype.interpolateShape = e, n.prototype.getValue = a, n.prototype.setVValue = s, n.prototype.addEffect = o, h.prototype.getValue = a, h.prototype.interpolateShape = e, h.prototype.setVValue = s, h.prototype.addEffect = o;
			var l = function () {
					var t = roundCorner;

					function e(t, e) {
						this.v = shapePool.newElement(), this.v.setPathData(!0, 4), this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.paths = this.localShapeCollection, this.localShapeCollection.addShape(this.v), this.d = e.d, this.elem = t, this.comp = t.comp, this.frameId = -1, this.initDynamicPropertyContainer(t), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s, 1, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertEllToPath())
					}
					return e.prototype = {
						reset: i,
						getValue: function () {
							this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertEllToPath())
						},
						convertEllToPath: function () {
							var e = this.p.v[0],
								r = this.p.v[1],
								i = this.s.v[0] / 2,
								s = this.s.v[1] / 2,
								a = 3 !== this.d,
								n = this.v;
							n.v[0][0] = e, n.v[0][1] = r - s, n.v[1][0] = a ? e + i : e - i, n.v[1][1] = r, n.v[2][0] = e, n.v[2][1] = r + s, n.v[3][0] = a ? e - i : e + i, n.v[3][1] = r, n.i[0][0] = a ? e - i * t : e + i * t, n.i[0][1] = r - s, n.i[1][0] = a ? e + i : e - i, n.i[1][1] = r - s * t, n.i[2][0] = a ? e + i * t : e - i * t, n.i[2][1] = r + s, n.i[3][0] = a ? e - i : e + i, n.i[3][1] = r + s * t, n.o[0][0] = a ? e + i * t : e - i * t, n.o[0][1] = r - s, n.o[1][0] = a ? e + i : e - i, n.o[1][1] = r + s * t, n.o[2][0] = a ? e - i * t : e + i * t, n.o[2][1] = r + s, n.o[3][0] = a ? e - i : e + i, n.o[3][1] = r - s * t
						}
					}, extendPrototype([DynamicPropertyContainer], e), e
				}(),
				p = function () {
					function t(t, e) {
						this.v = shapePool.newElement(), this.v.setPathData(!0, 0), this.elem = t, this.comp = t.comp, this.data = e, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), 1 === e.sy ? (this.ir = PropertyFactory.getProp(t, e.ir, 0, 0, this), this.is = PropertyFactory.getProp(t, e.is, 0, .01, this), this.convertToPath = this.convertStarToPath) : this.convertToPath = this.convertPolygonToPath, this.pt = PropertyFactory.getProp(t, e.pt, 0, 0, this), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.r = PropertyFactory.getProp(t, e.r, 0, degToRads, this), this.or = PropertyFactory.getProp(t, e.or, 0, 0, this), this.os = PropertyFactory.getProp(t, e.os, 0, .01, this), this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertToPath())
					}
					return t.prototype = {
						reset: i,
						getValue: function () {
							this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertToPath())
						},
						convertStarToPath: function () {
							var t, e, r, i, s = 2 * Math.floor(this.pt.v),
								a = 2 * Math.PI / s,
								n = !0,
								o = this.or.v,
								h = this.ir.v,
								l = this.os.v,
								p = this.is.v,
								f = 2 * Math.PI * o / (2 * s),
								m = 2 * Math.PI * h / (2 * s),
								c = -Math.PI / 2;
							c += this.r.v;
							var d = 3 === this.data.d ? -1 : 1;
							for (this.v._length = 0, t = 0; t < s; t += 1) {
								r = n ? l : p, i = n ? f : m;
								var u = (e = n ? o : h) * Math.cos(c),
									y = e * Math.sin(c),
									g = 0 === u && 0 === y ? 0 : y / Math.sqrt(u * u + y * y),
									v = 0 === u && 0 === y ? 0 : -u / Math.sqrt(u * u + y * y);
								u += +this.p.v[0], y += +this.p.v[1], this.v.setTripleAt(u, y, u - g * i * r * d, y - v * i * r * d, u + g * i * r * d, y + v * i * r * d, t, !0), n = !n, c += a * d
							}
						},
						convertPolygonToPath: function () {
							var t, e = Math.floor(this.pt.v),
								r = 2 * Math.PI / e,
								i = this.or.v,
								s = this.os.v,
								a = 2 * Math.PI * i / (4 * e),
								n = .5 * -Math.PI,
								o = 3 === this.data.d ? -1 : 1;
							for (n += this.r.v, this.v._length = 0, t = 0; t < e; t += 1) {
								var h = i * Math.cos(n),
									l = i * Math.sin(n),
									p = 0 === h && 0 === l ? 0 : l / Math.sqrt(h * h + l * l),
									f = 0 === h && 0 === l ? 0 : -h / Math.sqrt(h * h + l * l);
								h += +this.p.v[0], l += +this.p.v[1], this.v.setTripleAt(h, l, h - p * a * s * o, l - f * a * s * o, h + p * a * s * o, l + f * a * s * o, t, !0), n += r * o
							}
							this.paths.length = 0, this.paths[0] = this.v
						}
					}, extendPrototype([DynamicPropertyContainer], t), t
				}(),
				f = function () {
					function t(t, e) {
						this.v = shapePool.newElement(), this.v.c = !0, this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.elem = t, this.comp = t.comp, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s, 1, 0, this), this.r = PropertyFactory.getProp(t, e.r, 0, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertRectToPath())
					}
					return t.prototype = {
						convertRectToPath: function () {
							var t = this.p.v[0],
								e = this.p.v[1],
								r = this.s.v[0] / 2,
								i = this.s.v[1] / 2,
								s = bmMin(r, i, this.r.v),
								a = s * (1 - roundCorner);
							this.v._length = 0, 2 === this.d || 1 === this.d ? (this.v.setTripleAt(t + r, e - i + s, t + r, e - i + s, t + r, e - i + a, 0, !0), this.v.setTripleAt(t + r, e + i - s, t + r, e + i - a, t + r, e + i - s, 1, !0), 0 !== s ? (this.v.setTripleAt(t + r - s, e + i, t + r - s, e + i, t + r - a, e + i, 2, !0), this.v.setTripleAt(t - r + s, e + i, t - r + a, e + i, t - r + s, e + i, 3, !0), this.v.setTripleAt(t - r, e + i - s, t - r, e + i - s, t - r, e + i - a, 4, !0), this.v.setTripleAt(t - r, e - i + s, t - r, e - i + a, t - r, e - i + s, 5, !0), this.v.setTripleAt(t - r + s, e - i, t - r + s, e - i, t - r + a, e - i, 6, !0), this.v.setTripleAt(t + r - s, e - i, t + r - a, e - i, t + r - s, e - i, 7, !0)) : (this.v.setTripleAt(t - r, e + i, t - r + a, e + i, t - r, e + i, 2), this.v.setTripleAt(t - r, e - i, t - r, e - i + a, t - r, e - i, 3))) : (this.v.setTripleAt(t + r, e - i + s, t + r, e - i + a, t + r, e - i + s, 0, !0), 0 !== s ? (this.v.setTripleAt(t + r - s, e - i, t + r - s, e - i, t + r - a, e - i, 1, !0), this.v.setTripleAt(t - r + s, e - i, t - r + a, e - i, t - r + s, e - i, 2, !0), this.v.setTripleAt(t - r, e - i + s, t - r, e - i + s, t - r, e - i + a, 3, !0), this.v.setTripleAt(t - r, e + i - s, t - r, e + i - a, t - r, e + i - s, 4, !0), this.v.setTripleAt(t - r + s, e + i, t - r + s, e + i, t - r + a, e + i, 5, !0), this.v.setTripleAt(t + r - s, e + i, t + r - a, e + i, t + r - s, e + i, 6, !0), this.v.setTripleAt(t + r, e + i - s, t + r, e + i - s, t + r, e + i - a, 7, !0)) : (this.v.setTripleAt(t - r, e - i, t - r + a, e - i, t - r, e - i, 1, !0), this.v.setTripleAt(t - r, e + i, t - r, e + i - a, t - r, e + i, 2, !0), this.v.setTripleAt(t + r, e + i, t + r - a, e + i, t + r, e + i, 3, !0)))
						},
						getValue: function () {
							this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertRectToPath())
						},
						reset: i
					}, extendPrototype([DynamicPropertyContainer], t), t
				}();
			var m = {
				getShapeProp: function (t, e, r) {
					var i;
					return 3 === r || 4 === r ? i = (3 === r ? e.pt : e.ks).k.length ? new h(t, e, r) : new n(t, e, r) : 5 === r ? i = new f(t, e) : 6 === r ? i = new l(t, e) : 7 === r && (i = new p(t, e)), i.k && t.addDynamicProperty(i), i
				},
				getConstructorFunction: function () {
					return n
				},
				getKeyframedConstructorFunction: function () {
					return h
				}
			};
			return m
		}(),
		Matrix = function () {
			var t = Math.cos,
				e = Math.sin,
				r = Math.tan,
				i = Math.round;

			function s() {
				return this.props[0] = 1, this.props[1] = 0, this.props[2] = 0, this.props[3] = 0, this.props[4] = 0, this.props[5] = 1, this.props[6] = 0, this.props[7] = 0, this.props[8] = 0, this.props[9] = 0, this.props[10] = 1, this.props[11] = 0, this.props[12] = 0, this.props[13] = 0, this.props[14] = 0, this.props[15] = 1, this
			}

			function a(r) {
				if (0 === r) return this;
				var i = t(r),
					s = e(r);
				return this._t(i, -s, 0, 0, s, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
			}

			function n(r) {
				if (0 === r) return this;
				var i = t(r),
					s = e(r);
				return this._t(1, 0, 0, 0, 0, i, -s, 0, 0, s, i, 0, 0, 0, 0, 1)
			}

			function o(r) {
				if (0 === r) return this;
				var i = t(r),
					s = e(r);
				return this._t(i, 0, s, 0, 0, 1, 0, 0, -s, 0, i, 0, 0, 0, 0, 1)
			}

			function h(r) {
				if (0 === r) return this;
				var i = t(r),
					s = e(r);
				return this._t(i, -s, 0, 0, s, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
			}

			function l(t, e) {
				return this._t(1, e, t, 1, 0, 0)
			}

			function p(t, e) {
				return this.shear(r(t), r(e))
			}

			function f(i, s) {
				var a = t(s),
					n = e(s);
				return this._t(a, n, 0, 0, -n, a, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, r(i), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(a, -n, 0, 0, n, a, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
			}

			function m(t, e, r) {
				return r || 0 === r || (r = 1), 1 === t && 1 === e && 1 === r ? this : this._t(t, 0, 0, 0, 0, e, 0, 0, 0, 0, r, 0, 0, 0, 0, 1)
			}

			function c(t, e, r, i, s, a, n, o, h, l, p, f, m, c, d, u) {
				return this.props[0] = t, this.props[1] = e, this.props[2] = r, this.props[3] = i, this.props[4] = s, this.props[5] = a, this.props[6] = n, this.props[7] = o, this.props[8] = h, this.props[9] = l, this.props[10] = p, this.props[11] = f, this.props[12] = m, this.props[13] = c, this.props[14] = d, this.props[15] = u, this
			}

			function d(t, e, r) {
				return r = r || 0, 0 !== t || 0 !== e || 0 !== r ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, r, 1) : this
			}

			function u(t, e, r, i, s, a, n, o, h, l, p, f, m, c, d, u) {
				var y = this.props;
				if (1 === t && 0 === e && 0 === r && 0 === i && 0 === s && 1 === a && 0 === n && 0 === o && 0 === h && 0 === l && 1 === p && 0 === f) return y[12] = y[12] * t + y[15] * m, y[13] = y[13] * a + y[15] * c, y[14] = y[14] * p + y[15] * d, y[15] *= u, this._identityCalculated = !1, this;
				var g = y[0],
					v = y[1],
					b = y[2],
					P = y[3],
					x = y[4],
					E = y[5],
					S = y[6],
					C = y[7],
					_ = y[8],
					A = y[9],
					T = y[10],
					M = y[11],
					k = y[12],
					D = y[13],
					F = y[14],
					w = y[15];
				return y[0] = g * t + v * s + b * h + P * m, y[1] = g * e + v * a + b * l + P * c, y[2] = g * r + v * n + b * p + P * d, y[3] = g * i + v * o + b * f + P * u, y[4] = x * t + E * s + S * h + C * m, y[5] = x * e + E * a + S * l + C * c, y[6] = x * r + E * n + S * p + C * d, y[7] = x * i + E * o + S * f + C * u, y[8] = _ * t + A * s + T * h + M * m, y[9] = _ * e + A * a + T * l + M * c, y[10] = _ * r + A * n + T * p + M * d, y[11] = _ * i + A * o + T * f + M * u, y[12] = k * t + D * s + F * h + w * m, y[13] = k * e + D * a + F * l + w * c, y[14] = k * r + D * n + F * p + w * d, y[15] = k * i + D * o + F * f + w * u, this._identityCalculated = !1, this
			}

			function y() {
				return this._identityCalculated || (this._identity = !(1 !== this.props[0] || 0 !== this.props[1] || 0 !== this.props[2] || 0 !== this.props[3] || 0 !== this.props[4] || 1 !== this.props[5] || 0 !== this.props[6] || 0 !== this.props[7] || 0 !== this.props[8] || 0 !== this.props[9] || 1 !== this.props[10] || 0 !== this.props[11] || 0 !== this.props[12] || 0 !== this.props[13] || 0 !== this.props[14] || 1 !== this.props[15]), this._identityCalculated = !0), this._identity
			}

			function g(t) {
				for (var e = 0; e < 16;) {
					if (t.props[e] !== this.props[e]) return !1;
					e += 1
				}
				return !0
			}

			function v(t) {
				var e;
				for (e = 0; e < 16; e += 1) t.props[e] = this.props[e];
				return t
			}

			function b(t) {
				var e;
				for (e = 0; e < 16; e += 1) this.props[e] = t[e]
			}

			function P(t, e, r) {
				return {
					x: t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12],
					y: t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13],
					z: t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]
				}
			}

			function x(t, e, r) {
				return t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12]
			}

			function E(t, e, r) {
				return t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13]
			}

			function S(t, e, r) {
				return t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]
			}

			function C() {
				var t = this.props[0] * this.props[5] - this.props[1] * this.props[4],
					e = this.props[5] / t,
					r = -this.props[1] / t,
					i = -this.props[4] / t,
					s = this.props[0] / t,
					a = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / t,
					n = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / t,
					o = new Matrix;
				return o.props[0] = e, o.props[1] = r, o.props[4] = i, o.props[5] = s, o.props[12] = a, o.props[13] = n, o
			}

			function _(t) {
				return this.getInverseMatrix().applyToPointArray(t[0], t[1], t[2] || 0)
			}

			function A(t) {
				var e, r = t.length,
					i = [];
				for (e = 0; e < r; e += 1) i[e] = _(t[e]);
				return i
			}

			function T(t, e, r) {
				var i = createTypedArray("float32", 6);
				if (this.isIdentity()) i[0] = t[0], i[1] = t[1], i[2] = e[0], i[3] = e[1], i[4] = r[0], i[5] = r[1];
				else {
					var s = this.props[0],
						a = this.props[1],
						n = this.props[4],
						o = this.props[5],
						h = this.props[12],
						l = this.props[13];
					i[0] = t[0] * s + t[1] * n + h, i[1] = t[0] * a + t[1] * o + l, i[2] = e[0] * s + e[1] * n + h, i[3] = e[0] * a + e[1] * o + l, i[4] = r[0] * s + r[1] * n + h, i[5] = r[0] * a + r[1] * o + l
				}
				return i
			}

			function M(t, e, r) {
				return this.isIdentity() ? [t, e, r] : [t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12], t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13], t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]]
			}

			function k(t, e) {
				if (this.isIdentity()) return t + "," + e;
				var r = this.props;
				return Math.round(100 * (t * r[0] + e * r[4] + r[12])) / 100 + "," + Math.round(100 * (t * r[1] + e * r[5] + r[13])) / 100
			}

			function D() {
				for (var t = 0, e = this.props, r = "matrix3d("; t < 16;) r += i(1e4 * e[t]) / 1e4, r += 15 === t ? ")" : ",", t += 1;
				return r
			}

			function F(t) {
				return t < 1e-6 && t > 0 || t > -1e-6 && t < 0 ? i(1e4 * t) / 1e4 : t
			}

			function w() {
				var t = this.props;
				return "matrix(" + F(t[0]) + "," + F(t[1]) + "," + F(t[4]) + "," + F(t[5]) + "," + F(t[12]) + "," + F(t[13]) + ")"
			}
			return function () {
				this.reset = s, this.rotate = a, this.rotateX = n, this.rotateY = o, this.rotateZ = h, this.skew = p, this.skewFromAxis = f, this.shear = l, this.scale = m, this.setTransform = c, this.translate = d, this.transform = u, this.applyToPoint = P, this.applyToX = x, this.applyToY = E, this.applyToZ = S, this.applyToPointArray = M, this.applyToTriplePoints = T, this.applyToPointStringified = k, this.toCSS = D, this.to2dCSS = w, this.clone = v, this.cloneFromProps = b, this.equals = g, this.inversePoints = A, this.inversePoint = _, this.getInverseMatrix = C, this._t = this.transform, this.isIdentity = y, this._identity = !0, this._identityCalculated = !1, this.props = createTypedArray("float32", 16), this.reset()
			}
		}();

	function _typeof$3(t) {
		return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
			return typeof t
		} : function (t) {
			return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
		}, _typeof$3(t)
	}
	var lottie = {},
		standalone = "__[STANDALONE]__",
		animationData = "__[ANIMATIONDATA]__",
		renderer = "";

	function setLocation(t) {
		setLocationHref(t)
	}

	function searchAnimations() {
		!0 === standalone ? animationManager.searchAnimations(animationData, standalone, renderer) : animationManager.searchAnimations()
	}

	function setSubframeRendering(t) {
		setSubframeEnabled(t)
	}

	function setPrefix(t) {
		setIdPrefix(t)
	}

	function loadAnimation(t) {
		return !0 === standalone && (t.animationData = JSON.parse(animationData)), animationManager.loadAnimation(t)
	}

	function setQuality(t) {
		if ("string" == typeof t) switch (t) {
			case "high":
				setDefaultCurveSegments(200);
				break;
			default:
			case "medium":
				setDefaultCurveSegments(50);
				break;
			case "low":
				setDefaultCurveSegments(10)
		} else !isNaN(t) && t > 1 && setDefaultCurveSegments(t);
		getDefaultCurveSegments() >= 50 ? roundValues(!1) : roundValues(!0)
	}

	function inBrowser() {
		return "undefined" != typeof navigator
	}

	function installPlugin(t, e) {
		"expressions" === t && setExpressionsPlugin(e)
	}

	function getFactory(t) {
		switch (t) {
			case "propertyFactory":
				return PropertyFactory;
			case "shapePropertyFactory":
				return ShapePropertyFactory;
			case "matrix":
				return Matrix;
			default:
				return null
		}
	}

	function checkReady() {
		"complete" === document.readyState && (clearInterval(readyStateCheckInterval), searchAnimations())
	}

	function getQueryVariable(t) {
		for (var e = queryString.split("&"), r = 0; r < e.length; r += 1) {
			var i = e[r].split("=");
			if (decodeURIComponent(i[0]) == t) return decodeURIComponent(i[1])
		}
		return null
	}
	lottie.play = animationManager.play, lottie.pause = animationManager.pause, lottie.setLocationHref = setLocation, lottie.togglePause = animationManager.togglePause, lottie.setSpeed = animationManager.setSpeed, lottie.setDirection = animationManager.setDirection, lottie.stop = animationManager.stop, lottie.searchAnimations = searchAnimations, lottie.registerAnimation = animationManager.registerAnimation, lottie.loadAnimation = loadAnimation, lottie.setSubframeRendering = setSubframeRendering, lottie.resize = animationManager.resize, lottie.goToAndStop = animationManager.goToAndStop, lottie.destroy = animationManager.destroy, lottie.setQuality = setQuality, lottie.inBrowser = inBrowser, lottie.installPlugin = installPlugin, lottie.freeze = animationManager.freeze, lottie.unfreeze = animationManager.unfreeze, lottie.setVolume = animationManager.setVolume, lottie.mute = animationManager.mute, lottie.unmute = animationManager.unmute, lottie.getRegisteredAnimations = animationManager.getRegisteredAnimations, lottie.useWebWorker = setWebWorker, lottie.setIDPrefix = setPrefix, lottie.__getFactory = getFactory, lottie.version = "5.10.2";
	var queryString = "";
	if (standalone) {
		var scripts = document.getElementsByTagName("script"),
			index = scripts.length - 1,
			myScript = scripts[index] || {
				src: ""
			};
		queryString = myScript.src ? myScript.src.replace(/^[^\?]+\??/, "") : "", renderer = getQueryVariable("renderer")
	}
	var readyStateCheckInterval = setInterval(checkReady, 100);
	try {
		"object" === ("undefined" == typeof exports ? "undefined" : _typeof$3(exports)) && "undefined" != typeof module || "function" == typeof define && define.amd || (window.bodymovin = lottie)
	} catch (t) {}
	var ShapeModifiers = function () {
		var t = {},
			e = {};
		return t.registerModifier = function (t, r) {
			e[t] || (e[t] = r)
		}, t.getModifier = function (t, r, i) {
			return new e[t](r, i)
		}, t
	}();

	function ShapeModifier() {}

	function TrimModifier() {}

	function PuckerAndBloatModifier() {}
	ShapeModifier.prototype.initModifierProperties = function () {}, ShapeModifier.prototype.addShapeToModifier = function () {}, ShapeModifier.prototype.addShape = function (t) {
		if (!this.closed) {
			t.sh.container.addDynamicProperty(t.sh);
			var e = {
				shape: t.sh,
				data: t,
				localShapeCollection: shapeCollectionPool.newShapeCollection()
			};
			this.shapes.push(e), this.addShapeToModifier(e), this._isAnimated && t.setAsAnimated()
		}
	}, ShapeModifier.prototype.init = function (t, e) {
		this.shapes = [], this.elem = t, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e), this.frameId = initialDefaultFrame, this.closed = !1, this.k = !1, this.dynamicProperties.length ? this.k = !0 : this.getValue(!0)
	}, ShapeModifier.prototype.processKeys = function () {
		this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties())
	}, extendPrototype([DynamicPropertyContainer], ShapeModifier), extendPrototype([ShapeModifier], TrimModifier), TrimModifier.prototype.initModifierProperties = function (t, e) {
		this.s = PropertyFactory.getProp(t, e.s, 0, .01, this), this.e = PropertyFactory.getProp(t, e.e, 0, .01, this), this.o = PropertyFactory.getProp(t, e.o, 0, 0, this), this.sValue = 0, this.eValue = 0, this.getValue = this.processKeys, this.m = e.m, this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length
	}, TrimModifier.prototype.addShapeToModifier = function (t) {
		t.pathsData = []
	}, TrimModifier.prototype.calculateShapeEdges = function (t, e, r, i, s) {
		var a = [];
		e <= 1 ? a.push({
			s: t,
			e: e
		}) : t >= 1 ? a.push({
			s: t - 1,
			e: e - 1
		}) : (a.push({
			s: t,
			e: 1
		}), a.push({
			s: 0,
			e: e - 1
		}));
		var n, o, h = [],
			l = a.length;
		for (n = 0; n < l; n += 1) {
			var p, f;
			if (!((o = a[n]).e * s < i || o.s * s > i + r)) p = o.s * s <= i ? 0 : (o.s * s - i) / r, f = o.e * s >= i + r ? 1 : (o.e * s - i) / r, h.push([p, f])
		}
		return h.length || h.push([0, 0]), h
	}, TrimModifier.prototype.releasePathsData = function (t) {
		var e, r = t.length;
		for (e = 0; e < r; e += 1) segmentsLengthPool.release(t[e]);
		return t.length = 0, t
	}, TrimModifier.prototype.processShapes = function (t) {
		var e, r, i, s;
		if (this._mdf || t) {
			var a = this.o.v % 360 / 360;
			if (a < 0 && (a += 1), (e = this.s.v > 1 ? 1 + a : this.s.v < 0 ? 0 + a : this.s.v + a) > (r = this.e.v > 1 ? 1 + a : this.e.v < 0 ? 0 + a : this.e.v + a)) {
				var n = e;
				e = r, r = n
			}
			e = 1e-4 * Math.round(1e4 * e), r = 1e-4 * Math.round(1e4 * r), this.sValue = e, this.eValue = r
		} else e = this.sValue, r = this.eValue;
		var o, h, l, p, f, m = this.shapes.length,
			c = 0;
		if (r === e)
			for (s = 0; s < m; s += 1) this.shapes[s].localShapeCollection.releaseShapes(), this.shapes[s].shape._mdf = !0, this.shapes[s].shape.paths = this.shapes[s].localShapeCollection, this._mdf && (this.shapes[s].pathsData.length = 0);
		else if (1 === r && 0 === e || 0 === r && 1 === e) {
			if (this._mdf)
				for (s = 0; s < m; s += 1) this.shapes[s].pathsData.length = 0, this.shapes[s].shape._mdf = !0
		} else {
			var d, u, y = [];
			for (s = 0; s < m; s += 1)
				if ((d = this.shapes[s]).shape._mdf || this._mdf || t || 2 === this.m) {
					if (h = (i = d.shape.paths)._length, f = 0, !d.shape._mdf && d.pathsData.length) f = d.totalShapeLength;
					else {
						for (l = this.releasePathsData(d.pathsData), o = 0; o < h; o += 1) p = bez.getSegmentsLength(i.shapes[o]), l.push(p), f += p.totalLength;
						d.totalShapeLength = f, d.pathsData = l
					}
					c += f, d.shape._mdf = !0
				} else d.shape.paths = d.localShapeCollection;
			var g, v = e,
				b = r,
				P = 0;
			for (s = m - 1; s >= 0; s -= 1)
				if ((d = this.shapes[s]).shape._mdf) {
					for ((u = d.localShapeCollection).releaseShapes(), 2 === this.m && m > 1 ? (g = this.calculateShapeEdges(e, r, d.totalShapeLength, P, c), P += d.totalShapeLength) : g = [
							[v, b]
						], h = g.length, o = 0; o < h; o += 1) {
						v = g[o][0], b = g[o][1], y.length = 0, b <= 1 ? y.push({
							s: d.totalShapeLength * v,
							e: d.totalShapeLength * b
						}) : v >= 1 ? y.push({
							s: d.totalShapeLength * (v - 1),
							e: d.totalShapeLength * (b - 1)
						}) : (y.push({
							s: d.totalShapeLength * v,
							e: d.totalShapeLength
						}), y.push({
							s: 0,
							e: d.totalShapeLength * (b - 1)
						}));
						var x = this.addShapes(d, y[0]);
						if (y[0].s !== y[0].e) {
							if (y.length > 1)
								if (d.shape.paths.shapes[d.shape.paths._length - 1].c) {
									var E = x.pop();
									this.addPaths(x, u), x = this.addShapes(d, y[1], E)
								} else this.addPaths(x, u), x = this.addShapes(d, y[1]);
							this.addPaths(x, u)
						}
					}
					d.shape.paths = u
				}
		}
	}, TrimModifier.prototype.addPaths = function (t, e) {
		var r, i = t.length;
		for (r = 0; r < i; r += 1) e.addShape(t[r])
	}, TrimModifier.prototype.addSegment = function (t, e, r, i, s, a, n) {
		s.setXYAt(e[0], e[1], "o", a), s.setXYAt(r[0], r[1], "i", a + 1), n && s.setXYAt(t[0], t[1], "v", a), s.setXYAt(i[0], i[1], "v", a + 1)
	}, TrimModifier.prototype.addSegmentFromArray = function (t, e, r, i) {
		e.setXYAt(t[1], t[5], "o", r), e.setXYAt(t[2], t[6], "i", r + 1), i && e.setXYAt(t[0], t[4], "v", r), e.setXYAt(t[3], t[7], "v", r + 1)
	}, TrimModifier.prototype.addShapes = function (t, e, r) {
		var i, s, a, n, o, h, l, p, f = t.pathsData,
			m = t.shape.paths.shapes,
			c = t.shape.paths._length,
			d = 0,
			u = [],
			y = !0;
		for (r ? (o = r._length, p = r._length) : (r = shapePool.newElement(), o = 0, p = 0), u.push(r), i = 0; i < c; i += 1) {
			for (h = f[i].lengths, r.c = m[i].c, a = m[i].c ? h.length : h.length + 1, s = 1; s < a; s += 1)
				if (d + (n = h[s - 1]).addedLength < e.s) d += n.addedLength, r.c = !1;
				else {
					if (d > e.e) {
						r.c = !1;
						break
					}
					e.s <= d && e.e >= d + n.addedLength ? (this.addSegment(m[i].v[s - 1], m[i].o[s - 1], m[i].i[s], m[i].v[s], r, o, y), y = !1) : (l = bez.getNewSegment(m[i].v[s - 1], m[i].v[s], m[i].o[s - 1], m[i].i[s], (e.s - d) / n.addedLength, (e.e - d) / n.addedLength, h[s - 1]), this.addSegmentFromArray(l, r, o, y), y = !1, r.c = !1), d += n.addedLength, o += 1
				} if (m[i].c && h.length) {
				if (n = h[s - 1], d <= e.e) {
					var g = h[s - 1].addedLength;
					e.s <= d && e.e >= d + g ? (this.addSegment(m[i].v[s - 1], m[i].o[s - 1], m[i].i[0], m[i].v[0], r, o, y), y = !1) : (l = bez.getNewSegment(m[i].v[s - 1], m[i].v[0], m[i].o[s - 1], m[i].i[0], (e.s - d) / g, (e.e - d) / g, h[s - 1]), this.addSegmentFromArray(l, r, o, y), y = !1, r.c = !1)
				} else r.c = !1;
				d += n.addedLength, o += 1
			}
			if (r._length && (r.setXYAt(r.v[p][0], r.v[p][1], "i", p), r.setXYAt(r.v[r._length - 1][0], r.v[r._length - 1][1], "o", r._length - 1)), d > e.e) break;
			i < c - 1 && (r = shapePool.newElement(), y = !0, u.push(r), o = 0)
		}
		return u
	}, extendPrototype([ShapeModifier], PuckerAndBloatModifier), PuckerAndBloatModifier.prototype.initModifierProperties = function (t, e) {
		this.getValue = this.processKeys, this.amount = PropertyFactory.getProp(t, e.a, 0, null, this), this._isAnimated = !!this.amount.effectsSequence.length
	}, PuckerAndBloatModifier.prototype.processPath = function (t, e) {
		var r = e / 100,
			i = [0, 0],
			s = t._length,
			a = 0;
		for (a = 0; a < s; a += 1) i[0] += t.v[a][0], i[1] += t.v[a][1];
		i[0] /= s, i[1] /= s;
		var n, o, h, l, p, f, m = shapePool.newElement();
		for (m.c = t.c, a = 0; a < s; a += 1) n = t.v[a][0] + (i[0] - t.v[a][0]) * r, o = t.v[a][1] + (i[1] - t.v[a][1]) * r, h = t.o[a][0] + (i[0] - t.o[a][0]) * -r, l = t.o[a][1] + (i[1] - t.o[a][1]) * -r, p = t.i[a][0] + (i[0] - t.i[a][0]) * -r, f = t.i[a][1] + (i[1] - t.i[a][1]) * -r, m.setTripleAt(n, o, h, l, p, f, a);
		return m
	}, PuckerAndBloatModifier.prototype.processShapes = function (t) {
		var e, r, i, s, a, n, o = this.shapes.length,
			h = this.amount.v;
		if (0 !== h)
			for (r = 0; r < o; r += 1) {
				if (n = (a = this.shapes[r]).localShapeCollection, a.shape._mdf || this._mdf || t)
					for (n.releaseShapes(), a.shape._mdf = !0, e = a.shape.paths.shapes, s = a.shape.paths._length, i = 0; i < s; i += 1) n.addShape(this.processPath(e[i], h));
				a.shape.paths = a.localShapeCollection
			}
		this.dynamicProperties.length || (this._mdf = !1)
	};
	var TransformPropertyFactory = function () {
		var t = [0, 0];

		function e(t, e, r) {
			if (this.elem = t, this.frameId = -1, this.propType = "transform", this.data = e, this.v = new Matrix, this.pre = new Matrix, this.appliedTransformations = 0, this.initDynamicPropertyContainer(r || t), e.p && e.p.s ? (this.px = PropertyFactory.getProp(t, e.p.x, 0, 0, this), this.py = PropertyFactory.getProp(t, e.p.y, 0, 0, this), e.p.z && (this.pz = PropertyFactory.getProp(t, e.p.z, 0, 0, this))) : this.p = PropertyFactory.getProp(t, e.p || {
					k: [0, 0, 0]
				}, 1, 0, this), e.rx) {
				if (this.rx = PropertyFactory.getProp(t, e.rx, 0, degToRads, this), this.ry = PropertyFactory.getProp(t, e.ry, 0, degToRads, this), this.rz = PropertyFactory.getProp(t, e.rz, 0, degToRads, this), e.or.k[0].ti) {
					var i, s = e.or.k.length;
					for (i = 0; i < s; i += 1) e.or.k[i].to = null, e.or.k[i].ti = null
				}
				this.or = PropertyFactory.getProp(t, e.or, 1, degToRads, this), this.or.sh = !0
			} else this.r = PropertyFactory.getProp(t, e.r || {
				k: 0
			}, 0, degToRads, this);
			e.sk && (this.sk = PropertyFactory.getProp(t, e.sk, 0, degToRads, this), this.sa = PropertyFactory.getProp(t, e.sa, 0, degToRads, this)), this.a = PropertyFactory.getProp(t, e.a || {
				k: [0, 0, 0]
			}, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s || {
				k: [100, 100, 100]
			}, 1, .01, this), e.o ? this.o = PropertyFactory.getProp(t, e.o, 0, .01, t) : this.o = {
				_mdf: !1,
				v: 1
			}, this._isDirty = !0, this.dynamicProperties.length || this.getValue(!0)
		}
		return e.prototype = {
			applyToMatrix: function (t) {
				var e = this._mdf;
				this.iterateDynamicProperties(), this._mdf = this._mdf || e, this.a && t.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && t.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && t.skewFromAxis(-this.sk.v, this.sa.v), this.r ? t.rotate(-this.r.v) : t.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? this.data.p.z ? t.translate(this.px.v, this.py.v, -this.pz.v) : t.translate(this.px.v, this.py.v, 0) : t.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
			},
			getValue: function (e) {
				if (this.elem.globalData.frameId !== this.frameId) {
					if (this._isDirty && (this.precalculateMatrix(), this._isDirty = !1), this.iterateDynamicProperties(), this._mdf || e) {
						var r;
						if (this.v.cloneFromProps(this.pre.props), this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r && this.appliedTransformations < 4 ? this.v.rotate(-this.r.v) : !this.r && this.appliedTransformations < 4 && this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.autoOriented) {
							var i, s;
							if (r = this.elem.globalData.frameRate, this.p && this.p.keyframes && this.p.getValueAtTime) this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t ? (i = this.p.getValueAtTime((this.p.keyframes[0].t + .01) / r, 0), s = this.p.getValueAtTime(this.p.keyframes[0].t / r, 0)) : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t ? (i = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / r, 0), s = this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - .05) / r, 0)) : (i = this.p.pv, s = this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - .01) / r, this.p.offsetTime));
							else if (this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime) {
								i = [], s = [];
								var a = this.px,
									n = this.py;
								a._caching.lastFrame + a.offsetTime <= a.keyframes[0].t ? (i[0] = a.getValueAtTime((a.keyframes[0].t + .01) / r, 0), i[1] = n.getValueAtTime((n.keyframes[0].t + .01) / r, 0), s[0] = a.getValueAtTime(a.keyframes[0].t / r, 0), s[1] = n.getValueAtTime(n.keyframes[0].t / r, 0)) : a._caching.lastFrame + a.offsetTime >= a.keyframes[a.keyframes.length - 1].t ? (i[0] = a.getValueAtTime(a.keyframes[a.keyframes.length - 1].t / r, 0), i[1] = n.getValueAtTime(n.keyframes[n.keyframes.length - 1].t / r, 0), s[0] = a.getValueAtTime((a.keyframes[a.keyframes.length - 1].t - .01) / r, 0), s[1] = n.getValueAtTime((n.keyframes[n.keyframes.length - 1].t - .01) / r, 0)) : (i = [a.pv, n.pv], s[0] = a.getValueAtTime((a._caching.lastFrame + a.offsetTime - .01) / r, a.offsetTime), s[1] = n.getValueAtTime((n._caching.lastFrame + n.offsetTime - .01) / r, n.offsetTime))
							} else i = s = t;
							this.v.rotate(-Math.atan2(i[1] - s[1], i[0] - s[0]))
						}
						this.data.p && this.data.p.s ? this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
					}
					this.frameId = this.elem.globalData.frameId
				}
			},
			precalculateMatrix: function () {
				if (!this.a.k && (this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations = 1, !this.s.effectsSequence.length)) {
					if (this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.appliedTransformations = 2, this.sk) {
						if (this.sk.effectsSequence.length || this.sa.effectsSequence.length) return;
						this.pre.skewFromAxis(-this.sk.v, this.sa.v), this.appliedTransformations = 3
					}
					this.r ? this.r.effectsSequence.length || (this.pre.rotate(-this.r.v), this.appliedTransformations = 4) : this.rz.effectsSequence.length || this.ry.effectsSequence.length || this.rx.effectsSequence.length || this.or.effectsSequence.length || (this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.appliedTransformations = 4)
				}
			},
			autoOrient: function () {}
		}, extendPrototype([DynamicPropertyContainer], e), e.prototype.addDynamicProperty = function (t) {
			this._addDynamicProperty(t), this.elem.addDynamicProperty(t), this._isDirty = !0
		}, e.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty, {
			getTransformProperty: function (t, r, i) {
				return new e(t, r, i)
			}
		}
	}();

	function RepeaterModifier() {}

	function RoundCornersModifier() {}

	function floatEqual(t, e) {
		return 1e5 * Math.abs(t - e) <= Math.min(Math.abs(t), Math.abs(e))
	}

	function floatZero(t) {
		return Math.abs(t) <= 1e-5
	}

	function lerp(t, e, r) {
		return t * (1 - r) + e * r
	}

	function lerpPoint(t, e, r) {
		return [lerp(t[0], e[0], r), lerp(t[1], e[1], r)]
	}

	function quadRoots(t, e, r) {
		if (0 === t) return [];
		var i = e * e - 4 * t * r;
		if (i < 0) return [];
		var s = -e / (2 * t);
		if (0 === i) return [s];
		var a = Math.sqrt(i) / (2 * t);
		return [s - a, s + a]
	}

	function polynomialCoefficients(t, e, r, i) {
		return [3 * e - t - 3 * r + i, 3 * t - 6 * e + 3 * r, -3 * t + 3 * e, t]
	}

	function singlePoint(t) {
		return new PolynomialBezier(t, t, t, t, !1)
	}

	function PolynomialBezier(t, e, r, i, s) {
		s && pointEqual(t, e) && (e = lerpPoint(t, i, 1 / 3)), s && pointEqual(r, i) && (r = lerpPoint(t, i, 2 / 3));
		var a = polynomialCoefficients(t[0], e[0], r[0], i[0]),
			n = polynomialCoefficients(t[1], e[1], r[1], i[1]);
		this.a = [a[0], n[0]], this.b = [a[1], n[1]], this.c = [a[2], n[2]], this.d = [a[3], n[3]], this.points = [t, e, r, i]
	}

	function extrema(t, e) {
		var r = t.points[0][e],
			i = t.points[t.points.length - 1][e];
		if (r > i) {
			var s = i;
			i = r, r = s
		}
		for (var a = quadRoots(3 * t.a[e], 2 * t.b[e], t.c[e]), n = 0; n < a.length; n += 1)
			if (a[n] > 0 && a[n] < 1) {
				var o = t.point(a[n])[e];
				o < r ? r = o : o > i && (i = o)
			} return {
			min: r,
			max: i
		}
	}

	function intersectData(t, e, r) {
		var i = t.boundingBox();
		return {
			cx: i.cx,
			cy: i.cy,
			width: i.width,
			height: i.height,
			bez: t,
			t: (e + r) / 2,
			t1: e,
			t2: r
		}
	}

	function splitData(t) {
		var e = t.bez.split(.5);
		return [intersectData(e[0], t.t1, t.t), intersectData(e[1], t.t, t.t2)]
	}

	function boxIntersect(t, e) {
		return 2 * Math.abs(t.cx - e.cx) < t.width + e.width && 2 * Math.abs(t.cy - e.cy) < t.height + e.height
	}

	function intersectsImpl(t, e, r, i, s, a) {
		if (boxIntersect(t, e))
			if (r >= a || t.width <= i && t.height <= i && e.width <= i && e.height <= i) s.push([t.t, e.t]);
			else {
				var n = splitData(t),
					o = splitData(e);
				intersectsImpl(n[0], o[0], r + 1, i, s, a), intersectsImpl(n[0], o[1], r + 1, i, s, a), intersectsImpl(n[1], o[0], r + 1, i, s, a), intersectsImpl(n[1], o[1], r + 1, i, s, a)
			}
	}

	function crossProduct(t, e) {
		return [t[1] * e[2] - t[2] * e[1], t[2] * e[0] - t[0] * e[2], t[0] * e[1] - t[1] * e[0]]
	}

	function lineIntersection(t, e, r, i) {
		var s = [t[0], t[1], 1],
			a = [e[0], e[1], 1],
			n = [r[0], r[1], 1],
			o = [i[0], i[1], 1],
			h = crossProduct(crossProduct(s, a), crossProduct(n, o));
		return floatZero(h[2]) ? null : [h[0] / h[2], h[1] / h[2]]
	}

	function polarOffset(t, e, r) {
		return [t[0] + Math.cos(e) * r, t[1] - Math.sin(e) * r]
	}

	function pointDistance(t, e) {
		return Math.hypot(t[0] - e[0], t[1] - e[1])
	}

	function pointEqual(t, e) {
		return floatEqual(t[0], e[0]) && floatEqual(t[1], e[1])
	}

	function ZigZagModifier() {}

	function setPoint(t, e, r, i, s, a, n) {
		var o = r - Math.PI / 2,
			h = r + Math.PI / 2,
			l = e[0] + Math.cos(r) * i * s,
			p = e[1] - Math.sin(r) * i * s;
		t.setTripleAt(l, p, l + Math.cos(o) * a, p - Math.sin(o) * a, l + Math.cos(h) * n, p - Math.sin(h) * n, t.length())
	}

	function getPerpendicularVector(t, e) {
		var r = [e[0] - t[0], e[1] - t[1]],
			i = .5 * -Math.PI;
		return [Math.cos(i) * r[0] - Math.sin(i) * r[1], Math.sin(i) * r[0] + Math.cos(i) * r[1]]
	}

	function getProjectingAngle(t, e) {
		var r = 0 === e ? t.length() - 1 : e - 1,
			i = (e + 1) % t.length(),
			s = getPerpendicularVector(t.v[r], t.v[i]);
		return Math.atan2(0, 1) - Math.atan2(s[1], s[0])
	}

	function zigZagCorner(t, e, r, i, s, a, n) {
		var o = getProjectingAngle(e, r),
			h = e.v[r % e._length],
			l = e.v[0 === r ? e._length - 1 : r - 1],
			p = e.v[(r + 1) % e._length],
			f = 2 === a ? Math.sqrt(Math.pow(h[0] - l[0], 2) + Math.pow(h[1] - l[1], 2)) : 0,
			m = 2 === a ? Math.sqrt(Math.pow(h[0] - p[0], 2) + Math.pow(h[1] - p[1], 2)) : 0;
		setPoint(t, e.v[r % e._length], o, n, i, m / (2 * (s + 1)), f / (2 * (s + 1)), a)
	}

	function zigZagSegment(t, e, r, i, s, a) {
		for (var n = 0; n < i; n += 1) {
			var o = (n + 1) / (i + 1),
				h = 2 === s ? Math.sqrt(Math.pow(e.points[3][0] - e.points[0][0], 2) + Math.pow(e.points[3][1] - e.points[0][1], 2)) : 0,
				l = e.normalAngle(o);
			setPoint(t, e.point(o), l, a, r, h / (2 * (i + 1)), h / (2 * (i + 1)), s), a = -a
		}
		return a
	}

	function linearOffset(t, e, r) {
		var i = Math.atan2(e[0] - t[0], e[1] - t[1]);
		return [polarOffset(t, i, r), polarOffset(e, i, r)]
	}

	function offsetSegment(t, e) {
		var r, i, s, a, n, o, h;
		r = (h = linearOffset(t.points[0], t.points[1], e))[0], i = h[1], s = (h = linearOffset(t.points[1], t.points[2], e))[0], a = h[1], n = (h = linearOffset(t.points[2], t.points[3], e))[0], o = h[1];
		var l = lineIntersection(r, i, s, a);
		null === l && (l = i);
		var p = lineIntersection(n, o, s, a);
		return null === p && (p = n), new PolynomialBezier(r, l, p, o)
	}

	function joinLines(t, e, r, i, s) {
		var a = e.points[3],
			n = r.points[0];
		if (3 === i) return a;
		if (pointEqual(a, n)) return a;
		if (2 === i) {
			var o = -e.tangentAngle(1),
				h = -r.tangentAngle(0) + Math.PI,
				l = lineIntersection(a, polarOffset(a, o + Math.PI / 2, 100), n, polarOffset(n, o + Math.PI / 2, 100)),
				p = l ? pointDistance(l, a) : pointDistance(a, n) / 2,
				f = polarOffset(a, o, 2 * p * roundCorner);
			return t.setXYAt(f[0], f[1], "o", t.length() - 1), f = polarOffset(n, h, 2 * p * roundCorner), t.setTripleAt(n[0], n[1], n[0], n[1], f[0], f[1], t.length()), n
		}
		var m = lineIntersection(pointEqual(a, e.points[2]) ? e.points[0] : e.points[2], a, n, pointEqual(n, r.points[1]) ? r.points[3] : r.points[1]);
		return m && pointDistance(m, a) < s ? (t.setTripleAt(m[0], m[1], m[0], m[1], m[0], m[1], t.length()), m) : a
	}

	function getIntersection(t, e) {
		var r = t.intersections(e);
		return r.length && floatEqual(r[0][0], 1) && r.shift(), r.length ? r[0] : null
	}

	function pruneSegmentIntersection(t, e) {
		var r = t.slice(),
			i = e.slice(),
			s = getIntersection(t[t.length - 1], e[0]);
		return s && (r[t.length - 1] = t[t.length - 1].split(s[0])[0], i[0] = e[0].split(s[1])[1]), t.length > 1 && e.length > 1 && (s = getIntersection(t[0], e[e.length - 1])) ? [
			[t[0].split(s[0])[0]],
			[e[e.length - 1].split(s[1])[1]]
		] : [r, i]
	}

	function pruneIntersections(t) {
		for (var e, r = 1; r < t.length; r += 1) e = pruneSegmentIntersection(t[r - 1], t[r]), t[r - 1] = e[0], t[r] = e[1];
		return t.length > 1 && (e = pruneSegmentIntersection(t[t.length - 1], t[0]), t[t.length - 1] = e[0], t[0] = e[1]), t
	}

	function offsetSegmentSplit(t, e) {
		var r, i, s, a, n = t.inflectionPoints();
		if (0 === n.length) return [offsetSegment(t, e)];
		if (1 === n.length || floatEqual(n[1], 1)) return r = (s = t.split(n[0]))[0], i = s[1], [offsetSegment(r, e), offsetSegment(i, e)];
		r = (s = t.split(n[0]))[0];
		var o = (n[1] - n[0]) / (1 - n[0]);
		return a = (s = s[1].split(o))[0], i = s[1], [offsetSegment(r, e), offsetSegment(a, e), offsetSegment(i, e)]
	}

	function OffsetPathModifier() {}

	function getFontProperties(t) {
		for (var e = t.fStyle ? t.fStyle.split(" ") : [], r = "normal", i = "normal", s = e.length, a = 0; a < s; a += 1) switch (e[a].toLowerCase()) {
			case "italic":
				i = "italic";
				break;
			case "bold":
				r = "700";
				break;
			case "black":
				r = "900";
				break;
			case "medium":
				r = "500";
				break;
			case "regular":
			case "normal":
				r = "400";
				break;
			case "light":
			case "thin":
				r = "200"
		}
		return {
			style: i,
			weight: t.fWeight || r
		}
	}
	extendPrototype([ShapeModifier], RepeaterModifier), RepeaterModifier.prototype.initModifierProperties = function (t, e) {
		this.getValue = this.processKeys, this.c = PropertyFactory.getProp(t, e.c, 0, null, this), this.o = PropertyFactory.getProp(t, e.o, 0, null, this), this.tr = TransformPropertyFactory.getTransformProperty(t, e.tr, this), this.so = PropertyFactory.getProp(t, e.tr.so, 0, .01, this), this.eo = PropertyFactory.getProp(t, e.tr.eo, 0, .01, this), this.data = e, this.dynamicProperties.length || this.getValue(!0), this._isAnimated = !!this.dynamicProperties.length, this.pMatrix = new Matrix, this.rMatrix = new Matrix, this.sMatrix = new Matrix, this.tMatrix = new Matrix, this.matrix = new Matrix
	}, RepeaterModifier.prototype.applyTransforms = function (t, e, r, i, s, a) {
		var n = a ? -1 : 1,
			o = i.s.v[0] + (1 - i.s.v[0]) * (1 - s),
			h = i.s.v[1] + (1 - i.s.v[1]) * (1 - s);
		t.translate(i.p.v[0] * n * s, i.p.v[1] * n * s, i.p.v[2]), e.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), e.rotate(-i.r.v * n * s), e.translate(i.a.v[0], i.a.v[1], i.a.v[2]), r.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), r.scale(a ? 1 / o : o, a ? 1 / h : h), r.translate(i.a.v[0], i.a.v[1], i.a.v[2])
	}, RepeaterModifier.prototype.init = function (t, e, r, i) {
		for (this.elem = t, this.arr = e, this.pos = r, this.elemsData = i, this._currentCopies = 0, this._elements = [], this._groups = [], this.frameId = -1, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e[r]); r > 0;) r -= 1, this._elements.unshift(e[r]);
		this.dynamicProperties.length ? this.k = !0 : this.getValue(!0)
	}, RepeaterModifier.prototype.resetElements = function (t) {
		var e, r = t.length;
		for (e = 0; e < r; e += 1) t[e]._processed = !1, "gr" === t[e].ty && this.resetElements(t[e].it)
	}, RepeaterModifier.prototype.cloneElements = function (t) {
		var e = JSON.parse(JSON.stringify(t));
		return this.resetElements(e), e
	}, RepeaterModifier.prototype.changeGroupRender = function (t, e) {
		var r, i = t.length;
		for (r = 0; r < i; r += 1) t[r]._render = e, "gr" === t[r].ty && this.changeGroupRender(t[r].it, e)
	}, RepeaterModifier.prototype.processShapes = function (t) {
		var e, r, i, s, a, n = !1;
		if (this._mdf || t) {
			var o, h = Math.ceil(this.c.v);
			if (this._groups.length < h) {
				for (; this._groups.length < h;) {
					var l = {
						it: this.cloneElements(this._elements),
						ty: "gr"
					};
					l.it.push({
						a: {
							a: 0,
							ix: 1,
							k: [0, 0]
						},
						nm: "Transform",
						o: {
							a: 0,
							ix: 7,
							k: 100
						},
						p: {
							a: 0,
							ix: 2,
							k: [0, 0]
						},
						r: {
							a: 1,
							ix: 6,
							k: [{
								s: 0,
								e: 0,
								t: 0
							}, {
								s: 0,
								e: 0,
								t: 1
							}]
						},
						s: {
							a: 0,
							ix: 3,
							k: [100, 100]
						},
						sa: {
							a: 0,
							ix: 5,
							k: 0
						},
						sk: {
							a: 0,
							ix: 4,
							k: 0
						},
						ty: "tr"
					}), this.arr.splice(0, 0, l), this._groups.splice(0, 0, l), this._currentCopies += 1
				}
				this.elem.reloadShapes(), n = !0
			}
			for (a = 0, i = 0; i <= this._groups.length - 1; i += 1) {
				if (o = a < h, this._groups[i]._render = o, this.changeGroupRender(this._groups[i].it, o), !o) {
					var p = this.elemsData[i].it,
						f = p[p.length - 1];
					0 !== f.transform.op.v ? (f.transform.op._mdf = !0, f.transform.op.v = 0) : f.transform.op._mdf = !1
				}
				a += 1
			}
			this._currentCopies = h;
			var m = this.o.v,
				c = m % 1,
				d = m > 0 ? Math.floor(m) : Math.ceil(m),
				u = this.pMatrix.props,
				y = this.rMatrix.props,
				g = this.sMatrix.props;
			this.pMatrix.reset(), this.rMatrix.reset(), this.sMatrix.reset(), this.tMatrix.reset(), this.matrix.reset();
			var v, b, P = 0;
			if (m > 0) {
				for (; P < d;) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), P += 1;
				c && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, c, !1), P += c)
			} else if (m < 0) {
				for (; P > d;) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !0), P -= 1;
				c && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -c, !0), P -= c)
			}
			for (i = 1 === this.data.m ? 0 : this._currentCopies - 1, s = 1 === this.data.m ? 1 : -1, a = this._currentCopies; a;) {
				if (b = (r = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v.props).length, e[e.length - 1].transform.mProps._mdf = !0, e[e.length - 1].transform.op._mdf = !0, e[e.length - 1].transform.op.v = 1 === this._currentCopies ? this.so.v : this.so.v + (this.eo.v - this.so.v) * (i / (this._currentCopies - 1)), 0 !== P) {
					for ((0 !== i && 1 === s || i !== this._currentCopies - 1 && -1 === s) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), this.matrix.transform(y[0], y[1], y[2], y[3], y[4], y[5], y[6], y[7], y[8], y[9], y[10], y[11], y[12], y[13], y[14], y[15]), this.matrix.transform(g[0], g[1], g[2], g[3], g[4], g[5], g[6], g[7], g[8], g[9], g[10], g[11], g[12], g[13], g[14], g[15]), this.matrix.transform(u[0], u[1], u[2], u[3], u[4], u[5], u[6], u[7], u[8], u[9], u[10], u[11], u[12], u[13], u[14], u[15]), v = 0; v < b; v += 1) r[v] = this.matrix.props[v];
					this.matrix.reset()
				} else
					for (this.matrix.reset(), v = 0; v < b; v += 1) r[v] = this.matrix.props[v];
				P += 1, a -= 1, i += s
			}
		} else
			for (a = this._currentCopies, i = 0, s = 1; a;) r = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v.props, e[e.length - 1].transform.mProps._mdf = !1, e[e.length - 1].transform.op._mdf = !1, a -= 1, i += s;
		return n
	}, RepeaterModifier.prototype.addShape = function () {}, extendPrototype([ShapeModifier], RoundCornersModifier), RoundCornersModifier.prototype.initModifierProperties = function (t, e) {
		this.getValue = this.processKeys, this.rd = PropertyFactory.getProp(t, e.r, 0, null, this), this._isAnimated = !!this.rd.effectsSequence.length
	}, RoundCornersModifier.prototype.processPath = function (t, e) {
		var r, i = shapePool.newElement();
		i.c = t.c;
		var s, a, n, o, h, l, p, f, m, c, d, u, y = t._length,
			g = 0;
		for (r = 0; r < y; r += 1) s = t.v[r], n = t.o[r], a = t.i[r], s[0] === n[0] && s[1] === n[1] && s[0] === a[0] && s[1] === a[1] ? 0 !== r && r !== y - 1 || t.c ? (o = 0 === r ? t.v[y - 1] : t.v[r - 1], l = (h = Math.sqrt(Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0, p = d = s[0] + (o[0] - s[0]) * l, f = u = s[1] - (s[1] - o[1]) * l, m = p - (p - s[0]) * roundCorner, c = f - (f - s[1]) * roundCorner, i.setTripleAt(p, f, m, c, d, u, g), g += 1, o = r === y - 1 ? t.v[0] : t.v[r + 1], l = (h = Math.sqrt(Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0, p = m = s[0] + (o[0] - s[0]) * l, f = c = s[1] + (o[1] - s[1]) * l, d = p - (p - s[0]) * roundCorner, u = f - (f - s[1]) * roundCorner, i.setTripleAt(p, f, m, c, d, u, g), g += 1) : (i.setTripleAt(s[0], s[1], n[0], n[1], a[0], a[1], g), g += 1) : (i.setTripleAt(t.v[r][0], t.v[r][1], t.o[r][0], t.o[r][1], t.i[r][0], t.i[r][1], g), g += 1);
		return i
	}, RoundCornersModifier.prototype.processShapes = function (t) {
		var e, r, i, s, a, n, o = this.shapes.length,
			h = this.rd.v;
		if (0 !== h)
			for (r = 0; r < o; r += 1) {
				if (n = (a = this.shapes[r]).localShapeCollection, a.shape._mdf || this._mdf || t)
					for (n.releaseShapes(), a.shape._mdf = !0, e = a.shape.paths.shapes, s = a.shape.paths._length, i = 0; i < s; i += 1) n.addShape(this.processPath(e[i], h));
				a.shape.paths = a.localShapeCollection
			}
		this.dynamicProperties.length || (this._mdf = !1)
	}, PolynomialBezier.prototype.point = function (t) {
		return [((this.a[0] * t + this.b[0]) * t + this.c[0]) * t + this.d[0], ((this.a[1] * t + this.b[1]) * t + this.c[1]) * t + this.d[1]]
	}, PolynomialBezier.prototype.derivative = function (t) {
		return [(3 * t * this.a[0] + 2 * this.b[0]) * t + this.c[0], (3 * t * this.a[1] + 2 * this.b[1]) * t + this.c[1]]
	}, PolynomialBezier.prototype.tangentAngle = function (t) {
		var e = this.derivative(t);
		return Math.atan2(e[1], e[0])
	}, PolynomialBezier.prototype.normalAngle = function (t) {
		var e = this.derivative(t);
		return Math.atan2(e[0], e[1])
	}, PolynomialBezier.prototype.inflectionPoints = function () {
		var t = this.a[1] * this.b[0] - this.a[0] * this.b[1];
		if (floatZero(t)) return [];
		var e = -.5 * (this.a[1] * this.c[0] - this.a[0] * this.c[1]) / t,
			r = e * e - 1 / 3 * (this.b[1] * this.c[0] - this.b[0] * this.c[1]) / t;
		if (r < 0) return [];
		var i = Math.sqrt(r);
		return floatZero(i) ? i > 0 && i < 1 ? [e] : [] : [e - i, e + i].filter((function (t) {
			return t > 0 && t < 1
		}))
	}, PolynomialBezier.prototype.split = function (t) {
		if (t <= 0) return [singlePoint(this.points[0]), this];
		if (t >= 1) return [this, singlePoint(this.points[this.points.length - 1])];
		var e = lerpPoint(this.points[0], this.points[1], t),
			r = lerpPoint(this.points[1], this.points[2], t),
			i = lerpPoint(this.points[2], this.points[3], t),
			s = lerpPoint(e, r, t),
			a = lerpPoint(r, i, t),
			n = lerpPoint(s, a, t);
		return [new PolynomialBezier(this.points[0], e, s, n, !0), new PolynomialBezier(n, a, i, this.points[3], !0)]
	}, PolynomialBezier.prototype.bounds = function () {
		return {
			x: extrema(this, 0),
			y: extrema(this, 1)
		}
	}, PolynomialBezier.prototype.boundingBox = function () {
		var t = this.bounds();
		return {
			left: t.x.min,
			right: t.x.max,
			top: t.y.min,
			bottom: t.y.max,
			width: t.x.max - t.x.min,
			height: t.y.max - t.y.min,
			cx: (t.x.max + t.x.min) / 2,
			cy: (t.y.max + t.y.min) / 2
		}
	}, PolynomialBezier.prototype.intersections = function (t, e, r) {
		void 0 === e && (e = 2), void 0 === r && (r = 7);
		var i = [];
		return intersectsImpl(intersectData(this, 0, 1), intersectData(t, 0, 1), 0, e, i, r), i
	}, PolynomialBezier.shapeSegment = function (t, e) {
		var r = (e + 1) % t.length();
		return new PolynomialBezier(t.v[e], t.o[e], t.i[r], t.v[r], !0)
	}, PolynomialBezier.shapeSegmentInverted = function (t, e) {
		var r = (e + 1) % t.length();
		return new PolynomialBezier(t.v[r], t.i[r], t.o[e], t.v[e], !0)
	}, extendPrototype([ShapeModifier], ZigZagModifier), ZigZagModifier.prototype.initModifierProperties = function (t, e) {
		this.getValue = this.processKeys, this.amplitude = PropertyFactory.getProp(t, e.s, 0, null, this), this.frequency = PropertyFactory.getProp(t, e.r, 0, null, this), this.pointsType = PropertyFactory.getProp(t, e.pt, 0, null, this), this._isAnimated = 0 !== this.amplitude.effectsSequence.length || 0 !== this.frequency.effectsSequence.length || 0 !== this.pointsType.effectsSequence.length
	}, ZigZagModifier.prototype.processPath = function (t, e, r, i) {
		var s = t._length,
			a = shapePool.newElement();
		if (a.c = t.c, t.c || (s -= 1), 0 === s) return a;
		var n = -1,
			o = PolynomialBezier.shapeSegment(t, 0);
		zigZagCorner(a, t, 0, e, r, i, n);
		for (var h = 0; h < s; h += 1) n = zigZagSegment(a, o, e, r, i, -n), o = h !== s - 1 || t.c ? PolynomialBezier.shapeSegment(t, (h + 1) % s) : null, zigZagCorner(a, t, h + 1, e, r, i, n);
		return a
	}, ZigZagModifier.prototype.processShapes = function (t) {
		var e, r, i, s, a, n, o = this.shapes.length,
			h = this.amplitude.v,
			l = Math.max(0, Math.round(this.frequency.v)),
			p = this.pointsType.v;
		if (0 !== h)
			for (r = 0; r < o; r += 1) {
				if (n = (a = this.shapes[r]).localShapeCollection, a.shape._mdf || this._mdf || t)
					for (n.releaseShapes(), a.shape._mdf = !0, e = a.shape.paths.shapes, s = a.shape.paths._length, i = 0; i < s; i += 1) n.addShape(this.processPath(e[i], h, l, p));
				a.shape.paths = a.localShapeCollection
			}
		this.dynamicProperties.length || (this._mdf = !1)
	}, extendPrototype([ShapeModifier], OffsetPathModifier), OffsetPathModifier.prototype.initModifierProperties = function (t, e) {
		this.getValue = this.processKeys, this.amount = PropertyFactory.getProp(t, e.a, 0, null, this), this.miterLimit = PropertyFactory.getProp(t, e.ml, 0, null, this), this.lineJoin = e.lj, this._isAnimated = 0 !== this.amount.effectsSequence.length
	}, OffsetPathModifier.prototype.processPath = function (t, e, r, i) {
		var s = shapePool.newElement();
		s.c = t.c;
		var a, n, o, h = t.length();
		t.c || (h -= 1);
		var l = [];
		for (a = 0; a < h; a += 1) o = PolynomialBezier.shapeSegment(t, a), l.push(offsetSegmentSplit(o, e));
		if (!t.c)
			for (a = h - 1; a >= 0; a -= 1) o = PolynomialBezier.shapeSegmentInverted(t, a), l.push(offsetSegmentSplit(o, e));
		l = pruneIntersections(l);
		var p = null,
			f = null;
		for (a = 0; a < l.length; a += 1) {
			var m = l[a];
			for (f && (p = joinLines(s, f, m[0], r, i)), f = m[m.length - 1], n = 0; n < m.length; n += 1) o = m[n], p && pointEqual(o.points[0], p) ? s.setXYAt(o.points[1][0], o.points[1][1], "o", s.length() - 1) : s.setTripleAt(o.points[0][0], o.points[0][1], o.points[1][0], o.points[1][1], o.points[0][0], o.points[0][1], s.length()), s.setTripleAt(o.points[3][0], o.points[3][1], o.points[3][0], o.points[3][1], o.points[2][0], o.points[2][1], s.length()), p = o.points[3]
		}
		return l.length && joinLines(s, f, l[0][0], r, i), s
	}, OffsetPathModifier.prototype.processShapes = function (t) {
		var e, r, i, s, a, n, o = this.shapes.length,
			h = this.amount.v,
			l = this.miterLimit.v,
			p = this.lineJoin;
		if (0 !== h)
			for (r = 0; r < o; r += 1) {
				if (n = (a = this.shapes[r]).localShapeCollection, a.shape._mdf || this._mdf || t)
					for (n.releaseShapes(), a.shape._mdf = !0, e = a.shape.paths.shapes, s = a.shape.paths._length, i = 0; i < s; i += 1) n.addShape(this.processPath(e[i], h, p, l));
				a.shape.paths = a.localShapeCollection
			}
		this.dynamicProperties.length || (this._mdf = !1)
	};
	var FontManager = function () {
		var t = {
				w: 0,
				size: 0,
				shapes: [],
				data: {
					shapes: []
				}
			},
			e = [];
		e = e.concat([2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403]);
		var r = ["d83cdffb", "d83cdffc", "d83cdffd", "d83cdffe", "d83cdfff"],
			i = [65039, 8205];

		function s(t, e) {
			var r = createTag("span");
			r.setAttribute("aria-hidden", !0), r.style.fontFamily = e;
			var i = createTag("span");
			i.innerText = "giItT1WQy@!-/#", r.style.position = "absolute", r.style.left = "-10000px", r.style.top = "-10000px", r.style.fontSize = "300px", r.style.fontVariant = "normal", r.style.fontStyle = "normal", r.style.fontWeight = "normal", r.style.letterSpacing = "0", r.appendChild(i), document.body.appendChild(r);
			var s = i.offsetWidth;
			return i.style.fontFamily = function (t) {
				var e, r = t.split(","),
					i = r.length,
					s = [];
				for (e = 0; e < i; e += 1) "sans-serif" !== r[e] && "monospace" !== r[e] && s.push(r[e]);
				return s.join(",")
			}(t) + ", " + e, {
				node: i,
				w: s,
				parent: r
			}
		}

		function a(t, e) {
			var r, i = document.body && e ? "svg" : "canvas",
				s = getFontProperties(t);
			if ("svg" === i) {
				var a = createNS("text");
				a.style.fontSize = "100px", a.setAttribute("font-family", t.fFamily), a.setAttribute("font-style", s.style), a.setAttribute("font-weight", s.weight), a.textContent = "1", t.fClass ? (a.style.fontFamily = "inherit", a.setAttribute("class", t.fClass)) : a.style.fontFamily = t.fFamily, e.appendChild(a), r = a
			} else {
				var n = new OffscreenCanvas(500, 500).getContext("2d");
				n.font = s.style + " " + s.weight + " 100px " + t.fFamily, r = n
			}
			return {
				measureText: function (t) {
					return "svg" === i ? (r.textContent = t, r.getComputedTextLength()) : r.measureText(t).width
				}
			}
		}
		var n = function () {
			this.fonts = [], this.chars = null, this.typekitLoaded = 0, this.isLoaded = !1, this._warned = !1, this.initTime = Date.now(), this.setIsLoadedBinded = this.setIsLoaded.bind(this), this.checkLoadedFontsBinded = this.checkLoadedFonts.bind(this)
		};
		n.isModifier = function (t, e) {
			var i = t.toString(16) + e.toString(16);
			return -1 !== r.indexOf(i)
		}, n.isZeroWidthJoiner = function (t, e) {
			return e ? t === i[0] && e === i[1] : t === i[1]
		}, n.isCombinedCharacter = function (t) {
			return -1 !== e.indexOf(t)
		};
		var o = {
			addChars: function (t) {
				if (t) {
					var e;
					this.chars || (this.chars = []);
					var r, i, s = t.length,
						a = this.chars.length;
					for (e = 0; e < s; e += 1) {
						for (r = 0, i = !1; r < a;) this.chars[r].style === t[e].style && this.chars[r].fFamily === t[e].fFamily && this.chars[r].ch === t[e].ch && (i = !0), r += 1;
						i || (this.chars.push(t[e]), a += 1)
					}
				}
			},
			addFonts: function (t, e) {
				if (t) {
					if (this.chars) return this.isLoaded = !0, void(this.fonts = t.list);
					if (!document.body) return this.isLoaded = !0, t.list.forEach((function (t) {
						t.helper = a(t), t.cache = {}
					})), void(this.fonts = t.list);
					var r, i = t.list,
						n = i.length,
						o = n;
					for (r = 0; r < n; r += 1) {
						var h, l, p = !0;
						if (i[r].loaded = !1, i[r].monoCase = s(i[r].fFamily, "monospace"), i[r].sansCase = s(i[r].fFamily, "sans-serif"), i[r].fPath) {
							if ("p" === i[r].fOrigin || 3 === i[r].origin) {
								if ((h = document.querySelectorAll('style[f-forigin="p"][f-family="' + i[r].fFamily + '"], style[f-origin="3"][f-family="' + i[r].fFamily + '"]')).length > 0 && (p = !1), p) {
									var f = createTag("style");
									f.setAttribute("f-forigin", i[r].fOrigin), f.setAttribute("f-origin", i[r].origin), f.setAttribute("f-family", i[r].fFamily), f.type = "text/css", f.innerText = "@font-face {font-family: " + i[r].fFamily + "; font-style: normal; src: url('" + i[r].fPath + "');}", e.appendChild(f)
								}
							} else if ("g" === i[r].fOrigin || 1 === i[r].origin) {
								for (h = document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'), l = 0; l < h.length; l += 1) - 1 !== h[l].href.indexOf(i[r].fPath) && (p = !1);
								if (p) {
									var m = createTag("link");
									m.setAttribute("f-forigin", i[r].fOrigin), m.setAttribute("f-origin", i[r].origin), m.type = "text/css", m.rel = "stylesheet", m.href = i[r].fPath, document.body.appendChild(m)
								}
							} else if ("t" === i[r].fOrigin || 2 === i[r].origin) {
								for (h = document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'), l = 0; l < h.length; l += 1) i[r].fPath === h[l].src && (p = !1);
								if (p) {
									var c = createTag("link");
									c.setAttribute("f-forigin", i[r].fOrigin), c.setAttribute("f-origin", i[r].origin), c.setAttribute("rel", "stylesheet"), c.setAttribute("href", i[r].fPath), e.appendChild(c)
								}
							}
						} else i[r].loaded = !0, o -= 1;
						i[r].helper = a(i[r], e), i[r].cache = {}, this.fonts.push(i[r])
					}
					0 === o ? this.isLoaded = !0 : setTimeout(this.checkLoadedFonts.bind(this), 100)
				} else this.isLoaded = !0
			},
			getCharData: function (e, r, i) {
				for (var s = 0, a = this.chars.length; s < a;) {
					if (this.chars[s].ch === e && this.chars[s].style === r && this.chars[s].fFamily === i) return this.chars[s];
					s += 1
				}
				return ("string" == typeof e && 13 !== e.charCodeAt(0) || !e) && console && console.warn && !this._warned && (this._warned = !0, console.warn("Missing character from exported characters list: ", e, r, i)), t
			},
			getFontByName: function (t) {
				for (var e = 0, r = this.fonts.length; e < r;) {
					if (this.fonts[e].fName === t) return this.fonts[e];
					e += 1
				}
				return this.fonts[0]
			},
			measureText: function (t, e, r) {
				var i = this.getFontByName(e),
					s = t.charCodeAt(0);
				if (!i.cache[s + 1]) {
					var a = i.helper;
					if (" " === t) {
						var n = a.measureText("|" + t + "|"),
							o = a.measureText("||");
						i.cache[s + 1] = (n - o) / 100
					} else i.cache[s + 1] = a.measureText(t) / 100
				}
				return i.cache[s + 1] * r
			},
			checkLoadedFonts: function () {
				var t, e, r, i = this.fonts.length,
					s = i;
				for (t = 0; t < i; t += 1) this.fonts[t].loaded ? s -= 1 : "n" === this.fonts[t].fOrigin || 0 === this.fonts[t].origin ? this.fonts[t].loaded = !0 : (e = this.fonts[t].monoCase.node, r = this.fonts[t].monoCase.w, e.offsetWidth !== r ? (s -= 1, this.fonts[t].loaded = !0) : (e = this.fonts[t].sansCase.node, r = this.fonts[t].sansCase.w, e.offsetWidth !== r && (s -= 1, this.fonts[t].loaded = !0)), this.fonts[t].loaded && (this.fonts[t].sansCase.parent.parentNode.removeChild(this.fonts[t].sansCase.parent), this.fonts[t].monoCase.parent.parentNode.removeChild(this.fonts[t].monoCase.parent)));
				0 !== s && Date.now() - this.initTime < 5e3 ? setTimeout(this.checkLoadedFontsBinded, 20) : setTimeout(this.setIsLoadedBinded, 10)
			},
			setIsLoaded: function () {
				this.isLoaded = !0
			}
		};
		return n.prototype = o, n
	}();

	function RenderableElement() {}
	RenderableElement.prototype = {
		initRenderable: function () {
			this.isInRange = !1, this.hidden = !1, this.isTransparent = !1, this.renderableComponents = []
		},
		addRenderableComponent: function (t) {
			-1 === this.renderableComponents.indexOf(t) && this.renderableComponents.push(t)
		},
		removeRenderableComponent: function (t) {
			-1 !== this.renderableComponents.indexOf(t) && this.renderableComponents.splice(this.renderableComponents.indexOf(t), 1)
		},
		prepareRenderableFrame: function (t) {
			this.checkLayerLimits(t)
		},
		checkTransparency: function () {
			this.finalTransform.mProp.o.v <= 0 ? !this.isTransparent && this.globalData.renderConfig.hideOnTransparent && (this.isTransparent = !0, this.hide()) : this.isTransparent && (this.isTransparent = !1, this.show())
		},
		checkLayerLimits: function (t) {
			this.data.ip - this.data.st <= t && this.data.op - this.data.st > t ? !0 !== this.isInRange && (this.globalData._mdf = !0, this._mdf = !0, this.isInRange = !0, this.show()) : !1 !== this.isInRange && (this.globalData._mdf = !0, this.isInRange = !1, this.hide())
		},
		renderRenderable: function () {
			var t, e = this.renderableComponents.length;
			for (t = 0; t < e; t += 1) this.renderableComponents[t].renderFrame(this._isFirstFrame)
		},
		sourceRectAtTime: function () {
			return {
				top: 0,
				left: 0,
				width: 100,
				height: 100
			}
		},
		getLayerSize: function () {
			return 5 === this.data.ty ? {
				w: this.data.textData.width,
				h: this.data.textData.height
			} : {
				w: this.data.width,
				h: this.data.height
			}
		}
	};
	var getBlendMode = (blendModeEnums = {
			0: "source-over",
			1: "multiply",
			2: "screen",
			3: "overlay",
			4: "darken",
			5: "lighten",
			6: "color-dodge",
			7: "color-burn",
			8: "hard-light",
			9: "soft-light",
			10: "difference",
			11: "exclusion",
			12: "hue",
			13: "saturation",
			14: "color",
			15: "luminosity"
		}, function (t) {
			return blendModeEnums[t] || ""
		}),
		blendModeEnums;

	function SliderEffect(t, e, r) {
		this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
	}

	function AngleEffect(t, e, r) {
		this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
	}

	function ColorEffect(t, e, r) {
		this.p = PropertyFactory.getProp(e, t.v, 1, 0, r)
	}

	function PointEffect(t, e, r) {
		this.p = PropertyFactory.getProp(e, t.v, 1, 0, r)
	}

	function LayerIndexEffect(t, e, r) {
		this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
	}

	function MaskIndexEffect(t, e, r) {
		this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
	}

	function CheckboxEffect(t, e, r) {
		this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
	}

	function NoValueEffect() {
		this.p = {}
	}

	function EffectsManager(t, e) {
		var r, i = t.ef || [];
		this.effectElements = [];
		var s, a = i.length;
		for (r = 0; r < a; r += 1) s = new GroupEffect(i[r], e), this.effectElements.push(s)
	}

	function GroupEffect(t, e) {
		this.init(t, e)
	}

	function BaseElement() {}

	function FrameElement() {}

	function FootageElement(t, e, r) {
		this.initFrame(), this.initRenderable(), this.assetData = e.getAssetData(t.refId), this.footageData = e.imageLoader.getAsset(this.assetData), this.initBaseData(t, e, r)
	}

	function AudioElement(t, e, r) {
		this.initFrame(), this.initRenderable(), this.assetData = e.getAssetData(t.refId), this.initBaseData(t, e, r), this._isPlaying = !1, this._canPlay = !1;
		var i = this.globalData.getAssetsPath(this.assetData);
		this.audio = this.globalData.audioController.createAudio(i), this._currentTime = 0, this.globalData.audioController.addAudio(this), this._volumeMultiplier = 1, this._volume = 1, this._previousVolume = null, this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
			_placeholder: !0
		}, this.lv = PropertyFactory.getProp(this, t.au && t.au.lv ? t.au.lv : {
			k: [100]
		}, 1, .01, this)
	}

	function BaseRenderer() {}

	function TransformElement() {}

	function MaskElement(t, e, r) {
		this.data = t, this.element = e, this.globalData = r, this.storedData = [], this.masksProperties = this.data.masksProperties || [], this.maskElement = null;
		var i, s, a = this.globalData.defs,
			n = this.masksProperties ? this.masksProperties.length : 0;
		this.viewData = createSizedArray(n), this.solidPath = "";
		var o, h, l, p, f, m, c = this.masksProperties,
			d = 0,
			u = [],
			y = createElementID(),
			g = "clipPath",
			v = "clip-path";
		for (i = 0; i < n; i += 1)
			if (("a" !== c[i].mode && "n" !== c[i].mode || c[i].inv || 100 !== c[i].o.k || c[i].o.x) && (g = "mask", v = "mask"), "s" !== c[i].mode && "i" !== c[i].mode || 0 !== d ? l = null : ((l = createNS("rect")).setAttribute("fill", "#ffffff"), l.setAttribute("width", this.element.comp.data.w || 0), l.setAttribute("height", this.element.comp.data.h || 0), u.push(l)), s = createNS("path"), "n" === c[i].mode) this.viewData[i] = {
				op: PropertyFactory.getProp(this.element, c[i].o, 0, .01, this.element),
				prop: ShapePropertyFactory.getShapeProp(this.element, c[i], 3),
				elem: s,
				lastPath: ""
			}, a.appendChild(s);
			else {
				var b;
				if (d += 1, s.setAttribute("fill", "s" === c[i].mode ? "#000000" : "#ffffff"), s.setAttribute("clip-rule", "nonzero"), 0 !== c[i].x.k ? (g = "mask", v = "mask", m = PropertyFactory.getProp(this.element, c[i].x, 0, null, this.element), b = createElementID(), (p = createNS("filter")).setAttribute("id", b), (f = createNS("feMorphology")).setAttribute("operator", "erode"), f.setAttribute("in", "SourceGraphic"), f.setAttribute("radius", "0"), p.appendChild(f), a.appendChild(p), s.setAttribute("stroke", "s" === c[i].mode ? "#000000" : "#ffffff")) : (f = null, m = null), this.storedData[i] = {
						elem: s,
						x: m,
						expan: f,
						lastPath: "",
						lastOperator: "",
						filterId: b,
						lastRadius: 0
					}, "i" === c[i].mode) {
					h = u.length;
					var P = createNS("g");
					for (o = 0; o < h; o += 1) P.appendChild(u[o]);
					var x = createNS("mask");
					x.setAttribute("mask-type", "alpha"), x.setAttribute("id", y + "_" + d), x.appendChild(s), a.appendChild(x), P.setAttribute("mask", "url(" + getLocationHref() + "#" + y + "_" + d + ")"), u.length = 0, u.push(P)
				} else u.push(s);
				c[i].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()), this.viewData[i] = {
					elem: s,
					lastPath: "",
					op: PropertyFactory.getProp(this.element, c[i].o, 0, .01, this.element),
					prop: ShapePropertyFactory.getShapeProp(this.element, c[i], 3),
					invRect: l
				}, this.viewData[i].prop.k || this.drawPath(c[i], this.viewData[i].prop.v, this.viewData[i])
			} for (this.maskElement = createNS(g), n = u.length, i = 0; i < n; i += 1) this.maskElement.appendChild(u[i]);
		d > 0 && (this.maskElement.setAttribute("id", y), this.element.maskedElement.setAttribute(v, "url(" + getLocationHref() + "#" + y + ")"), a.appendChild(this.maskElement)), this.viewData.length && this.element.addRenderableComponent(this)
	}
	extendPrototype([DynamicPropertyContainer], GroupEffect), GroupEffect.prototype.getValue = GroupEffect.prototype.iterateDynamicProperties, GroupEffect.prototype.init = function (t, e) {
		var r;
		this.data = t, this.effectElements = [], this.initDynamicPropertyContainer(e);
		var i, s = this.data.ef.length,
			a = this.data.ef;
		for (r = 0; r < s; r += 1) {
			switch (i = null, a[r].ty) {
				case 0:
					i = new SliderEffect(a[r], e, this);
					break;
				case 1:
					i = new AngleEffect(a[r], e, this);
					break;
				case 2:
					i = new ColorEffect(a[r], e, this);
					break;
				case 3:
					i = new PointEffect(a[r], e, this);
					break;
				case 4:
				case 7:
					i = new CheckboxEffect(a[r], e, this);
					break;
				case 10:
					i = new LayerIndexEffect(a[r], e, this);
					break;
				case 11:
					i = new MaskIndexEffect(a[r], e, this);
					break;
				case 5:
					i = new EffectsManager(a[r], e, this);
					break;
				default:
					i = new NoValueEffect(a[r], e, this)
			}
			i && this.effectElements.push(i)
		}
	}, BaseElement.prototype = {
		checkMasks: function () {
			if (!this.data.hasMask) return !1;
			for (var t = 0, e = this.data.masksProperties.length; t < e;) {
				if ("n" !== this.data.masksProperties[t].mode && !1 !== this.data.masksProperties[t].cl) return !0;
				t += 1
			}
			return !1
		},
		initExpressions: function () {
			var t = getExpressionInterfaces();
			if (t) {
				var e = t("layer"),
					r = t("effects"),
					i = t("shape"),
					s = t("text"),
					a = t("comp");
				this.layerInterface = e(this), this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager);
				var n = r.createEffectsInterface(this, this.layerInterface);
				this.layerInterface.registerEffectsInterface(n), 0 === this.data.ty || this.data.xt ? this.compInterface = a(this) : 4 === this.data.ty ? (this.layerInterface.shapeInterface = i(this.shapesData, this.itemsData, this.layerInterface), this.layerInterface.content = this.layerInterface.shapeInterface) : 5 === this.data.ty && (this.layerInterface.textInterface = s(this), this.layerInterface.text = this.layerInterface.textInterface)
			}
		},
		setBlendMode: function () {
			var t = getBlendMode(this.data.bm);
			(this.baseElement || this.layerElement).style["mix-blend-mode"] = t
		},
		initBaseData: function (t, e, r) {
			this.globalData = e, this.comp = r, this.data = t, this.layerId = createElementID(), this.data.sr || (this.data.sr = 1), this.effectsManager = new EffectsManager(this.data, this, this.dynamicProperties)
		},
		getType: function () {
			return this.type
		},
		sourceRectAtTime: function () {}
	}, FrameElement.prototype = {
		initFrame: function () {
			this._isFirstFrame = !1, this.dynamicProperties = [], this._mdf = !1
		},
		prepareProperties: function (t, e) {
			var r, i = this.dynamicProperties.length;
			for (r = 0; r < i; r += 1)(e || this._isParent && "transform" === this.dynamicProperties[r].propType) && (this.dynamicProperties[r].getValue(), this.dynamicProperties[r]._mdf && (this.globalData._mdf = !0, this._mdf = !0))
		},
		addDynamicProperty: function (t) {
			-1 === this.dynamicProperties.indexOf(t) && this.dynamicProperties.push(t)
		}
	}, FootageElement.prototype.prepareFrame = function () {}, extendPrototype([RenderableElement, BaseElement, FrameElement], FootageElement), FootageElement.prototype.getBaseElement = function () {
		return null
	}, FootageElement.prototype.renderFrame = function () {}, FootageElement.prototype.destroy = function () {}, FootageElement.prototype.initExpressions = function () {
		var t = getExpressionInterfaces();
		if (t) {
			var e = t("footage");
			this.layerInterface = e(this)
		}
	}, FootageElement.prototype.getFootageData = function () {
		return this.footageData
	}, AudioElement.prototype.prepareFrame = function (t) {
		if (this.prepareRenderableFrame(t, !0), this.prepareProperties(t, !0), this.tm._placeholder) this._currentTime = t / this.data.sr;
		else {
			var e = this.tm.v;
			this._currentTime = e
		}
		this._volume = this.lv.v[0];
		var r = this._volume * this._volumeMultiplier;
		this._previousVolume !== r && (this._previousVolume = r, this.audio.volume(r))
	}, extendPrototype([RenderableElement, BaseElement, FrameElement], AudioElement), AudioElement.prototype.renderFrame = function () {
		this.isInRange && this._canPlay && (this._isPlaying ? (!this.audio.playing() || Math.abs(this._currentTime / this.globalData.frameRate - this.audio.seek()) > .1) && this.audio.seek(this._currentTime / this.globalData.frameRate) : (this.audio.play(), this.audio.seek(this._currentTime / this.globalData.frameRate), this._isPlaying = !0))
	}, AudioElement.prototype.show = function () {}, AudioElement.prototype.hide = function () {
		this.audio.pause(), this._isPlaying = !1
	}, AudioElement.prototype.pause = function () {
		this.audio.pause(), this._isPlaying = !1, this._canPlay = !1
	}, AudioElement.prototype.resume = function () {
		this._canPlay = !0
	}, AudioElement.prototype.setRate = function (t) {
		this.audio.rate(t)
	}, AudioElement.prototype.volume = function (t) {
		this._volumeMultiplier = t, this._previousVolume = t * this._volume, this.audio.volume(this._previousVolume)
	}, AudioElement.prototype.getBaseElement = function () {
		return null
	}, AudioElement.prototype.destroy = function () {}, AudioElement.prototype.sourceRectAtTime = function () {}, AudioElement.prototype.initExpressions = function () {}, BaseRenderer.prototype.checkLayers = function (t) {
		var e, r, i = this.layers.length;
		for (this.completeLayers = !0, e = i - 1; e >= 0; e -= 1) this.elements[e] || (r = this.layers[e]).ip - r.st <= t - this.layers[e].st && r.op - r.st > t - this.layers[e].st && this.buildItem(e), this.completeLayers = !!this.elements[e] && this.completeLayers;
		this.checkPendingElements()
	}, BaseRenderer.prototype.createItem = function (t) {
		switch (t.ty) {
			case 2:
				return this.createImage(t);
			case 0:
				return this.createComp(t);
			case 1:
				return this.createSolid(t);
			case 3:
			default:
				return this.createNull(t);
			case 4:
				return this.createShape(t);
			case 5:
				return this.createText(t);
			case 6:
				return this.createAudio(t);
			case 13:
				return this.createCamera(t);
			case 15:
				return this.createFootage(t)
		}
	}, BaseRenderer.prototype.createCamera = function () {
		throw new Error("You're using a 3d camera. Try the html renderer.")
	}, BaseRenderer.prototype.createAudio = function (t) {
		return new AudioElement(t, this.globalData, this)
	}, BaseRenderer.prototype.createFootage = function (t) {
		return new FootageElement(t, this.globalData, this)
	}, BaseRenderer.prototype.buildAllItems = function () {
		var t, e = this.layers.length;
		for (t = 0; t < e; t += 1) this.buildItem(t);
		this.checkPendingElements()
	}, BaseRenderer.prototype.includeLayers = function (t) {
		var e;
		this.completeLayers = !1;
		var r, i = t.length,
			s = this.layers.length;
		for (e = 0; e < i; e += 1)
			for (r = 0; r < s;) {
				if (this.layers[r].id === t[e].id) {
					this.layers[r] = t[e];
					break
				}
				r += 1
			}
	}, BaseRenderer.prototype.setProjectInterface = function (t) {
		this.globalData.projectInterface = t
	}, BaseRenderer.prototype.initItems = function () {
		this.globalData.progressiveLoad || this.buildAllItems()
	}, BaseRenderer.prototype.buildElementParenting = function (t, e, r) {
		for (var i = this.elements, s = this.layers, a = 0, n = s.length; a < n;) s[a].ind == e && (i[a] && !0 !== i[a] ? (r.push(i[a]), i[a].setAsParent(), void 0 !== s[a].parent ? this.buildElementParenting(t, s[a].parent, r) : t.setHierarchy(r)) : (this.buildItem(a), this.addPendingElement(t))), a += 1
	}, BaseRenderer.prototype.addPendingElement = function (t) {
		this.pendingElements.push(t)
	}, BaseRenderer.prototype.searchExtraCompositions = function (t) {
		var e, r = t.length;
		for (e = 0; e < r; e += 1)
			if (t[e].xt) {
				var i = this.createComp(t[e]);
				i.initExpressions(), this.globalData.projectInterface.registerComposition(i)
			}
	}, BaseRenderer.prototype.getElementById = function (t) {
		var e, r = this.elements.length;
		for (e = 0; e < r; e += 1)
			if (this.elements[e].data.ind === t) return this.elements[e];
		return null
	}, BaseRenderer.prototype.getElementByPath = function (t) {
		var e, r = t.shift();
		if ("number" == typeof r) e = this.elements[r];
		else {
			var i, s = this.elements.length;
			for (i = 0; i < s; i += 1)
				if (this.elements[i].data.nm === r) {
					e = this.elements[i];
					break
				}
		}
		return 0 === t.length ? e : e.getElementByPath(t)
	}, BaseRenderer.prototype.setupGlobalData = function (t, e) {
		this.globalData.fontManager = new FontManager, this.globalData.fontManager.addChars(t.chars), this.globalData.fontManager.addFonts(t.fonts, e), this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.imageLoader = this.animationItem.imagePreloader, this.globalData.audioController = this.animationItem.audioController, this.globalData.frameId = 0, this.globalData.frameRate = t.fr, this.globalData.nm = t.nm, this.globalData.compSize = {
			w: t.w,
			h: t.h
		}
	}, TransformElement.prototype = {
		initTransform: function () {
			this.finalTransform = {
				mProp: this.data.ks ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this) : {
					o: 0
				},
				_matMdf: !1,
				_opMdf: !1,
				mat: new Matrix
			}, this.data.ao && (this.finalTransform.mProp.autoOriented = !0), this.data.ty
		},
		renderTransform: function () {
			if (this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame, this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame, this.hierarchy) {
				var t, e = this.finalTransform.mat,
					r = 0,
					i = this.hierarchy.length;
				if (!this.finalTransform._matMdf)
					for (; r < i;) {
						if (this.hierarchy[r].finalTransform.mProp._mdf) {
							this.finalTransform._matMdf = !0;
							break
						}
						r += 1
					}
				if (this.finalTransform._matMdf)
					for (t = this.finalTransform.mProp.v.props, e.cloneFromProps(t), r = 0; r < i; r += 1) t = this.hierarchy[r].finalTransform.mProp.v.props, e.transform(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15])
			}
		},
		globalToLocal: function (t) {
			var e = [];
			e.push(this.finalTransform);
			for (var r, i = !0, s = this.comp; i;) s.finalTransform ? (s.data.hasMask && e.splice(0, 0, s.finalTransform), s = s.comp) : i = !1;
			var a, n = e.length;
			for (r = 0; r < n; r += 1) a = e[r].mat.applyToPointArray(0, 0, 0), t = [t[0] - a[0], t[1] - a[1], 0];
			return t
		},
		mHelper: new Matrix
	}, MaskElement.prototype.getMaskProperty = function (t) {
		return this.viewData[t].prop
	}, MaskElement.prototype.renderFrame = function (t) {
		var e, r = this.element.finalTransform.mat,
			i = this.masksProperties.length;
		for (e = 0; e < i; e += 1)
			if ((this.viewData[e].prop._mdf || t) && this.drawPath(this.masksProperties[e], this.viewData[e].prop.v, this.viewData[e]), (this.viewData[e].op._mdf || t) && this.viewData[e].elem.setAttribute("fill-opacity", this.viewData[e].op.v), "n" !== this.masksProperties[e].mode && (this.viewData[e].invRect && (this.element.finalTransform.mProp._mdf || t) && this.viewData[e].invRect.setAttribute("transform", r.getInverseMatrix().to2dCSS()), this.storedData[e].x && (this.storedData[e].x._mdf || t))) {
				var s = this.storedData[e].expan;
				this.storedData[e].x.v < 0 ? ("erode" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "erode", this.storedData[e].elem.setAttribute("filter", "url(" + getLocationHref() + "#" + this.storedData[e].filterId + ")")), s.setAttribute("radius", -this.storedData[e].x.v)) : ("dilate" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "dilate", this.storedData[e].elem.setAttribute("filter", null)), this.storedData[e].elem.setAttribute("stroke-width", 2 * this.storedData[e].x.v))
			}
	}, MaskElement.prototype.getMaskelement = function () {
		return this.maskElement
	}, MaskElement.prototype.createLayerSolidPath = function () {
		var t = "M0,0 ";
		return t += " h" + this.globalData.compSize.w, t += " v" + this.globalData.compSize.h, t += " h-" + this.globalData.compSize.w, t += " v-" + this.globalData.compSize.h + " "
	}, MaskElement.prototype.drawPath = function (t, e, r) {
		var i, s, a = " M" + e.v[0][0] + "," + e.v[0][1];
		for (s = e._length, i = 1; i < s; i += 1) a += " C" + e.o[i - 1][0] + "," + e.o[i - 1][1] + " " + e.i[i][0] + "," + e.i[i][1] + " " + e.v[i][0] + "," + e.v[i][1];
		if (e.c && s > 1 && (a += " C" + e.o[i - 1][0] + "," + e.o[i - 1][1] + " " + e.i[0][0] + "," + e.i[0][1] + " " + e.v[0][0] + "," + e.v[0][1]), r.lastPath !== a) {
			var n = "";
			r.elem && (e.c && (n = t.inv ? this.solidPath + a : a), r.elem.setAttribute("d", n)), r.lastPath = a
		}
	}, MaskElement.prototype.destroy = function () {
		this.element = null, this.globalData = null, this.maskElement = null, this.data = null, this.masksProperties = null
	};
	var filtersFactory = function () {
			var t = {};
			return t.createFilter = function (t, e) {
				var r = createNS("filter");
				r.setAttribute("id", t), !0 !== e && (r.setAttribute("filterUnits", "objectBoundingBox"), r.setAttribute("x", "0%"), r.setAttribute("y", "0%"), r.setAttribute("width", "100%"), r.setAttribute("height", "100%"));
				return r
			}, t.createAlphaToLuminanceFilter = function () {
				var t = createNS("feColorMatrix");
				return t.setAttribute("type", "matrix"), t.setAttribute("color-interpolation-filters", "sRGB"), t.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"), t
			}, t
		}(),
		featureSupport = function () {
			var t = {
				maskType: !0,
				svgLumaHidden: !0,
				offscreenCanvas: "undefined" != typeof OffscreenCanvas
			};
			return (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && (t.maskType = !1), /firefox/i.test(navigator.userAgent) && (t.svgLumaHidden = !1), t
		}(),
		registeredEffects = {},
		idPrefix = "filter_result_";

	function SVGEffects(t) {
		var e, r, i = "SourceGraphic",
			s = t.data.ef ? t.data.ef.length : 0,
			a = createElementID(),
			n = filtersFactory.createFilter(a, !0),
			o = 0;
		for (this.filters = [], e = 0; e < s; e += 1) {
			r = null;
			var h = t.data.ef[e].ty;
			if (registeredEffects[h]) r = new(0, registeredEffects[h].effect)(n, t.effectsManager.effectElements[e], t, idPrefix + o, i), i = idPrefix + o, registeredEffects[h].countsAsEffect && (o += 1);
			r && this.filters.push(r)
		}
		o && (t.globalData.defs.appendChild(n), t.layerElement.setAttribute("filter", "url(" + getLocationHref() + "#" + a + ")")), this.filters.length && t.addRenderableComponent(this)
	}

	function registerEffect(t, e, r) {
		registeredEffects[t] = {
			effect: e,
			countsAsEffect: r
		}
	}

	function SVGBaseElement() {}

	function HierarchyElement() {}

	function RenderableDOMElement() {}

	function IImageElement(t, e, r) {
		this.assetData = e.getAssetData(t.refId), this.initElement(t, e, r), this.sourceRect = {
			top: 0,
			left: 0,
			width: this.assetData.w,
			height: this.assetData.h
		}
	}

	function ProcessedElement(t, e) {
		this.elem = t, this.pos = e
	}

	function IShapeElement() {}
	SVGEffects.prototype.renderFrame = function (t) {
		var e, r = this.filters.length;
		for (e = 0; e < r; e += 1) this.filters[e].renderFrame(t)
	}, SVGBaseElement.prototype = {
		initRendererElement: function () {
			this.layerElement = createNS("g")
		},
		createContainerElements: function () {
			this.matteElement = createNS("g"), this.transformedElement = this.layerElement, this.maskedElement = this.layerElement, this._sizeChanged = !1;
			var t = null;
			if (this.data.td) {
				this.matteMasks = {};
				var e = createNS("g");
				e.setAttribute("id", this.layerId), e.appendChild(this.layerElement), t = e, this.globalData.defs.appendChild(e)
			} else this.data.tt ? (this.matteElement.appendChild(this.layerElement), t = this.matteElement, this.baseElement = this.matteElement) : this.baseElement = this.layerElement;
			if (this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), 0 === this.data.ty && !this.data.hd) {
				var r = createNS("clipPath"),
					i = createNS("path");
				i.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");
				var s = createElementID();
				if (r.setAttribute("id", s), r.appendChild(i), this.globalData.defs.appendChild(r), this.checkMasks()) {
					var a = createNS("g");
					a.setAttribute("clip-path", "url(" + getLocationHref() + "#" + s + ")"), a.appendChild(this.layerElement), this.transformedElement = a, t ? t.appendChild(this.transformedElement) : this.baseElement = this.transformedElement
				} else this.layerElement.setAttribute("clip-path", "url(" + getLocationHref() + "#" + s + ")")
			}
			0 !== this.data.bm && this.setBlendMode()
		},
		renderElement: function () {
			this.finalTransform._matMdf && this.transformedElement.setAttribute("transform", this.finalTransform.mat.to2dCSS()), this.finalTransform._opMdf && this.transformedElement.setAttribute("opacity", this.finalTransform.mProp.o.v)
		},
		destroyBaseElement: function () {
			this.layerElement = null, this.matteElement = null, this.maskManager.destroy()
		},
		getBaseElement: function () {
			return this.data.hd ? null : this.baseElement
		},
		createRenderableComponents: function () {
			this.maskManager = new MaskElement(this.data, this, this.globalData), this.renderableEffectsManager = new SVGEffects(this)
		},
		getMatte: function (t) {
			if (this.matteMasks || (this.matteMasks = {}), !this.matteMasks[t]) {
				var e, r, i, s, a = this.layerId + "_" + t;
				if (1 === t || 3 === t) {
					var n = createNS("mask");
					n.setAttribute("id", a), n.setAttribute("mask-type", 3 === t ? "luminance" : "alpha"), (i = createNS("use")).setAttributeNS("http://www.w3.org/1999/xlink", "href", "#" + this.layerId), n.appendChild(i), this.globalData.defs.appendChild(n), featureSupport.maskType || 1 !== t || (n.setAttribute("mask-type", "luminance"), e = createElementID(), r = filtersFactory.createFilter(e), this.globalData.defs.appendChild(r), r.appendChild(filtersFactory.createAlphaToLuminanceFilter()), (s = createNS("g")).appendChild(i), n.appendChild(s), s.setAttribute("filter", "url(" + getLocationHref() + "#" + e + ")"))
				} else if (2 === t) {
					var o = createNS("mask");
					o.setAttribute("id", a), o.setAttribute("mask-type", "alpha");
					var h = createNS("g");
					o.appendChild(h), e = createElementID(), r = filtersFactory.createFilter(e);
					var l = createNS("feComponentTransfer");
					l.setAttribute("in", "SourceGraphic"), r.appendChild(l);
					var p = createNS("feFuncA");
					p.setAttribute("type", "table"), p.setAttribute("tableValues", "1.0 0.0"), l.appendChild(p), this.globalData.defs.appendChild(r);
					var f = createNS("rect");
					f.setAttribute("width", this.comp.data.w), f.setAttribute("height", this.comp.data.h), f.setAttribute("x", "0"), f.setAttribute("y", "0"), f.setAttribute("fill", "#ffffff"), f.setAttribute("opacity", "0"), h.setAttribute("filter", "url(" + getLocationHref() + "#" + e + ")"), h.appendChild(f), (i = createNS("use")).setAttributeNS("http://www.w3.org/1999/xlink", "href", "#" + this.layerId), h.appendChild(i), featureSupport.maskType || (o.setAttribute("mask-type", "luminance"), r.appendChild(filtersFactory.createAlphaToLuminanceFilter()), s = createNS("g"), h.appendChild(f), s.appendChild(this.layerElement), h.appendChild(s)), this.globalData.defs.appendChild(o)
				}
				this.matteMasks[t] = a
			}
			return this.matteMasks[t]
		},
		setMatte: function (t) {
			this.matteElement && this.matteElement.setAttribute("mask", "url(" + getLocationHref() + "#" + t + ")")
		}
	}, HierarchyElement.prototype = {
		initHierarchy: function () {
			this.hierarchy = [], this._isParent = !1, this.checkParenting()
		},
		setHierarchy: function (t) {
			this.hierarchy = t
		},
		setAsParent: function () {
			this._isParent = !0
		},
		checkParenting: function () {
			void 0 !== this.data.parent && this.comp.buildElementParenting(this, this.data.parent, [])
		}
	}, extendPrototype([RenderableElement, createProxyFunction({
		initElement: function (t, e, r) {
			this.initFrame(), this.initBaseData(t, e, r), this.initTransform(t, e, r), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide()
		},
		hide: function () {
			this.hidden || this.isInRange && !this.isTransparent || ((this.baseElement || this.layerElement).style.display = "none", this.hidden = !0)
		},
		show: function () {
			this.isInRange && !this.isTransparent && (this.data.hd || ((this.baseElement || this.layerElement).style.display = "block"), this.hidden = !1, this._isFirstFrame = !0)
		},
		renderFrame: function () {
			this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1))
		},
		renderInnerContent: function () {},
		prepareFrame: function (t) {
			this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.checkTransparency()
		},
		destroy: function () {
			this.innerElem = null, this.destroyBaseElement()
		}
	})], RenderableDOMElement), extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], IImageElement), IImageElement.prototype.createContent = function () {
		var t = this.globalData.getAssetsPath(this.assetData);
		this.innerElem = createNS("image"), this.innerElem.setAttribute("width", this.assetData.w + "px"), this.innerElem.setAttribute("height", this.assetData.h + "px"), this.innerElem.setAttribute("preserveAspectRatio", this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio), this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.innerElem)
	}, IImageElement.prototype.sourceRectAtTime = function () {
		return this.sourceRect
	}, IShapeElement.prototype = {
		addShapeToModifiers: function (t) {
			var e, r = this.shapeModifiers.length;
			for (e = 0; e < r; e += 1) this.shapeModifiers[e].addShape(t)
		},
		isShapeInAnimatedModifiers: function (t) {
			for (var e = this.shapeModifiers.length; 0 < e;)
				if (this.shapeModifiers[0].isAnimatedWithShape(t)) return !0;
			return !1
		},
		renderModifiers: function () {
			if (this.shapeModifiers.length) {
				var t, e = this.shapes.length;
				for (t = 0; t < e; t += 1) this.shapes[t].sh.reset();
				for (t = (e = this.shapeModifiers.length) - 1; t >= 0 && !this.shapeModifiers[t].processShapes(this._isFirstFrame); t -= 1);
			}
		},
		searchProcessedElement: function (t) {
			for (var e = this.processedElements, r = 0, i = e.length; r < i;) {
				if (e[r].elem === t) return e[r].pos;
				r += 1
			}
			return 0
		},
		addProcessedElement: function (t, e) {
			for (var r = this.processedElements, i = r.length; i;)
				if (r[i -= 1].elem === t) return void(r[i].pos = e);
			r.push(new ProcessedElement(t, e))
		},
		prepareFrame: function (t) {
			this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange)
		}
	};
	var lineCapEnum = {
			1: "butt",
			2: "round",
			3: "square"
		},
		lineJoinEnum = {
			1: "miter",
			2: "round",
			3: "bevel"
		};

	function SVGShapeData(t, e, r) {
		this.caches = [], this.styles = [], this.transformers = t, this.lStr = "", this.sh = r, this.lvl = e, this._isAnimated = !!r.k;
		for (var i = 0, s = t.length; i < s;) {
			if (t[i].mProps.dynamicProperties.length) {
				this._isAnimated = !0;
				break
			}
			i += 1
		}
	}

	function SVGStyleData(t, e) {
		this.data = t, this.type = t.ty, this.d = "", this.lvl = e, this._mdf = !1, this.closed = !0 === t.hd, this.pElem = createNS("path"), this.msElem = null
	}

	function DashProperty(t, e, r, i) {
		var s;
		this.elem = t, this.frameId = -1, this.dataProps = createSizedArray(e.length), this.renderer = r, this.k = !1, this.dashStr = "", this.dashArray = createTypedArray("float32", e.length ? e.length - 1 : 0), this.dashoffset = createTypedArray("float32", 1), this.initDynamicPropertyContainer(i);
		var a, n = e.length || 0;
		for (s = 0; s < n; s += 1) a = PropertyFactory.getProp(t, e[s].v, 0, 0, this), this.k = a.k || this.k, this.dataProps[s] = {
			n: e[s].n,
			p: a
		};
		this.k || this.getValue(!0), this._isAnimated = this.k
	}

	function SVGStrokeStyleData(t, e, r) {
		this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.w = PropertyFactory.getProp(t, e.w, 0, null, this), this.d = new DashProperty(t, e.d || {}, "svg", this), this.c = PropertyFactory.getProp(t, e.c, 1, 255, this), this.style = r, this._isAnimated = !!this._isAnimated
	}

	function SVGFillStyleData(t, e, r) {
		this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.c = PropertyFactory.getProp(t, e.c, 1, 255, this), this.style = r
	}

	function SVGNoStyleData(t, e, r) {
		this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.style = r
	}

	function GradientProperty(t, e, r) {
		this.data = e, this.c = createTypedArray("uint8c", 4 * e.p);
		var i = e.k.k[0].s ? e.k.k[0].s.length - 4 * e.p : e.k.k.length - 4 * e.p;
		this.o = createTypedArray("float32", i), this._cmdf = !1, this._omdf = !1, this._collapsable = this.checkCollapsable(), this._hasOpacity = i, this.initDynamicPropertyContainer(r), this.prop = PropertyFactory.getProp(t, e.k, 1, null, this), this.k = this.prop.k, this.getValue(!0)
	}

	function SVGGradientFillStyleData(t, e, r) {
		this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.initGradientData(t, e, r)
	}

	function SVGGradientStrokeStyleData(t, e, r) {
		this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.w = PropertyFactory.getProp(t, e.w, 0, null, this), this.d = new DashProperty(t, e.d || {}, "svg", this), this.initGradientData(t, e, r), this._isAnimated = !!this._isAnimated
	}

	function ShapeGroupData() {
		this.it = [], this.prevViewData = [], this.gr = createNS("g")
	}

	function SVGTransformData(t, e, r) {
		this.transform = {
			mProps: t,
			op: e,
			container: r
		}, this.elements = [], this._isAnimated = this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length
	}
	SVGShapeData.prototype.setAsAnimated = function () {
		this._isAnimated = !0
	}, SVGStyleData.prototype.reset = function () {
		this.d = "", this._mdf = !1
	}, DashProperty.prototype.getValue = function (t) {
		if ((this.elem.globalData.frameId !== this.frameId || t) && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf = this._mdf || t, this._mdf)) {
			var e = 0,
				r = this.dataProps.length;
			for ("svg" === this.renderer && (this.dashStr = ""), e = 0; e < r; e += 1) "o" !== this.dataProps[e].n ? "svg" === this.renderer ? this.dashStr += " " + this.dataProps[e].p.v : this.dashArray[e] = this.dataProps[e].p.v : this.dashoffset[0] = this.dataProps[e].p.v
		}
	}, extendPrototype([DynamicPropertyContainer], DashProperty), extendPrototype([DynamicPropertyContainer], SVGStrokeStyleData), extendPrototype([DynamicPropertyContainer], SVGFillStyleData), extendPrototype([DynamicPropertyContainer], SVGNoStyleData), GradientProperty.prototype.comparePoints = function (t, e) {
		for (var r = 0, i = this.o.length / 2; r < i;) {
			if (Math.abs(t[4 * r] - t[4 * e + 2 * r]) > .01) return !1;
			r += 1
		}
		return !0
	}, GradientProperty.prototype.checkCollapsable = function () {
		if (this.o.length / 2 != this.c.length / 4) return !1;
		if (this.data.k.k[0].s)
			for (var t = 0, e = this.data.k.k.length; t < e;) {
				if (!this.comparePoints(this.data.k.k[t].s, this.data.p)) return !1;
				t += 1
			} else if (!this.comparePoints(this.data.k.k, this.data.p)) return !1;
		return !0
	}, GradientProperty.prototype.getValue = function (t) {
		if (this.prop.getValue(), this._mdf = !1, this._cmdf = !1, this._omdf = !1, this.prop._mdf || t) {
			var e, r, i, s = 4 * this.data.p;
			for (e = 0; e < s; e += 1) r = e % 4 == 0 ? 100 : 255, i = Math.round(this.prop.v[e] * r), this.c[e] !== i && (this.c[e] = i, this._cmdf = !t);
			if (this.o.length)
				for (s = this.prop.v.length, e = 4 * this.data.p; e < s; e += 1) r = e % 2 == 0 ? 100 : 1, i = e % 2 == 0 ? Math.round(100 * this.prop.v[e]) : this.prop.v[e], this.o[e - 4 * this.data.p] !== i && (this.o[e - 4 * this.data.p] = i, this._omdf = !t);
			this._mdf = !t
		}
	}, extendPrototype([DynamicPropertyContainer], GradientProperty), SVGGradientFillStyleData.prototype.initGradientData = function (t, e, r) {
		this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.s = PropertyFactory.getProp(t, e.s, 1, null, this), this.e = PropertyFactory.getProp(t, e.e, 1, null, this), this.h = PropertyFactory.getProp(t, e.h || {
			k: 0
		}, 0, .01, this), this.a = PropertyFactory.getProp(t, e.a || {
			k: 0
		}, 0, degToRads, this), this.g = new GradientProperty(t, e.g, this), this.style = r, this.stops = [], this.setGradientData(r.pElem, e), this.setGradientOpacity(e, r), this._isAnimated = !!this._isAnimated
	}, SVGGradientFillStyleData.prototype.setGradientData = function (t, e) {
		var r = createElementID(),
			i = createNS(1 === e.t ? "linearGradient" : "radialGradient");
		i.setAttribute("id", r), i.setAttribute("spreadMethod", "pad"), i.setAttribute("gradientUnits", "userSpaceOnUse");
		var s, a, n, o = [];
		for (n = 4 * e.g.p, a = 0; a < n; a += 4) s = createNS("stop"), i.appendChild(s), o.push(s);
		t.setAttribute("gf" === e.ty ? "fill" : "stroke", "url(" + getLocationHref() + "#" + r + ")"), this.gf = i, this.cst = o
	}, SVGGradientFillStyleData.prototype.setGradientOpacity = function (t, e) {
		if (this.g._hasOpacity && !this.g._collapsable) {
			var r, i, s, a = createNS("mask"),
				n = createNS("path");
			a.appendChild(n);
			var o = createElementID(),
				h = createElementID();
			a.setAttribute("id", h);
			var l = createNS(1 === t.t ? "linearGradient" : "radialGradient");
			l.setAttribute("id", o), l.setAttribute("spreadMethod", "pad"), l.setAttribute("gradientUnits", "userSpaceOnUse"), s = t.g.k.k[0].s ? t.g.k.k[0].s.length : t.g.k.k.length;
			var p = this.stops;
			for (i = 4 * t.g.p; i < s; i += 2)(r = createNS("stop")).setAttribute("stop-color", "rgb(255,255,255)"), l.appendChild(r), p.push(r);
			n.setAttribute("gf" === t.ty ? "fill" : "stroke", "url(" + getLocationHref() + "#" + o + ")"), "gs" === t.ty && (n.setAttribute("stroke-linecap", lineCapEnum[t.lc || 2]), n.setAttribute("stroke-linejoin", lineJoinEnum[t.lj || 2]), 1 === t.lj && n.setAttribute("stroke-miterlimit", t.ml)), this.of = l, this.ms = a, this.ost = p, this.maskId = h, e.msElem = n
		}
	}, extendPrototype([DynamicPropertyContainer], SVGGradientFillStyleData), extendPrototype([SVGGradientFillStyleData, DynamicPropertyContainer], SVGGradientStrokeStyleData);
	var buildShapeString = function (t, e, r, i) {
			if (0 === e) return "";
			var s, a = t.o,
				n = t.i,
				o = t.v,
				h = " M" + i.applyToPointStringified(o[0][0], o[0][1]);
			for (s = 1; s < e; s += 1) h += " C" + i.applyToPointStringified(a[s - 1][0], a[s - 1][1]) + " " + i.applyToPointStringified(n[s][0], n[s][1]) + " " + i.applyToPointStringified(o[s][0], o[s][1]);
			return r && e && (h += " C" + i.applyToPointStringified(a[s - 1][0], a[s - 1][1]) + " " + i.applyToPointStringified(n[0][0], n[0][1]) + " " + i.applyToPointStringified(o[0][0], o[0][1]), h += "z"), h
		},
		SVGElementsRenderer = function () {
			var t = new Matrix,
				e = new Matrix;

			function r(t, e, r) {
				(r || e.transform.op._mdf) && e.transform.container.setAttribute("opacity", e.transform.op.v), (r || e.transform.mProps._mdf) && e.transform.container.setAttribute("transform", e.transform.mProps.v.to2dCSS())
			}

			function i() {}

			function s(r, i, s) {
				var a, n, o, h, l, p, f, m, c, d, u, y = i.styles.length,
					g = i.lvl;
				for (p = 0; p < y; p += 1) {
					if (h = i.sh._mdf || s, i.styles[p].lvl < g) {
						for (m = e.reset(), d = g - i.styles[p].lvl, u = i.transformers.length - 1; !h && d > 0;) h = i.transformers[u].mProps._mdf || h, d -= 1, u -= 1;
						if (h)
							for (d = g - i.styles[p].lvl, u = i.transformers.length - 1; d > 0;) c = i.transformers[u].mProps.v.props, m.transform(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15]), d -= 1, u -= 1
					} else m = t;
					if (n = (f = i.sh.paths)._length, h) {
						for (o = "", a = 0; a < n; a += 1)(l = f.shapes[a]) && l._length && (o += buildShapeString(l, l._length, l.c, m));
						i.caches[p] = o
					} else o = i.caches[p];
					i.styles[p].d += !0 === r.hd ? "" : o, i.styles[p]._mdf = h || i.styles[p]._mdf
				}
			}

			function a(t, e, r) {
				var i = e.style;
				(e.c._mdf || r) && i.pElem.setAttribute("fill", "rgb(" + bmFloor(e.c.v[0]) + "," + bmFloor(e.c.v[1]) + "," + bmFloor(e.c.v[2]) + ")"), (e.o._mdf || r) && i.pElem.setAttribute("fill-opacity", e.o.v)
			}

			function n(t, e, r) {
				o(t, e, r), h(t, e, r)
			}

			function o(t, e, r) {
				var i, s, a, n, o, h = e.gf,
					l = e.g._hasOpacity,
					p = e.s.v,
					f = e.e.v;
				if (e.o._mdf || r) {
					var m = "gf" === t.ty ? "fill-opacity" : "stroke-opacity";
					e.style.pElem.setAttribute(m, e.o.v)
				}
				if (e.s._mdf || r) {
					var c = 1 === t.t ? "x1" : "cx",
						d = "x1" === c ? "y1" : "cy";
					h.setAttribute(c, p[0]), h.setAttribute(d, p[1]), l && !e.g._collapsable && (e.of.setAttribute(c, p[0]), e.of.setAttribute(d, p[1]))
				}
				if (e.g._cmdf || r) {
					i = e.cst;
					var u = e.g.c;
					for (a = i.length, s = 0; s < a; s += 1)(n = i[s]).setAttribute("offset", u[4 * s] + "%"), n.setAttribute("stop-color", "rgb(" + u[4 * s + 1] + "," + u[4 * s + 2] + "," + u[4 * s + 3] + ")")
				}
				if (l && (e.g._omdf || r)) {
					var y = e.g.o;
					for (a = (i = e.g._collapsable ? e.cst : e.ost).length, s = 0; s < a; s += 1) n = i[s], e.g._collapsable || n.setAttribute("offset", y[2 * s] + "%"), n.setAttribute("stop-opacity", y[2 * s + 1])
				}
				if (1 === t.t)(e.e._mdf || r) && (h.setAttribute("x2", f[0]), h.setAttribute("y2", f[1]), l && !e.g._collapsable && (e.of.setAttribute("x2", f[0]), e.of.setAttribute("y2", f[1])));
				else if ((e.s._mdf || e.e._mdf || r) && (o = Math.sqrt(Math.pow(p[0] - f[0], 2) + Math.pow(p[1] - f[1], 2)), h.setAttribute("r", o), l && !e.g._collapsable && e.of.setAttribute("r", o)), e.e._mdf || e.h._mdf || e.a._mdf || r) {
					o || (o = Math.sqrt(Math.pow(p[0] - f[0], 2) + Math.pow(p[1] - f[1], 2)));
					var g = Math.atan2(f[1] - p[1], f[0] - p[0]),
						v = e.h.v;
					v >= 1 ? v = .99 : v <= -1 && (v = -.99);
					var b = o * v,
						P = Math.cos(g + e.a.v) * b + p[0],
						x = Math.sin(g + e.a.v) * b + p[1];
					h.setAttribute("fx", P), h.setAttribute("fy", x), l && !e.g._collapsable && (e.of.setAttribute("fx", P), e.of.setAttribute("fy", x))
				}
			}

			function h(t, e, r) {
				var i = e.style,
					s = e.d;
				s && (s._mdf || r) && s.dashStr && (i.pElem.setAttribute("stroke-dasharray", s.dashStr), i.pElem.setAttribute("stroke-dashoffset", s.dashoffset[0])), e.c && (e.c._mdf || r) && i.pElem.setAttribute("stroke", "rgb(" + bmFloor(e.c.v[0]) + "," + bmFloor(e.c.v[1]) + "," + bmFloor(e.c.v[2]) + ")"), (e.o._mdf || r) && i.pElem.setAttribute("stroke-opacity", e.o.v), (e.w._mdf || r) && (i.pElem.setAttribute("stroke-width", e.w.v), i.msElem && i.msElem.setAttribute("stroke-width", e.w.v))
			}
			return {
				createRenderFunction: function (t) {
					switch (t.ty) {
						case "fl":
							return a;
						case "gf":
							return o;
						case "gs":
							return n;
						case "st":
							return h;
						case "sh":
						case "el":
						case "rc":
						case "sr":
							return s;
						case "tr":
							return r;
						case "no":
							return i;
						default:
							return null
					}
				}
			}
		}();

	function SVGShapeElement(t, e, r) {
		this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.initElement(t, e, r), this.prevViewData = []
	}

	function LetterProps(t, e, r, i, s, a) {
		this.o = t, this.sw = e, this.sc = r, this.fc = i, this.m = s, this.p = a, this._mdf = {
			o: !0,
			sw: !!e,
			sc: !!r,
			fc: !!i,
			m: !0,
			p: !0
		}
	}

	function TextProperty(t, e) {
		this._frameId = initialDefaultFrame, this.pv = "", this.v = "", this.kf = !1, this._isFirstFrame = !0, this._mdf = !1, this.data = e, this.elem = t, this.comp = this.elem.comp, this.keysIndex = 0, this.canResize = !1, this.minimumFontSize = 1, this.effectsSequence = [], this.currentData = {
			ascent: 0,
			boxWidth: this.defaultBoxWidth,
			f: "",
			fStyle: "",
			fWeight: "",
			fc: "",
			j: "",
			justifyOffset: "",
			l: [],
			lh: 0,
			lineWidths: [],
			ls: "",
			of: "",
			s: "",
			sc: "",
			sw: 0,
			t: 0,
			tr: 0,
			sz: 0,
			ps: null,
			fillColorAnim: !1,
			strokeColorAnim: !1,
			strokeWidthAnim: !1,
			yOffset: 0,
			finalSize: 0,
			finalText: [],
			finalLineHeight: 0,
			__complete: !1
		}, this.copyData(this.currentData, this.data.d.k[0].s), this.searchProperty() || this.completeTextData(this.currentData)
	}
	extendPrototype([BaseElement, TransformElement, SVGBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableDOMElement], SVGShapeElement), SVGShapeElement.prototype.initSecondaryElement = function () {}, SVGShapeElement.prototype.identityMatrix = new Matrix, SVGShapeElement.prototype.buildExpressionInterface = function () {}, SVGShapeElement.prototype.createContent = function () {
		this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes()
	}, SVGShapeElement.prototype.filterUniqueShapes = function () {
		var t, e, r, i, s = this.shapes.length,
			a = this.stylesList.length,
			n = [],
			o = !1;
		for (r = 0; r < a; r += 1) {
			for (i = this.stylesList[r], o = !1, n.length = 0, t = 0; t < s; t += 1) - 1 !== (e = this.shapes[t]).styles.indexOf(i) && (n.push(e), o = e._isAnimated || o);
			n.length > 1 && o && this.setShapesAsAnimated(n)
		}
	}, SVGShapeElement.prototype.setShapesAsAnimated = function (t) {
		var e, r = t.length;
		for (e = 0; e < r; e += 1) t[e].setAsAnimated()
	}, SVGShapeElement.prototype.createStyleElement = function (t, e) {
		var r, i = new SVGStyleData(t, e),
			s = i.pElem;
		if ("st" === t.ty) r = new SVGStrokeStyleData(this, t, i);
		else if ("fl" === t.ty) r = new SVGFillStyleData(this, t, i);
		else if ("gf" === t.ty || "gs" === t.ty) {
			r = new("gf" === t.ty ? SVGGradientFillStyleData : SVGGradientStrokeStyleData)(this, t, i), this.globalData.defs.appendChild(r.gf), r.maskId && (this.globalData.defs.appendChild(r.ms), this.globalData.defs.appendChild(r.of), s.setAttribute("mask", "url(" + getLocationHref() + "#" + r.maskId + ")"))
		} else "no" === t.ty && (r = new SVGNoStyleData(this, t, i));
		return "st" !== t.ty && "gs" !== t.ty || (s.setAttribute("stroke-linecap", lineCapEnum[t.lc || 2]), s.setAttribute("stroke-linejoin", lineJoinEnum[t.lj || 2]), s.setAttribute("fill-opacity", "0"), 1 === t.lj && s.setAttribute("stroke-miterlimit", t.ml)), 2 === t.r && s.setAttribute("fill-rule", "evenodd"), t.ln && s.setAttribute("id", t.ln), t.cl && s.setAttribute("class", t.cl), t.bm && (s.style["mix-blend-mode"] = getBlendMode(t.bm)), this.stylesList.push(i), this.addToAnimatedContents(t, r), r
	}, SVGShapeElement.prototype.createGroupElement = function (t) {
		var e = new ShapeGroupData;
		return t.ln && e.gr.setAttribute("id", t.ln), t.cl && e.gr.setAttribute("class", t.cl), t.bm && (e.gr.style["mix-blend-mode"] = getBlendMode(t.bm)), e
	}, SVGShapeElement.prototype.createTransformElement = function (t, e) {
		var r = TransformPropertyFactory.getTransformProperty(this, t, this),
			i = new SVGTransformData(r, r.o, e);
		return this.addToAnimatedContents(t, i), i
	}, SVGShapeElement.prototype.createShapeElement = function (t, e, r) {
		var i = 4;
		"rc" === t.ty ? i = 5 : "el" === t.ty ? i = 6 : "sr" === t.ty && (i = 7);
		var s = new SVGShapeData(e, r, ShapePropertyFactory.getShapeProp(this, t, i, this));
		return this.shapes.push(s), this.addShapeToModifiers(s), this.addToAnimatedContents(t, s), s
	}, SVGShapeElement.prototype.addToAnimatedContents = function (t, e) {
		for (var r = 0, i = this.animatedContents.length; r < i;) {
			if (this.animatedContents[r].element === e) return;
			r += 1
		}
		this.animatedContents.push({
			fn: SVGElementsRenderer.createRenderFunction(t),
			element: e,
			data: t
		})
	}, SVGShapeElement.prototype.setElementStyles = function (t) {
		var e, r = t.styles,
			i = this.stylesList.length;
		for (e = 0; e < i; e += 1) this.stylesList[e].closed || r.push(this.stylesList[e])
	}, SVGShapeElement.prototype.reloadShapes = function () {
		var t;
		this._isFirstFrame = !0;
		var e = this.itemsData.length;
		for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
		for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes(), e = this.dynamicProperties.length, t = 0; t < e; t += 1) this.dynamicProperties[t].getValue();
		this.renderModifiers()
	}, SVGShapeElement.prototype.searchShapes = function (t, e, r, i, s, a, n) {
		var o, h, l, p, f, m, c = [].concat(a),
			d = t.length - 1,
			u = [],
			y = [];
		for (o = d; o >= 0; o -= 1) {
			if ((m = this.searchProcessedElement(t[o])) ? e[o] = r[m - 1] : t[o]._render = n, "fl" === t[o].ty || "st" === t[o].ty || "gf" === t[o].ty || "gs" === t[o].ty || "no" === t[o].ty) m ? e[o].style.closed = !1 : e[o] = this.createStyleElement(t[o], s), t[o]._render && e[o].style.pElem.parentNode !== i && i.appendChild(e[o].style.pElem), u.push(e[o].style);
			else if ("gr" === t[o].ty) {
				if (m)
					for (l = e[o].it.length, h = 0; h < l; h += 1) e[o].prevViewData[h] = e[o].it[h];
				else e[o] = this.createGroupElement(t[o]);
				this.searchShapes(t[o].it, e[o].it, e[o].prevViewData, e[o].gr, s + 1, c, n), t[o]._render && e[o].gr.parentNode !== i && i.appendChild(e[o].gr)
			} else "tr" === t[o].ty ? (m || (e[o] = this.createTransformElement(t[o], i)), p = e[o].transform, c.push(p)) : "sh" === t[o].ty || "rc" === t[o].ty || "el" === t[o].ty || "sr" === t[o].ty ? (m || (e[o] = this.createShapeElement(t[o], c, s)), this.setElementStyles(e[o])) : "tm" === t[o].ty || "rd" === t[o].ty || "ms" === t[o].ty || "pb" === t[o].ty || "zz" === t[o].ty || "op" === t[o].ty ? (m ? (f = e[o]).closed = !1 : ((f = ShapeModifiers.getModifier(t[o].ty)).init(this, t[o]), e[o] = f, this.shapeModifiers.push(f)), y.push(f)) : "rp" === t[o].ty && (m ? (f = e[o]).closed = !0 : (f = ShapeModifiers.getModifier(t[o].ty), e[o] = f, f.init(this, t, o, e), this.shapeModifiers.push(f), n = !1), y.push(f));
			this.addProcessedElement(t[o], o + 1)
		}
		for (d = u.length, o = 0; o < d; o += 1) u[o].closed = !0;
		for (d = y.length, o = 0; o < d; o += 1) y[o].closed = !0
	}, SVGShapeElement.prototype.renderInnerContent = function () {
		var t;
		this.renderModifiers();
		var e = this.stylesList.length;
		for (t = 0; t < e; t += 1) this.stylesList[t].reset();
		for (this.renderShape(), t = 0; t < e; t += 1)(this.stylesList[t]._mdf || this._isFirstFrame) && (this.stylesList[t].msElem && (this.stylesList[t].msElem.setAttribute("d", this.stylesList[t].d), this.stylesList[t].d = "M0 0" + this.stylesList[t].d), this.stylesList[t].pElem.setAttribute("d", this.stylesList[t].d || "M0 0"))
	}, SVGShapeElement.prototype.renderShape = function () {
		var t, e, r = this.animatedContents.length;
		for (t = 0; t < r; t += 1) e = this.animatedContents[t], (this._isFirstFrame || e.element._isAnimated) && !0 !== e.data && e.fn(e.data, e.element, this._isFirstFrame)
	}, SVGShapeElement.prototype.destroy = function () {
		this.destroyBaseElement(), this.shapesData = null, this.itemsData = null
	}, LetterProps.prototype.update = function (t, e, r, i, s, a) {
		this._mdf.o = !1, this._mdf.sw = !1, this._mdf.sc = !1, this._mdf.fc = !1, this._mdf.m = !1, this._mdf.p = !1;
		var n = !1;
		return this.o !== t && (this.o = t, this._mdf.o = !0, n = !0), this.sw !== e && (this.sw = e, this._mdf.sw = !0, n = !0), this.sc !== r && (this.sc = r, this._mdf.sc = !0, n = !0), this.fc !== i && (this.fc = i, this._mdf.fc = !0, n = !0), this.m !== s && (this.m = s, this._mdf.m = !0, n = !0), !a.length || this.p[0] === a[0] && this.p[1] === a[1] && this.p[4] === a[4] && this.p[5] === a[5] && this.p[12] === a[12] && this.p[13] === a[13] || (this.p = a, this._mdf.p = !0, n = !0), n
	}, TextProperty.prototype.defaultBoxWidth = [0, 0], TextProperty.prototype.copyData = function (t, e) {
		for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
		return t
	}, TextProperty.prototype.setCurrentData = function (t) {
		t.__complete || this.completeTextData(t), this.currentData = t, this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth, this._mdf = !0
	}, TextProperty.prototype.searchProperty = function () {
		return this.searchKeyframes()
	}, TextProperty.prototype.searchKeyframes = function () {
		return this.kf = this.data.d.k.length > 1, this.kf && this.addEffect(this.getKeyframeValue.bind(this)), this.kf
	}, TextProperty.prototype.addEffect = function (t) {
		this.effectsSequence.push(t), this.elem.addDynamicProperty(this)
	}, TextProperty.prototype.getValue = function (t) {
		if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length || t) {
			this.currentData.t = this.data.d.k[this.keysIndex].s.t;
			var e = this.currentData,
				r = this.keysIndex;
			if (this.lock) this.setCurrentData(this.currentData);
			else {
				var i;
				this.lock = !0, this._mdf = !1;
				var s = this.effectsSequence.length,
					a = t || this.data.d.k[this.keysIndex].s;
				for (i = 0; i < s; i += 1) a = r !== this.keysIndex ? this.effectsSequence[i](a, a.t) : this.effectsSequence[i](this.currentData, a.t);
				e !== a && this.setCurrentData(a), this.v = this.currentData, this.pv = this.v, this.lock = !1, this.frameId = this.elem.globalData.frameId
			}
		}
	}, TextProperty.prototype.getKeyframeValue = function () {
		for (var t = this.data.d.k, e = this.elem.comp.renderedFrame, r = 0, i = t.length; r <= i - 1 && !(r === i - 1 || t[r + 1].t > e);) r += 1;
		return this.keysIndex !== r && (this.keysIndex = r), this.data.d.k[this.keysIndex].s
	}, TextProperty.prototype.buildFinalText = function (t) {
		for (var e, r, i = [], s = 0, a = t.length, n = !1; s < a;) e = t.charCodeAt(s), FontManager.isCombinedCharacter(e) ? i[i.length - 1] += t.charAt(s) : e >= 55296 && e <= 56319 ? (r = t.charCodeAt(s + 1)) >= 56320 && r <= 57343 ? (n || FontManager.isModifier(e, r) ? (i[i.length - 1] += t.substr(s, 2), n = !1) : i.push(t.substr(s, 2)), s += 1) : i.push(t.charAt(s)) : e > 56319 ? (r = t.charCodeAt(s + 1), FontManager.isZeroWidthJoiner(e, r) ? (n = !0, i[i.length - 1] += t.substr(s, 2), s += 1) : i.push(t.charAt(s))) : FontManager.isZeroWidthJoiner(e) ? (i[i.length - 1] += t.charAt(s), n = !0) : i.push(t.charAt(s)), s += 1;
		return i
	}, TextProperty.prototype.completeTextData = function (t) {
		t.__complete = !0;
		var e, r, i, s, a, n, o, h = this.elem.globalData.fontManager,
			l = this.data,
			p = [],
			f = 0,
			m = l.m.g,
			c = 0,
			d = 0,
			u = 0,
			y = [],
			g = 0,
			v = 0,
			b = h.getFontByName(t.f),
			P = 0,
			x = getFontProperties(b);
		t.fWeight = x.weight, t.fStyle = x.style, t.finalSize = t.s, t.finalText = this.buildFinalText(t.t), r = t.finalText.length, t.finalLineHeight = t.lh;
		var E, S = t.tr / 1e3 * t.finalSize;
		if (t.sz)
			for (var C, _, A = !0, T = t.sz[0], M = t.sz[1]; A;) {
				C = 0, g = 0, r = (_ = this.buildFinalText(t.t)).length, S = t.tr / 1e3 * t.finalSize;
				var k = -1;
				for (e = 0; e < r; e += 1) E = _[e].charCodeAt(0), i = !1, " " === _[e] ? k = e : 13 !== E && 3 !== E || (g = 0, i = !0, C += t.finalLineHeight || 1.2 * t.finalSize), h.chars ? (o = h.getCharData(_[e], b.fStyle, b.fFamily), P = i ? 0 : o.w * t.finalSize / 100) : P = h.measureText(_[e], t.f, t.finalSize), g + P > T && " " !== _[e] ? (-1 === k ? r += 1 : e = k, C += t.finalLineHeight || 1.2 * t.finalSize, _.splice(e, k === e ? 1 : 0, "\r"), k = -1, g = 0) : (g += P, g += S);
				C += b.ascent * t.finalSize / 100, this.canResize && t.finalSize > this.minimumFontSize && M < C ? (t.finalSize -= 1, t.finalLineHeight = t.finalSize * t.lh / t.s) : (t.finalText = _, r = t.finalText.length, A = !1)
			}
		g = -S, P = 0;
		var D, F = 0;
		for (e = 0; e < r; e += 1)
			if (i = !1, 13 === (E = (D = t.finalText[e]).charCodeAt(0)) || 3 === E ? (F = 0, y.push(g), v = g > v ? g : v, g = -2 * S, s = "", i = !0, u += 1) : s = D, h.chars ? (o = h.getCharData(D, b.fStyle, h.getFontByName(t.f).fFamily), P = i ? 0 : o.w * t.finalSize / 100) : P = h.measureText(s, t.f, t.finalSize), " " === D ? F += P + S : (g += P + S + F, F = 0), p.push({
					l: P,
					an: P,
					add: c,
					n: i,
					anIndexes: [],
					val: s,
					line: u,
					animatorJustifyOffset: 0
				}), 2 == m) {
				if (c += P, "" === s || " " === s || e === r - 1) {
					for ("" !== s && " " !== s || (c -= P); d <= e;) p[d].an = c, p[d].ind = f, p[d].extra = P, d += 1;
					f += 1, c = 0
				}
			} else if (3 == m) {
			if (c += P, "" === s || e === r - 1) {
				for ("" === s && (c -= P); d <= e;) p[d].an = c, p[d].ind = f, p[d].extra = P, d += 1;
				c = 0, f += 1
			}
		} else p[f].ind = f, p[f].extra = 0, f += 1;
		if (t.l = p, v = g > v ? g : v, y.push(g), t.sz) t.boxWidth = t.sz[0], t.justifyOffset = 0;
		else switch (t.boxWidth = v, t.j) {
			case 1:
				t.justifyOffset = -t.boxWidth;
				break;
			case 2:
				t.justifyOffset = -t.boxWidth / 2;
				break;
			default:
				t.justifyOffset = 0
		}
		t.lineWidths = y;
		var w, I, B, V, R = l.a;
		n = R.length;
		var L = [];
		for (a = 0; a < n; a += 1) {
			for ((w = R[a]).a.sc && (t.strokeColorAnim = !0), w.a.sw && (t.strokeWidthAnim = !0), (w.a.fc || w.a.fh || w.a.fs || w.a.fb) && (t.fillColorAnim = !0), V = 0, B = w.s.b, e = 0; e < r; e += 1)(I = p[e]).anIndexes[a] = V, (1 == B && "" !== I.val || 2 == B && "" !== I.val && " " !== I.val || 3 == B && (I.n || " " == I.val || e == r - 1) || 4 == B && (I.n || e == r - 1)) && (1 === w.s.rn && L.push(V), V += 1);
			l.a[a].s.totalChars = V;
			var z, G = -1;
			if (1 === w.s.rn)
				for (e = 0; e < r; e += 1) G != (I = p[e]).anIndexes[a] && (G = I.anIndexes[a], z = L.splice(Math.floor(Math.random() * L.length), 1)[0]), I.anIndexes[a] = z
		}
		t.yOffset = t.finalLineHeight || 1.2 * t.finalSize, t.ls = t.ls || 0, t.ascent = b.ascent * t.finalSize / 100
	}, TextProperty.prototype.updateDocumentData = function (t, e) {
		e = void 0 === e ? this.keysIndex : e;
		var r = this.copyData({}, this.data.d.k[e].s);
		r = this.copyData(r, t), this.data.d.k[e].s = r, this.recalculate(e), this.elem.addDynamicProperty(this)
	}, TextProperty.prototype.recalculate = function (t) {
		var e = this.data.d.k[t].s;
		e.__complete = !1, this.keysIndex = 0, this._isFirstFrame = !0, this.getValue(e)
	}, TextProperty.prototype.canResizeFont = function (t) {
		this.canResize = t, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this)
	}, TextProperty.prototype.setMinimumFontSize = function (t) {
		this.minimumFontSize = Math.floor(t) || 1, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this)
	};
	var TextSelectorProp = function () {
		var t = Math.max,
			e = Math.min,
			r = Math.floor;

		function i(t, e) {
			this._currentTextLength = -1, this.k = !1, this.data = e, this.elem = t, this.comp = t.comp, this.finalS = 0, this.finalE = 0, this.initDynamicPropertyContainer(t), this.s = PropertyFactory.getProp(t, e.s || {
				k: 0
			}, 0, 0, this), this.e = "e" in e ? PropertyFactory.getProp(t, e.e, 0, 0, this) : {
				v: 100
			}, this.o = PropertyFactory.getProp(t, e.o || {
				k: 0
			}, 0, 0, this), this.xe = PropertyFactory.getProp(t, e.xe || {
				k: 0
			}, 0, 0, this), this.ne = PropertyFactory.getProp(t, e.ne || {
				k: 0
			}, 0, 0, this), this.sm = PropertyFactory.getProp(t, e.sm || {
				k: 100
			}, 0, 0, this), this.a = PropertyFactory.getProp(t, e.a, 0, .01, this), this.dynamicProperties.length || this.getValue()
		}
		return i.prototype = {
			getMult: function (i) {
				this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue();
				var s = 0,
					a = 0,
					n = 1,
					o = 1;
				this.ne.v > 0 ? s = this.ne.v / 100 : a = -this.ne.v / 100, this.xe.v > 0 ? n = 1 - this.xe.v / 100 : o = 1 + this.xe.v / 100;
				var h = BezierFactory.getBezierEasing(s, a, n, o).get,
					l = 0,
					p = this.finalS,
					f = this.finalE,
					m = this.data.sh;
				if (2 === m) l = h(l = f === p ? i >= f ? 1 : 0 : t(0, e(.5 / (f - p) + (i - p) / (f - p), 1)));
				else if (3 === m) l = h(l = f === p ? i >= f ? 0 : 1 : 1 - t(0, e(.5 / (f - p) + (i - p) / (f - p), 1)));
				else if (4 === m) f === p ? l = 0 : (l = t(0, e(.5 / (f - p) + (i - p) / (f - p), 1))) < .5 ? l *= 2 : l = 1 - 2 * (l - .5), l = h(l);
				else if (5 === m) {
					if (f === p) l = 0;
					else {
						var c = f - p,
							d = -c / 2 + (i = e(t(0, i + .5 - p), f - p)),
							u = c / 2;
						l = Math.sqrt(1 - d * d / (u * u))
					}
					l = h(l)
				} else 6 === m ? (f === p ? l = 0 : (i = e(t(0, i + .5 - p), f - p), l = (1 + Math.cos(Math.PI + 2 * Math.PI * i / (f - p))) / 2), l = h(l)) : (i >= r(p) && (l = t(0, e(i - p < 0 ? e(f, 1) - (p - i) : f - i, 1))), l = h(l));
				if (100 !== this.sm.v) {
					var y = .01 * this.sm.v;
					0 === y && (y = 1e-8);
					var g = .5 - .5 * y;
					l < g ? l = 0 : (l = (l - g) / y) > 1 && (l = 1)
				}
				return l * this.a.v
			},
			getValue: function (t) {
				this.iterateDynamicProperties(), this._mdf = t || this._mdf, this._currentTextLength = this.elem.textProperty.currentData.l.length || 0, t && 2 === this.data.r && (this.e.v = this._currentTextLength);
				var e = 2 === this.data.r ? 1 : 100 / this.data.totalChars,
					r = this.o.v / e,
					i = this.s.v / e + r,
					s = this.e.v / e + r;
				if (i > s) {
					var a = i;
					i = s, s = a
				}
				this.finalS = i, this.finalE = s
			}
		}, extendPrototype([DynamicPropertyContainer], i), {
			getTextSelectorProp: function (t, e, r) {
				return new i(t, e, r)
			}
		}
	}();

	function TextAnimatorDataProperty(t, e, r) {
		var i = {
				propType: !1
			},
			s = PropertyFactory.getProp,
			a = e.a;
		this.a = {
			r: a.r ? s(t, a.r, 0, degToRads, r) : i,
			rx: a.rx ? s(t, a.rx, 0, degToRads, r) : i,
			ry: a.ry ? s(t, a.ry, 0, degToRads, r) : i,
			sk: a.sk ? s(t, a.sk, 0, degToRads, r) : i,
			sa: a.sa ? s(t, a.sa, 0, degToRads, r) : i,
			s: a.s ? s(t, a.s, 1, .01, r) : i,
			a: a.a ? s(t, a.a, 1, 0, r) : i,
			o: a.o ? s(t, a.o, 0, .01, r) : i,
			p: a.p ? s(t, a.p, 1, 0, r) : i,
			sw: a.sw ? s(t, a.sw, 0, 0, r) : i,
			sc: a.sc ? s(t, a.sc, 1, 0, r) : i,
			fc: a.fc ? s(t, a.fc, 1, 0, r) : i,
			fh: a.fh ? s(t, a.fh, 0, 0, r) : i,
			fs: a.fs ? s(t, a.fs, 0, .01, r) : i,
			fb: a.fb ? s(t, a.fb, 0, .01, r) : i,
			t: a.t ? s(t, a.t, 0, 0, r) : i
		}, this.s = TextSelectorProp.getTextSelectorProp(t, e.s, r), this.s.t = e.s.t
	}

	function TextAnimatorProperty(t, e, r) {
		this._isFirstFrame = !0, this._hasMaskedPath = !1, this._frameId = -1, this._textData = t, this._renderType = e, this._elem = r, this._animatorsData = createSizedArray(this._textData.a.length), this._pathData = {}, this._moreOptions = {
			alignment: {}
		}, this.renderedLetters = [], this.lettersChangedFlag = !1, this.initDynamicPropertyContainer(r)
	}

	function ITextElement() {}
	TextAnimatorProperty.prototype.searchProperties = function () {
		var t, e, r = this._textData.a.length,
			i = PropertyFactory.getProp;
		for (t = 0; t < r; t += 1) e = this._textData.a[t], this._animatorsData[t] = new TextAnimatorDataProperty(this._elem, e, this);
		this._textData.p && "m" in this._textData.p ? (this._pathData = {
			a: i(this._elem, this._textData.p.a, 0, 0, this),
			f: i(this._elem, this._textData.p.f, 0, 0, this),
			l: i(this._elem, this._textData.p.l, 0, 0, this),
			r: i(this._elem, this._textData.p.r, 0, 0, this),
			p: i(this._elem, this._textData.p.p, 0, 0, this),
			m: this._elem.maskManager.getMaskProperty(this._textData.p.m)
		}, this._hasMaskedPath = !0) : this._hasMaskedPath = !1, this._moreOptions.alignment = i(this._elem, this._textData.m.a, 1, 0, this)
	}, TextAnimatorProperty.prototype.getMeasures = function (t, e) {
		if (this.lettersChangedFlag = e, this._mdf || this._isFirstFrame || e || this._hasMaskedPath && this._pathData.m._mdf) {
			this._isFirstFrame = !1;
			var r, i, s, a, n, o, h, l, p, f, m, c, d, u, y, g, v, b, P, x = this._moreOptions.alignment.v,
				E = this._animatorsData,
				S = this._textData,
				C = this.mHelper,
				_ = this._renderType,
				A = this.renderedLetters.length,
				T = t.l;
			if (this._hasMaskedPath) {
				if (P = this._pathData.m, !this._pathData.n || this._pathData._mdf) {
					var M, k = P.v;
					for (this._pathData.r.v && (k = k.reverse()), n = {
							tLength: 0,
							segments: []
						}, a = k._length - 1, g = 0, s = 0; s < a; s += 1) M = bez.buildBezierData(k.v[s], k.v[s + 1], [k.o[s][0] - k.v[s][0], k.o[s][1] - k.v[s][1]], [k.i[s + 1][0] - k.v[s + 1][0], k.i[s + 1][1] - k.v[s + 1][1]]), n.tLength += M.segmentLength, n.segments.push(M), g += M.segmentLength;
					s = a, P.v.c && (M = bez.buildBezierData(k.v[s], k.v[0], [k.o[s][0] - k.v[s][0], k.o[s][1] - k.v[s][1]], [k.i[0][0] - k.v[0][0], k.i[0][1] - k.v[0][1]]), n.tLength += M.segmentLength, n.segments.push(M), g += M.segmentLength), this._pathData.pi = n
				}
				if (n = this._pathData.pi, o = this._pathData.f.v, m = 0, f = 1, l = 0, p = !0, u = n.segments, o < 0 && P.v.c)
					for (n.tLength < Math.abs(o) && (o = -Math.abs(o) % n.tLength), f = (d = u[m = u.length - 1].points).length - 1; o < 0;) o += d[f].partialLength, (f -= 1) < 0 && (f = (d = u[m -= 1].points).length - 1);
				c = (d = u[m].points)[f - 1], y = (h = d[f]).partialLength
			}
			a = T.length, r = 0, i = 0;
			var D, F, w, I, B, V = 1.2 * t.finalSize * .714,
				R = !0;
			w = E.length;
			var L, z, G, O, N, H, j, q, W, $, Y, X, Z = -1,
				K = o,
				J = m,
				U = f,
				Q = -1,
				tt = "",
				et = this.defaultPropsArray;
			if (2 === t.j || 1 === t.j) {
				var rt = 0,
					it = 0,
					st = 2 === t.j ? -.5 : -1,
					at = 0,
					nt = !0;
				for (s = 0; s < a; s += 1)
					if (T[s].n) {
						for (rt && (rt += it); at < s;) T[at].animatorJustifyOffset = rt, at += 1;
						rt = 0, nt = !0
					} else {
						for (F = 0; F < w; F += 1)(D = E[F].a).t.propType && (nt && 2 === t.j && (it += D.t.v * st), (B = E[F].s.getMult(T[s].anIndexes[F], S.a[F].s.totalChars)).length ? rt += D.t.v * B[0] * st : rt += D.t.v * B * st);
						nt = !1
					} for (rt && (rt += it); at < s;) T[at].animatorJustifyOffset = rt, at += 1
			}
			for (s = 0; s < a; s += 1) {
				if (C.reset(), O = 1, T[s].n) r = 0, i += t.yOffset, i += R ? 1 : 0, o = K, R = !1, this._hasMaskedPath && (f = U, c = (d = u[m = J].points)[f - 1], y = (h = d[f]).partialLength, l = 0), tt = "", Y = "", W = "", X = "", et = this.defaultPropsArray;
				else {
					if (this._hasMaskedPath) {
						if (Q !== T[s].line) {
							switch (t.j) {
								case 1:
									o += g - t.lineWidths[T[s].line];
									break;
								case 2:
									o += (g - t.lineWidths[T[s].line]) / 2
							}
							Q = T[s].line
						}
						Z !== T[s].ind && (T[Z] && (o += T[Z].extra), o += T[s].an / 2, Z = T[s].ind), o += x[0] * T[s].an * .005;
						var ot = 0;
						for (F = 0; F < w; F += 1)(D = E[F].a).p.propType && ((B = E[F].s.getMult(T[s].anIndexes[F], S.a[F].s.totalChars)).length ? ot += D.p.v[0] * B[0] : ot += D.p.v[0] * B), D.a.propType && ((B = E[F].s.getMult(T[s].anIndexes[F], S.a[F].s.totalChars)).length ? ot += D.a.v[0] * B[0] : ot += D.a.v[0] * B);
						for (p = !0, this._pathData.a.v && (o = .5 * T[0].an + (g - this._pathData.f.v - .5 * T[0].an - .5 * T[T.length - 1].an) * Z / (a - 1), o += this._pathData.f.v); p;) l + y >= o + ot || !d ? (v = (o + ot - l) / h.partialLength, z = c.point[0] + (h.point[0] - c.point[0]) * v, G = c.point[1] + (h.point[1] - c.point[1]) * v, C.translate(-x[0] * T[s].an * .005, -x[1] * V * .01), p = !1) : d && (l += h.partialLength, (f += 1) >= d.length && (f = 0, u[m += 1] ? d = u[m].points : P.v.c ? (f = 0, d = u[m = 0].points) : (l -= h.partialLength, d = null)), d && (c = h, y = (h = d[f]).partialLength));
						L = T[s].an / 2 - T[s].add, C.translate(-L, 0, 0)
					} else L = T[s].an / 2 - T[s].add, C.translate(-L, 0, 0), C.translate(-x[0] * T[s].an * .005, -x[1] * V * .01, 0);
					for (F = 0; F < w; F += 1)(D = E[F].a).t.propType && (B = E[F].s.getMult(T[s].anIndexes[F], S.a[F].s.totalChars), 0 === r && 0 === t.j || (this._hasMaskedPath ? B.length ? o += D.t.v * B[0] : o += D.t.v * B : B.length ? r += D.t.v * B[0] : r += D.t.v * B));
					for (t.strokeWidthAnim && (H = t.sw || 0), t.strokeColorAnim && (N = t.sc ? [t.sc[0], t.sc[1], t.sc[2]] : [0, 0, 0]), t.fillColorAnim && t.fc && (j = [t.fc[0], t.fc[1], t.fc[2]]), F = 0; F < w; F += 1)(D = E[F].a).a.propType && ((B = E[F].s.getMult(T[s].anIndexes[F], S.a[F].s.totalChars)).length ? C.translate(-D.a.v[0] * B[0], -D.a.v[1] * B[1], D.a.v[2] * B[2]) : C.translate(-D.a.v[0] * B, -D.a.v[1] * B, D.a.v[2] * B));
					for (F = 0; F < w; F += 1)(D = E[F].a).s.propType && ((B = E[F].s.getMult(T[s].anIndexes[F], S.a[F].s.totalChars)).length ? C.scale(1 + (D.s.v[0] - 1) * B[0], 1 + (D.s.v[1] - 1) * B[1], 1) : C.scale(1 + (D.s.v[0] - 1) * B, 1 + (D.s.v[1] - 1) * B, 1));
					for (F = 0; F < w; F += 1) {
						if (D = E[F].a, B = E[F].s.getMult(T[s].anIndexes[F], S.a[F].s.totalChars), D.sk.propType && (B.length ? C.skewFromAxis(-D.sk.v * B[0], D.sa.v * B[1]) : C.skewFromAxis(-D.sk.v * B, D.sa.v * B)), D.r.propType && (B.length ? C.rotateZ(-D.r.v * B[2]) : C.rotateZ(-D.r.v * B)), D.ry.propType && (B.length ? C.rotateY(D.ry.v * B[1]) : C.rotateY(D.ry.v * B)), D.rx.propType && (B.length ? C.rotateX(D.rx.v * B[0]) : C.rotateX(D.rx.v * B)), D.o.propType && (B.length ? O += (D.o.v * B[0] - O) * B[0] : O += (D.o.v * B - O) * B), t.strokeWidthAnim && D.sw.propType && (B.length ? H += D.sw.v * B[0] : H += D.sw.v * B), t.strokeColorAnim && D.sc.propType)
							for (q = 0; q < 3; q += 1) B.length ? N[q] += (D.sc.v[q] - N[q]) * B[0] : N[q] += (D.sc.v[q] - N[q]) * B;
						if (t.fillColorAnim && t.fc) {
							if (D.fc.propType)
								for (q = 0; q < 3; q += 1) B.length ? j[q] += (D.fc.v[q] - j[q]) * B[0] : j[q] += (D.fc.v[q] - j[q]) * B;
							D.fh.propType && (j = B.length ? addHueToRGB(j, D.fh.v * B[0]) : addHueToRGB(j, D.fh.v * B)), D.fs.propType && (j = B.length ? addSaturationToRGB(j, D.fs.v * B[0]) : addSaturationToRGB(j, D.fs.v * B)), D.fb.propType && (j = B.length ? addBrightnessToRGB(j, D.fb.v * B[0]) : addBrightnessToRGB(j, D.fb.v * B))
						}
					}
					for (F = 0; F < w; F += 1)(D = E[F].a).p.propType && (B = E[F].s.getMult(T[s].anIndexes[F], S.a[F].s.totalChars), this._hasMaskedPath ? B.length ? C.translate(0, D.p.v[1] * B[0], -D.p.v[2] * B[1]) : C.translate(0, D.p.v[1] * B, -D.p.v[2] * B) : B.length ? C.translate(D.p.v[0] * B[0], D.p.v[1] * B[1], -D.p.v[2] * B[2]) : C.translate(D.p.v[0] * B, D.p.v[1] * B, -D.p.v[2] * B));
					if (t.strokeWidthAnim && (W = H < 0 ? 0 : H), t.strokeColorAnim && ($ = "rgb(" + Math.round(255 * N[0]) + "," + Math.round(255 * N[1]) + "," + Math.round(255 * N[2]) + ")"), t.fillColorAnim && t.fc && (Y = "rgb(" + Math.round(255 * j[0]) + "," + Math.round(255 * j[1]) + "," + Math.round(255 * j[2]) + ")"), this._hasMaskedPath) {
						if (C.translate(0, -t.ls), C.translate(0, x[1] * V * .01 + i, 0), this._pathData.p.v) {
							b = (h.point[1] - c.point[1]) / (h.point[0] - c.point[0]);
							var ht = 180 * Math.atan(b) / Math.PI;
							h.point[0] < c.point[0] && (ht += 180), C.rotate(-ht * Math.PI / 180)
						}
						C.translate(z, G, 0), o -= x[0] * T[s].an * .005, T[s + 1] && Z !== T[s + 1].ind && (o += T[s].an / 2, o += .001 * t.tr * t.finalSize)
					} else {
						switch (C.translate(r, i, 0), t.ps && C.translate(t.ps[0], t.ps[1] + t.ascent, 0), t.j) {
							case 1:
								C.translate(T[s].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[T[s].line]), 0, 0);
								break;
							case 2:
								C.translate(T[s].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[T[s].line]) / 2, 0, 0)
						}
						C.translate(0, -t.ls), C.translate(L, 0, 0), C.translate(x[0] * T[s].an * .005, x[1] * V * .01, 0), r += T[s].l + .001 * t.tr * t.finalSize
					}
					"html" === _ ? tt = C.toCSS() : "svg" === _ ? tt = C.to2dCSS() : et = [C.props[0], C.props[1], C.props[2], C.props[3], C.props[4], C.props[5], C.props[6], C.props[7], C.props[8], C.props[9], C.props[10], C.props[11], C.props[12], C.props[13], C.props[14], C.props[15]], X = O
				}
				A <= s ? (I = new LetterProps(X, W, $, Y, tt, et), this.renderedLetters.push(I), A += 1, this.lettersChangedFlag = !0) : (I = this.renderedLetters[s], this.lettersChangedFlag = I.update(X, W, $, Y, tt, et) || this.lettersChangedFlag)
			}
		}
	}, TextAnimatorProperty.prototype.getValue = function () {
		this._elem.globalData.frameId !== this._frameId && (this._frameId = this._elem.globalData.frameId, this.iterateDynamicProperties())
	}, TextAnimatorProperty.prototype.mHelper = new Matrix, TextAnimatorProperty.prototype.defaultPropsArray = [], extendPrototype([DynamicPropertyContainer], TextAnimatorProperty), ITextElement.prototype.initElement = function (t, e, r) {
		this.lettersChangedFlag = !0, this.initFrame(), this.initBaseData(t, e, r), this.textProperty = new TextProperty(this, t.t, this.dynamicProperties), this.textAnimator = new TextAnimatorProperty(t.t, this.renderType, this), this.initTransform(t, e, r), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide(), this.textAnimator.searchProperties(this.dynamicProperties)
	}, ITextElement.prototype.prepareFrame = function (t) {
		this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), (this.textProperty._mdf || this.textProperty._isFirstFrame) && (this.buildNewText(), this.textProperty._isFirstFrame = !1, this.textProperty._mdf = !1)
	}, ITextElement.prototype.createPathShape = function (t, e) {
		var r, i, s = e.length,
			a = "";
		for (r = 0; r < s; r += 1) "sh" === e[r].ty && (i = e[r].ks.k, a += buildShapeString(i, i.i.length, !0, t));
		return a
	}, ITextElement.prototype.updateDocumentData = function (t, e) {
		this.textProperty.updateDocumentData(t, e)
	}, ITextElement.prototype.canResizeFont = function (t) {
		this.textProperty.canResizeFont(t)
	}, ITextElement.prototype.setMinimumFontSize = function (t) {
		this.textProperty.setMinimumFontSize(t)
	}, ITextElement.prototype.applyTextPropertiesToMatrix = function (t, e, r, i, s) {
		switch (t.ps && e.translate(t.ps[0], t.ps[1] + t.ascent, 0), e.translate(0, -t.ls, 0), t.j) {
			case 1:
				e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]), 0, 0);
				break;
			case 2:
				e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]) / 2, 0, 0)
		}
		e.translate(i, s, 0)
	}, ITextElement.prototype.buildColor = function (t) {
		return "rgb(" + Math.round(255 * t[0]) + "," + Math.round(255 * t[1]) + "," + Math.round(255 * t[2]) + ")"
	}, ITextElement.prototype.emptyProp = new LetterProps, ITextElement.prototype.destroy = function () {};
	var emptyShapeData = {
		shapes: []
	};

	function SVGTextLottieElement(t, e, r) {
		this.textSpans = [], this.renderType = "svg", this.initElement(t, e, r)
	}

	function ISolidElement(t, e, r) {
		this.initElement(t, e, r)
	}

	function NullElement(t, e, r) {
		this.initFrame(), this.initBaseData(t, e, r), this.initFrame(), this.initTransform(t, e, r), this.initHierarchy()
	}

	function SVGRendererBase() {}

	function ICompElement() {}

	function SVGCompElement(t, e, r) {
		this.layers = t.layers, this.supports3d = !0, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
			_placeholder: !0
		}
	}

	function SVGRenderer(t, e) {
		this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.svgElement = createNS("svg");
		var r = "";
		if (e && e.title) {
			var i = createNS("title"),
				s = createElementID();
			i.setAttribute("id", s), i.textContent = e.title, this.svgElement.appendChild(i), r += s
		}
		if (e && e.description) {
			var a = createNS("desc"),
				n = createElementID();
			a.setAttribute("id", n), a.textContent = e.description, this.svgElement.appendChild(a), r += " " + n
		}
		r && this.svgElement.setAttribute("aria-labelledby", r);
		var o = createNS("defs");
		this.svgElement.appendChild(o);
		var h = createNS("g");
		this.svgElement.appendChild(h), this.layerElement = h, this.renderConfig = {
			preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
			imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
			contentVisibility: e && e.contentVisibility || "visible",
			progressiveLoad: e && e.progressiveLoad || !1,
			hideOnTransparent: !(e && !1 === e.hideOnTransparent),
			viewBoxOnly: e && e.viewBoxOnly || !1,
			viewBoxSize: e && e.viewBoxSize || !1,
			className: e && e.className || "",
			id: e && e.id || "",
			focusable: e && e.focusable,
			filterSize: {
				width: e && e.filterSize && e.filterSize.width || "100%",
				height: e && e.filterSize && e.filterSize.height || "100%",
				x: e && e.filterSize && e.filterSize.x || "0%",
				y: e && e.filterSize && e.filterSize.y || "0%"
			},
			width: e && e.width,
			height: e && e.height,
			runExpressions: !e || void 0 === e.runExpressions || e.runExpressions
		}, this.globalData = {
			_mdf: !1,
			frameNum: -1,
			defs: o,
			renderConfig: this.renderConfig
		}, this.elements = [], this.pendingElements = [], this.destroyed = !1, this.rendererType = "svg"
	}

	function CVContextData() {
		var t;
		this.saved = [], this.cArrPos = 0, this.cTr = new Matrix, this.cO = 1;
		for (this.savedOp = createTypedArray("float32", 15), t = 0; t < 15; t += 1) this.saved[t] = createTypedArray("float32", 16);
		this._length = 15
	}

	function ShapeTransformManager() {
		this.sequences = {}, this.sequenceList = [], this.transform_key_count = 0
	}
	extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], SVGTextLottieElement), SVGTextLottieElement.prototype.createContent = function () {
		this.data.singleShape && !this.globalData.fontManager.chars && (this.textContainer = createNS("text"))
	}, SVGTextLottieElement.prototype.buildTextContents = function (t) {
		for (var e = 0, r = t.length, i = [], s = ""; e < r;) t[e] === String.fromCharCode(13) || t[e] === String.fromCharCode(3) ? (i.push(s), s = "") : s += t[e], e += 1;
		return i.push(s), i
	}, SVGTextLottieElement.prototype.buildShapeData = function (t, e) {
		if (t.shapes && t.shapes.length) {
			var r = t.shapes[0];
			if (r.it) {
				var i = r.it[r.it.length - 1];
				i.s && (i.s.k[0] = e, i.s.k[1] = e)
			}
		}
		return t
	}, SVGTextLottieElement.prototype.buildNewText = function () {
		var t, e;
		this.addDynamicProperty(this);
		var r = this.textProperty.currentData;
		this.renderedLetters = createSizedArray(r ? r.l.length : 0), r.fc ? this.layerElement.setAttribute("fill", this.buildColor(r.fc)) : this.layerElement.setAttribute("fill", "rgba(0,0,0,0)"), r.sc && (this.layerElement.setAttribute("stroke", this.buildColor(r.sc)), this.layerElement.setAttribute("stroke-width", r.sw)), this.layerElement.setAttribute("font-size", r.finalSize);
		var i = this.globalData.fontManager.getFontByName(r.f);
		if (i.fClass) this.layerElement.setAttribute("class", i.fClass);
		else {
			this.layerElement.setAttribute("font-family", i.fFamily);
			var s = r.fWeight,
				a = r.fStyle;
			this.layerElement.setAttribute("font-style", a), this.layerElement.setAttribute("font-weight", s)
		}
		this.layerElement.setAttribute("aria-label", r.t);
		var n, o = r.l || [],
			h = !!this.globalData.fontManager.chars;
		e = o.length;
		var l = this.mHelper,
			p = this.data.singleShape,
			f = 0,
			m = 0,
			c = !0,
			d = .001 * r.tr * r.finalSize;
		if (!p || h || r.sz) {
			var u, y = this.textSpans.length;
			for (t = 0; t < e; t += 1) {
				if (this.textSpans[t] || (this.textSpans[t] = {
						span: null,
						childSpan: null,
						glyph: null
					}), !h || !p || 0 === t) {
					if (n = y > t ? this.textSpans[t].span : createNS(h ? "g" : "text"), y <= t) {
						if (n.setAttribute("stroke-linecap", "butt"), n.setAttribute("stroke-linejoin", "round"), n.setAttribute("stroke-miterlimit", "4"), this.textSpans[t].span = n, h) {
							var g = createNS("g");
							n.appendChild(g), this.textSpans[t].childSpan = g
						}
						this.textSpans[t].span = n, this.layerElement.appendChild(n)
					}
					n.style.display = "inherit"
				}
				if (l.reset(), p && (o[t].n && (f = -d, m += r.yOffset, m += c ? 1 : 0, c = !1), this.applyTextPropertiesToMatrix(r, l, o[t].line, f, m), f += o[t].l || 0, f += d), h) {
					var v;
					if (1 === (u = this.globalData.fontManager.getCharData(r.finalText[t], i.fStyle, this.globalData.fontManager.getFontByName(r.f).fFamily)).t) v = new SVGCompElement(u.data, this.globalData, this);
					else {
						var b = emptyShapeData;
						u.data && u.data.shapes && (b = this.buildShapeData(u.data, r.finalSize)), v = new SVGShapeElement(b, this.globalData, this)
					}
					if (this.textSpans[t].glyph) {
						var P = this.textSpans[t].glyph;
						this.textSpans[t].childSpan.removeChild(P.layerElement), P.destroy()
					}
					this.textSpans[t].glyph = v, v._debug = !0, v.prepareFrame(0), v.renderFrame(), this.textSpans[t].childSpan.appendChild(v.layerElement), 1 === u.t && this.textSpans[t].childSpan.setAttribute("transform", "scale(" + r.finalSize / 100 + "," + r.finalSize / 100 + ")")
				} else p && n.setAttribute("transform", "translate(" + l.props[12] + "," + l.props[13] + ")"), n.textContent = o[t].val, n.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve")
			}
			p && n && n.setAttribute("d", "")
		} else {
			var x = this.textContainer,
				E = "start";
			switch (r.j) {
				case 1:
					E = "end";
					break;
				case 2:
					E = "middle";
					break;
				default:
					E = "start"
			}
			x.setAttribute("text-anchor", E), x.setAttribute("letter-spacing", d);
			var S = this.buildTextContents(r.finalText);
			for (e = S.length, m = r.ps ? r.ps[1] + r.ascent : 0, t = 0; t < e; t += 1)(n = this.textSpans[t].span || createNS("tspan")).textContent = S[t], n.setAttribute("x", 0), n.setAttribute("y", m), n.style.display = "inherit", x.appendChild(n), this.textSpans[t] || (this.textSpans[t] = {
				span: null,
				glyph: null
			}), this.textSpans[t].span = n, m += r.finalLineHeight;
			this.layerElement.appendChild(x)
		}
		for (; t < this.textSpans.length;) this.textSpans[t].span.style.display = "none", t += 1;
		this._sizeChanged = !0
	}, SVGTextLottieElement.prototype.sourceRectAtTime = function () {
		if (this.prepareFrame(this.comp.renderedFrame - this.data.st), this.renderInnerContent(), this._sizeChanged) {
			this._sizeChanged = !1;
			var t = this.layerElement.getBBox();
			this.bbox = {
				top: t.y,
				left: t.x,
				width: t.width,
				height: t.height
			}
		}
		return this.bbox
	}, SVGTextLottieElement.prototype.getValue = function () {
		var t, e, r = this.textSpans.length;
		for (this.renderedFrame = this.comp.renderedFrame, t = 0; t < r; t += 1)(e = this.textSpans[t].glyph) && (e.prepareFrame(this.comp.renderedFrame - this.data.st), e._mdf && (this._mdf = !0))
	}, SVGTextLottieElement.prototype.renderInnerContent = function () {
		if ((!this.data.singleShape || this._mdf) && (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)) {
			var t, e;
			this._sizeChanged = !0;
			var r, i, s, a = this.textAnimator.renderedLetters,
				n = this.textProperty.currentData.l;
			for (e = n.length, t = 0; t < e; t += 1) n[t].n || (r = a[t], i = this.textSpans[t].span, (s = this.textSpans[t].glyph) && s.renderFrame(), r._mdf.m && i.setAttribute("transform", r.m), r._mdf.o && i.setAttribute("opacity", r.o), r._mdf.sw && i.setAttribute("stroke-width", r.sw), r._mdf.sc && i.setAttribute("stroke", r.sc), r._mdf.fc && i.setAttribute("fill", r.fc))
		}
	}, extendPrototype([IImageElement], ISolidElement), ISolidElement.prototype.createContent = function () {
		var t = createNS("rect");
		t.setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.layerElement.appendChild(t)
	}, NullElement.prototype.prepareFrame = function (t) {
		this.prepareProperties(t, !0)
	}, NullElement.prototype.renderFrame = function () {}, NullElement.prototype.getBaseElement = function () {
		return null
	}, NullElement.prototype.destroy = function () {}, NullElement.prototype.sourceRectAtTime = function () {}, NullElement.prototype.hide = function () {}, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement], NullElement), extendPrototype([BaseRenderer], SVGRendererBase), SVGRendererBase.prototype.createNull = function (t) {
		return new NullElement(t, this.globalData, this)
	}, SVGRendererBase.prototype.createShape = function (t) {
		return new SVGShapeElement(t, this.globalData, this)
	}, SVGRendererBase.prototype.createText = function (t) {
		return new SVGTextLottieElement(t, this.globalData, this)
	}, SVGRendererBase.prototype.createImage = function (t) {
		return new IImageElement(t, this.globalData, this)
	}, SVGRendererBase.prototype.createSolid = function (t) {
		return new ISolidElement(t, this.globalData, this)
	}, SVGRendererBase.prototype.configAnimation = function (t) {
		this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this.svgElement.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink"), this.renderConfig.viewBoxSize ? this.svgElement.setAttribute("viewBox", this.renderConfig.viewBoxSize) : this.svgElement.setAttribute("viewBox", "0 0 " + t.w + " " + t.h), this.renderConfig.viewBoxOnly || (this.svgElement.setAttribute("width", t.w), this.svgElement.setAttribute("height", t.h), this.svgElement.style.width = "100%", this.svgElement.style.height = "100%", this.svgElement.style.transform = "translate3d(0,0,0)", this.svgElement.style.contentVisibility = this.renderConfig.contentVisibility), this.renderConfig.width && this.svgElement.setAttribute("width", this.renderConfig.width), this.renderConfig.height && this.svgElement.setAttribute("height", this.renderConfig.height), this.renderConfig.className && this.svgElement.setAttribute("class", this.renderConfig.className), this.renderConfig.id && this.svgElement.setAttribute("id", this.renderConfig.id), void 0 !== this.renderConfig.focusable && this.svgElement.setAttribute("focusable", this.renderConfig.focusable), this.svgElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio), this.animationItem.wrapper.appendChild(this.svgElement);
		var e = this.globalData.defs;
		this.setupGlobalData(t, e), this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.data = t;
		var r = createNS("clipPath"),
			i = createNS("rect");
		i.setAttribute("width", t.w), i.setAttribute("height", t.h), i.setAttribute("x", 0), i.setAttribute("y", 0);
		var s = createElementID();
		r.setAttribute("id", s), r.appendChild(i), this.layerElement.setAttribute("clip-path", "url(" + getLocationHref() + "#" + s + ")"), e.appendChild(r), this.layers = t.layers, this.elements = createSizedArray(t.layers.length)
	}, SVGRendererBase.prototype.destroy = function () {
		var t;
		this.animationItem.wrapper && (this.animationItem.wrapper.innerText = ""), this.layerElement = null, this.globalData.defs = null;
		var e = this.layers ? this.layers.length : 0;
		for (t = 0; t < e; t += 1) this.elements[t] && this.elements[t].destroy();
		this.elements.length = 0, this.destroyed = !0, this.animationItem = null
	}, SVGRendererBase.prototype.updateContainerSize = function () {}, SVGRendererBase.prototype.findIndexByInd = function (t) {
		var e = 0,
			r = this.layers.length;
		for (e = 0; e < r; e += 1)
			if (this.layers[e].ind === t) return e;
		return -1
	}, SVGRendererBase.prototype.buildItem = function (t) {
		var e = this.elements;
		if (!e[t] && 99 !== this.layers[t].ty) {
			e[t] = !0;
			var r = this.createItem(this.layers[t]);
			if (e[t] = r, getExpressionsPlugin() && (0 === this.layers[t].ty && this.globalData.projectInterface.registerComposition(r), r.initExpressions()), this.appendElementInPos(r, t), this.layers[t].tt) {
				var i = "tp" in this.layers[t] ? this.findIndexByInd(this.layers[t].tp) : t - 1;
				if (-1 === i) return;
				if (this.elements[i] && !0 !== this.elements[i]) {
					var s = e[i].getMatte(this.layers[t].tt);
					r.setMatte(s)
				} else this.buildItem(i), this.addPendingElement(r)
			}
		}
	}, SVGRendererBase.prototype.checkPendingElements = function () {
		for (; this.pendingElements.length;) {
			var t = this.pendingElements.pop();
			if (t.checkParenting(), t.data.tt)
				for (var e = 0, r = this.elements.length; e < r;) {
					if (this.elements[e] === t) {
						var i = "tp" in t.data ? this.findIndexByInd(t.data.tp) : e - 1,
							s = this.elements[i].getMatte(this.layers[e].tt);
						t.setMatte(s);
						break
					}
					e += 1
				}
		}
	}, SVGRendererBase.prototype.renderFrame = function (t) {
		if (this.renderedFrame !== t && !this.destroyed) {
			var e;
			null === t ? t = this.renderedFrame : this.renderedFrame = t, this.globalData.frameNum = t, this.globalData.frameId += 1, this.globalData.projectInterface.currentFrame = t, this.globalData._mdf = !1;
			var r = this.layers.length;
			for (this.completeLayers || this.checkLayers(t), e = r - 1; e >= 0; e -= 1)(this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
			if (this.globalData._mdf)
				for (e = 0; e < r; e += 1)(this.completeLayers || this.elements[e]) && this.elements[e].renderFrame()
		}
	}, SVGRendererBase.prototype.appendElementInPos = function (t, e) {
		var r = t.getBaseElement();
		if (r) {
			for (var i, s = 0; s < e;) this.elements[s] && !0 !== this.elements[s] && this.elements[s].getBaseElement() && (i = this.elements[s].getBaseElement()), s += 1;
			i ? this.layerElement.insertBefore(r, i) : this.layerElement.appendChild(r)
		}
	}, SVGRendererBase.prototype.hide = function () {
		this.layerElement.style.display = "none"
	}, SVGRendererBase.prototype.show = function () {
		this.layerElement.style.display = "block"
	}, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement], ICompElement), ICompElement.prototype.initElement = function (t, e, r) {
		this.initFrame(), this.initBaseData(t, e, r), this.initTransform(t, e, r), this.initRenderable(), this.initHierarchy(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), !this.data.xt && e.progressiveLoad || this.buildAllItems(), this.hide()
	}, ICompElement.prototype.prepareFrame = function (t) {
		if (this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.isInRange || this.data.xt) {
			if (this.tm._placeholder) this.renderedFrame = t / this.data.sr;
			else {
				var e = this.tm.v;
				e === this.data.op && (e = this.data.op - 1), this.renderedFrame = e
			}
			var r, i = this.elements.length;
			for (this.completeLayers || this.checkLayers(this.renderedFrame), r = i - 1; r >= 0; r -= 1)(this.completeLayers || this.elements[r]) && (this.elements[r].prepareFrame(this.renderedFrame - this.layers[r].st), this.elements[r]._mdf && (this._mdf = !0))
		}
	}, ICompElement.prototype.renderInnerContent = function () {
		var t, e = this.layers.length;
		for (t = 0; t < e; t += 1)(this.completeLayers || this.elements[t]) && this.elements[t].renderFrame()
	}, ICompElement.prototype.setElements = function (t) {
		this.elements = t
	}, ICompElement.prototype.getElements = function () {
		return this.elements
	}, ICompElement.prototype.destroyElements = function () {
		var t, e = this.layers.length;
		for (t = 0; t < e; t += 1) this.elements[t] && this.elements[t].destroy()
	}, ICompElement.prototype.destroy = function () {
		this.destroyElements(), this.destroyBaseElement()
	}, extendPrototype([SVGRendererBase, ICompElement, SVGBaseElement], SVGCompElement), SVGCompElement.prototype.createComp = function (t) {
		return new SVGCompElement(t, this.globalData, this)
	}, extendPrototype([SVGRendererBase], SVGRenderer), SVGRenderer.prototype.createComp = function (t) {
		return new SVGCompElement(t, this.globalData, this)
	}, CVContextData.prototype.duplicate = function () {
		var t = 2 * this._length,
			e = this.savedOp;
		this.savedOp = createTypedArray("float32", t), this.savedOp.set(e);
		var r = 0;
		for (r = this._length; r < t; r += 1) this.saved[r] = createTypedArray("float32", 16);
		this._length = t
	}, CVContextData.prototype.reset = function () {
		this.cArrPos = 0, this.cTr.reset(), this.cO = 1
	}, CVContextData.prototype.popTransform = function () {
		var t, e = this.saved[this.cArrPos],
			r = this.cTr.props;
		for (t = 0; t < 16; t += 1) r[t] = e[t];
		return e
	}, CVContextData.prototype.popOpacity = function () {
		var t = this.savedOp[this.cArrPos];
		return this.cO = t, t
	}, CVContextData.prototype.pop = function () {
		return this.cArrPos -= 1, {
			transform: this.popTransform(),
			opacity: this.popOpacity()
		}
	}, CVContextData.prototype.push = function () {
		var t, e = this.cTr.props;
		this._length <= this.cArrPos && this.duplicate();
		var r = this.saved[this.cArrPos];
		for (t = 0; t < 16; t += 1) r[t] = e[t];
		this.savedOp[this.cArrPos] = this.cO, this.cArrPos += 1
	}, CVContextData.prototype.getTransform = function () {
		return this.cTr
	}, CVContextData.prototype.getOpacity = function () {
		return this.cO
	}, CVContextData.prototype.setOpacity = function (t) {
		this.cO = t
	}, ShapeTransformManager.prototype = {
		addTransformSequence: function (t) {
			var e, r = t.length,
				i = "_";
			for (e = 0; e < r; e += 1) i += t[e].transform.key + "_";
			var s = this.sequences[i];
			return s || (s = {
				transforms: [].concat(t),
				finalTransform: new Matrix,
				_mdf: !1
			}, this.sequences[i] = s, this.sequenceList.push(s)), s
		},
		processSequence: function (t, e) {
			for (var r, i = 0, s = t.transforms.length, a = e; i < s && !e;) {
				if (t.transforms[i].transform.mProps._mdf) {
					a = !0;
					break
				}
				i += 1
			}
			if (a)
				for (t.finalTransform.reset(), i = s - 1; i >= 0; i -= 1) r = t.transforms[i].transform.mProps.v.props, t.finalTransform.transform(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12], r[13], r[14], r[15]);
			t._mdf = a
		},
		processSequences: function (t) {
			var e, r = this.sequenceList.length;
			for (e = 0; e < r; e += 1) this.processSequence(this.sequenceList[e], t)
		},
		getNewKey: function () {
			return this.transform_key_count += 1, "_" + this.transform_key_count
		}
	};
	var lumaLoader = function () {
		var t = "__lottie_element_luma_buffer",
			e = null,
			r = null,
			i = null;

		function s() {
			var s, a, n;
			e || (s = createNS("svg"), a = createNS("filter"), n = createNS("feColorMatrix"), a.setAttribute("id", t), n.setAttribute("type", "matrix"), n.setAttribute("color-interpolation-filters", "sRGB"), n.setAttribute("values", "0.3, 0.3, 0.3, 0, 0, 0.3, 0.3, 0.3, 0, 0, 0.3, 0.3, 0.3, 0, 0, 0.3, 0.3, 0.3, 0, 0"), a.appendChild(n), s.appendChild(a), s.setAttribute("id", t + "_svg"), featureSupport.svgLumaHidden && (s.style.display = "none"), i = s, document.body.appendChild(i), e = createTag("canvas"), (r = e.getContext("2d")).filter = "url(#" + t + ")", r.fillStyle = "rgba(0,0,0,0)", r.fillRect(0, 0, 1, 1))
		}
		return {
			load: s,
			get: function (i) {
				return e || s(), e.width = i.width, e.height = i.height, r.filter = "url(#" + t + ")", e
			}
		}
	};

	function createCanvas(t, e) {
		if (featureSupport.offscreenCanvas) return new OffscreenCanvas(t, e);
		var r = createTag("canvas");
		return r.width = t, r.height = e, r
	}
	var assetLoader = {
		loadLumaCanvas: lumaLoader.load,
		getLumaCanvas: lumaLoader.get,
		createCanvas: createCanvas
	};

	function CVEffects() {}

	function CVMaskElement(t, e) {
		var r;
		this.data = t, this.element = e, this.masksProperties = this.data.masksProperties || [], this.viewData = createSizedArray(this.masksProperties.length);
		var i = this.masksProperties.length,
			s = !1;
		for (r = 0; r < i; r += 1) "n" !== this.masksProperties[r].mode && (s = !0), this.viewData[r] = ShapePropertyFactory.getShapeProp(this.element, this.masksProperties[r], 3);
		this.hasMasks = s, s && this.element.addRenderableComponent(this)
	}

	function CVBaseElement() {}
	CVEffects.prototype.renderFrame = function () {}, CVMaskElement.prototype.renderFrame = function () {
		if (this.hasMasks) {
			var t, e, r, i, s = this.element.finalTransform.mat,
				a = this.element.canvasContext,
				n = this.masksProperties.length;
			for (a.beginPath(), t = 0; t < n; t += 1)
				if ("n" !== this.masksProperties[t].mode) {
					var o;
					this.masksProperties[t].inv && (a.moveTo(0, 0), a.lineTo(this.element.globalData.compSize.w, 0), a.lineTo(this.element.globalData.compSize.w, this.element.globalData.compSize.h), a.lineTo(0, this.element.globalData.compSize.h), a.lineTo(0, 0)), i = this.viewData[t].v, e = s.applyToPointArray(i.v[0][0], i.v[0][1], 0), a.moveTo(e[0], e[1]);
					var h = i._length;
					for (o = 1; o < h; o += 1) r = s.applyToTriplePoints(i.o[o - 1], i.i[o], i.v[o]), a.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]);
					r = s.applyToTriplePoints(i.o[o - 1], i.i[0], i.v[0]), a.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5])
				} this.element.globalData.renderer.save(!0), a.clip()
		}
	}, CVMaskElement.prototype.getMaskProperty = MaskElement.prototype.getMaskProperty, CVMaskElement.prototype.destroy = function () {
		this.element = null
	};
	var operationsMap = {
		1: "source-in",
		2: "source-out",
		3: "source-in",
		4: "source-out"
	};

	function CVShapeData(t, e, r, i) {
		this.styledShapes = [], this.tr = [0, 0, 0, 0, 0, 0];
		var s, a = 4;
		"rc" === e.ty ? a = 5 : "el" === e.ty ? a = 6 : "sr" === e.ty && (a = 7), this.sh = ShapePropertyFactory.getShapeProp(t, e, a, t);
		var n, o = r.length;
		for (s = 0; s < o; s += 1) r[s].closed || (n = {
			transforms: i.addTransformSequence(r[s].transforms),
			trNodes: []
		}, this.styledShapes.push(n), r[s].elements.push(n))
	}

	function CVShapeElement(t, e, r) {
		this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.itemsData = [], this.prevViewData = [], this.shapeModifiers = [], this.processedElements = [], this.transformsManager = new ShapeTransformManager, this.initElement(t, e, r)
	}

	function CVTextElement(t, e, r) {
		this.textSpans = [], this.yOffset = 0, this.fillColorAnim = !1, this.strokeColorAnim = !1, this.strokeWidthAnim = !1, this.stroke = !1, this.fill = !1, this.justifyOffset = 0, this.currentRender = null, this.renderType = "canvas", this.values = {
			fill: "rgba(0,0,0,0)",
			stroke: "rgba(0,0,0,0)",
			sWidth: 0,
			fValue: ""
		}, this.initElement(t, e, r)
	}

	function CVImageElement(t, e, r) {
		this.assetData = e.getAssetData(t.refId), this.img = e.imageLoader.getAsset(this.assetData), this.initElement(t, e, r)
	}

	function CVSolidElement(t, e, r) {
		this.initElement(t, e, r)
	}

	function CanvasRendererBase(t, e) {
		this.animationItem = t, this.renderConfig = {
			clearCanvas: !e || void 0 === e.clearCanvas || e.clearCanvas,
			context: e && e.context || null,
			progressiveLoad: e && e.progressiveLoad || !1,
			preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
			imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
			contentVisibility: e && e.contentVisibility || "visible",
			className: e && e.className || "",
			id: e && e.id || ""
		}, this.renderConfig.dpr = e && e.dpr || 1, this.animationItem.wrapper && (this.renderConfig.dpr = e && e.dpr || window.devicePixelRatio || 1), this.renderedFrame = -1, this.globalData = {
			frameNum: -1,
			_mdf: !1,
			renderConfig: this.renderConfig,
			currentGlobalAlpha: -1
		}, this.contextData = new CVContextData, this.elements = [], this.pendingElements = [], this.transformMat = new Matrix, this.completeLayers = !1, this.rendererType = "canvas"
	}

	function CVCompElement(t, e, r) {
		this.completeLayers = !1, this.layers = t.layers, this.pendingElements = [], this.elements = createSizedArray(this.layers.length), this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
			_placeholder: !0
		}
	}

	function CanvasRenderer(t, e) {
		this.animationItem = t, this.renderConfig = {
			clearCanvas: !e || void 0 === e.clearCanvas || e.clearCanvas,
			context: e && e.context || null,
			progressiveLoad: e && e.progressiveLoad || !1,
			preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
			imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
			contentVisibility: e && e.contentVisibility || "visible",
			className: e && e.className || "",
			id: e && e.id || "",
			runExpressions: !e || void 0 === e.runExpressions || e.runExpressions
		}, this.renderConfig.dpr = e && e.dpr || 1, this.animationItem.wrapper && (this.renderConfig.dpr = e && e.dpr || window.devicePixelRatio || 1), this.renderedFrame = -1, this.globalData = {
			frameNum: -1,
			_mdf: !1,
			renderConfig: this.renderConfig,
			currentGlobalAlpha: -1
		}, this.contextData = new CVContextData, this.elements = [], this.pendingElements = [], this.transformMat = new Matrix, this.completeLayers = !1, this.rendererType = "canvas"
	}

	function HBaseElement() {}

	function HSolidElement(t, e, r) {
		this.initElement(t, e, r)
	}

	function HShapeElement(t, e, r) {
		this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.shapesContainer = createNS("g"), this.initElement(t, e, r), this.prevViewData = [], this.currentBBox = {
			x: 999999,
			y: -999999,
			h: 0,
			w: 0
		}
	}

	function HTextElement(t, e, r) {
		this.textSpans = [], this.textPaths = [], this.currentBBox = {
			x: 999999,
			y: -999999,
			h: 0,
			w: 0
		}, this.renderType = "svg", this.isMasked = !1, this.initElement(t, e, r)
	}

	function HCameraElement(t, e, r) {
		this.initFrame(), this.initBaseData(t, e, r), this.initHierarchy();
		var i = PropertyFactory.getProp;
		if (this.pe = i(this, t.pe, 0, 0, this), t.ks.p.s ? (this.px = i(this, t.ks.p.x, 1, 0, this), this.py = i(this, t.ks.p.y, 1, 0, this), this.pz = i(this, t.ks.p.z, 1, 0, this)) : this.p = i(this, t.ks.p, 1, 0, this), t.ks.a && (this.a = i(this, t.ks.a, 1, 0, this)), t.ks.or.k.length && t.ks.or.k[0].to) {
			var s, a = t.ks.or.k.length;
			for (s = 0; s < a; s += 1) t.ks.or.k[s].to = null, t.ks.or.k[s].ti = null
		}
		this.or = i(this, t.ks.or, 1, degToRads, this), this.or.sh = !0, this.rx = i(this, t.ks.rx, 0, degToRads, this), this.ry = i(this, t.ks.ry, 0, degToRads, this), this.rz = i(this, t.ks.rz, 0, degToRads, this), this.mat = new Matrix, this._prevMat = new Matrix, this._isFirstFrame = !0, this.finalTransform = {
			mProp: this
		}
	}

	function HImageElement(t, e, r) {
		this.assetData = e.getAssetData(t.refId), this.initElement(t, e, r)
	}

	function HybridRendererBase(t, e) {
		this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.renderConfig = {
			className: e && e.className || "",
			imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
			hideOnTransparent: !(e && !1 === e.hideOnTransparent),
			filterSize: {
				width: e && e.filterSize && e.filterSize.width || "400%",
				height: e && e.filterSize && e.filterSize.height || "400%",
				x: e && e.filterSize && e.filterSize.x || "-100%",
				y: e && e.filterSize && e.filterSize.y || "-100%"
			}
		}, this.globalData = {
			_mdf: !1,
			frameNum: -1,
			renderConfig: this.renderConfig
		}, this.pendingElements = [], this.elements = [], this.threeDElements = [], this.destroyed = !1, this.camera = null, this.supports3d = !0, this.rendererType = "html"
	}

	function HCompElement(t, e, r) {
		this.layers = t.layers, this.supports3d = !t.hasMask, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
			_placeholder: !0
		}
	}

	function HybridRenderer(t, e) {
		this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.renderConfig = {
			className: e && e.className || "",
			imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
			hideOnTransparent: !(e && !1 === e.hideOnTransparent),
			filterSize: {
				width: e && e.filterSize && e.filterSize.width || "400%",
				height: e && e.filterSize && e.filterSize.height || "400%",
				x: e && e.filterSize && e.filterSize.x || "-100%",
				y: e && e.filterSize && e.filterSize.y || "-100%"
			},
			runExpressions: !e || void 0 === e.runExpressions || e.runExpressions
		}, this.globalData = {
			_mdf: !1,
			frameNum: -1,
			renderConfig: this.renderConfig
		}, this.pendingElements = [], this.elements = [], this.threeDElements = [], this.destroyed = !1, this.camera = null, this.supports3d = !0, this.rendererType = "html"
	}
	CVBaseElement.prototype = {
		createElements: function () {},
		initRendererElement: function () {},
		createContainerElements: function () {
			if (this.data.tt >= 1) {
				this.buffers = [];
				var t = this.globalData.canvasContext,
					e = assetLoader.createCanvas(t.canvas.width, t.canvas.height);
				this.buffers.push(e);
				var r = assetLoader.createCanvas(t.canvas.width, t.canvas.height);
				this.buffers.push(r), this.data.tt >= 3 && !document._isProxy && assetLoader.loadLumaCanvas()
			}
			this.canvasContext = this.globalData.canvasContext, this.transformCanvas = this.globalData.transformCanvas, this.renderableEffectsManager = new CVEffects(this)
		},
		createContent: function () {},
		setBlendMode: function () {
			var t = this.globalData;
			if (t.blendMode !== this.data.bm) {
				t.blendMode = this.data.bm;
				var e = getBlendMode(this.data.bm);
				t.canvasContext.globalCompositeOperation = e
			}
		},
		createRenderableComponents: function () {
			this.maskManager = new CVMaskElement(this.data, this)
		},
		hideElement: function () {
			this.hidden || this.isInRange && !this.isTransparent || (this.hidden = !0)
		},
		showElement: function () {
			this.isInRange && !this.isTransparent && (this.hidden = !1, this._isFirstFrame = !0, this.maskManager._isFirstFrame = !0)
		},
		clearCanvas: function (t) {
			t.clearRect(this.transformCanvas.tx, this.transformCanvas.ty, this.transformCanvas.w * this.transformCanvas.sx, this.transformCanvas.h * this.transformCanvas.sy)
		},
		prepareLayer: function () {
			if (this.data.tt >= 1) {
				var t = this.buffers[0].getContext("2d");
				this.clearCanvas(t), t.drawImage(this.canvasContext.canvas, 0, 0), this.currentTransform = this.canvasContext.getTransform(), this.canvasContext.setTransform(1, 0, 0, 1, 0, 0), this.clearCanvas(this.canvasContext), this.canvasContext.setTransform(this.currentTransform)
			}
		},
		exitLayer: function () {
			if (this.data.tt >= 1) {
				var t = this.buffers[1],
					e = t.getContext("2d");
				if (this.clearCanvas(e), e.drawImage(this.canvasContext.canvas, 0, 0), this.canvasContext.setTransform(1, 0, 0, 1, 0, 0), this.clearCanvas(this.canvasContext), this.canvasContext.setTransform(this.currentTransform), this.comp.getElementById("tp" in this.data ? this.data.tp : this.data.ind - 1).renderFrame(!0), this.canvasContext.setTransform(1, 0, 0, 1, 0, 0), this.data.tt >= 3 && !document._isProxy) {
					var r = assetLoader.getLumaCanvas(this.canvasContext.canvas);
					r.getContext("2d").drawImage(this.canvasContext.canvas, 0, 0), this.clearCanvas(this.canvasContext), this.canvasContext.drawImage(r, 0, 0)
				}
				this.canvasContext.globalCompositeOperation = operationsMap[this.data.tt], this.canvasContext.drawImage(t, 0, 0), this.canvasContext.globalCompositeOperation = "destination-over", this.canvasContext.drawImage(this.buffers[0], 0, 0), this.canvasContext.setTransform(this.currentTransform), this.canvasContext.globalCompositeOperation = "source-over"
			}
		},
		renderFrame: function (t) {
			if (!this.hidden && !this.data.hd && (1 !== this.data.td || t)) {
				this.renderTransform(), this.renderRenderable(), this.setBlendMode();
				var e = 0 === this.data.ty;
				this.prepareLayer(), this.globalData.renderer.save(e), this.globalData.renderer.ctxTransform(this.finalTransform.mat.props), this.globalData.renderer.ctxOpacity(this.finalTransform.mProp.o.v), this.renderInnerContent(), this.globalData.renderer.restore(e), this.exitLayer(), this.maskManager.hasMasks && this.globalData.renderer.restore(!0), this._isFirstFrame && (this._isFirstFrame = !1)
			}
		},
		destroy: function () {
			this.canvasContext = null, this.data = null, this.globalData = null, this.maskManager.destroy()
		},
		mHelper: new Matrix
	}, CVBaseElement.prototype.hide = CVBaseElement.prototype.hideElement, CVBaseElement.prototype.show = CVBaseElement.prototype.showElement, CVShapeData.prototype.setAsAnimated = SVGShapeData.prototype.setAsAnimated, extendPrototype([BaseElement, TransformElement, CVBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableElement], CVShapeElement), CVShapeElement.prototype.initElement = RenderableDOMElement.prototype.initElement, CVShapeElement.prototype.transformHelper = {
		opacity: 1,
		_opMdf: !1
	}, CVShapeElement.prototype.dashResetter = [], CVShapeElement.prototype.createContent = function () {
		this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, [])
	}, CVShapeElement.prototype.createStyleElement = function (t, e) {
		var r = {
				data: t,
				type: t.ty,
				preTransforms: this.transformsManager.addTransformSequence(e),
				transforms: [],
				elements: [],
				closed: !0 === t.hd
			},
			i = {};
		if ("fl" === t.ty || "st" === t.ty ? (i.c = PropertyFactory.getProp(this, t.c, 1, 255, this), i.c.k || (r.co = "rgb(" + bmFloor(i.c.v[0]) + "," + bmFloor(i.c.v[1]) + "," + bmFloor(i.c.v[2]) + ")")) : "gf" !== t.ty && "gs" !== t.ty || (i.s = PropertyFactory.getProp(this, t.s, 1, null, this), i.e = PropertyFactory.getProp(this, t.e, 1, null, this), i.h = PropertyFactory.getProp(this, t.h || {
				k: 0
			}, 0, .01, this), i.a = PropertyFactory.getProp(this, t.a || {
				k: 0
			}, 0, degToRads, this), i.g = new GradientProperty(this, t.g, this)), i.o = PropertyFactory.getProp(this, t.o, 0, .01, this), "st" === t.ty || "gs" === t.ty) {
			if (r.lc = lineCapEnum[t.lc || 2], r.lj = lineJoinEnum[t.lj || 2], 1 == t.lj && (r.ml = t.ml), i.w = PropertyFactory.getProp(this, t.w, 0, null, this), i.w.k || (r.wi = i.w.v), t.d) {
				var s = new DashProperty(this, t.d, "canvas", this);
				i.d = s, i.d.k || (r.da = i.d.dashArray, r.do = i.d.dashoffset[0])
			}
		} else r.r = 2 === t.r ? "evenodd" : "nonzero";
		return this.stylesList.push(r), i.style = r, i
	}, CVShapeElement.prototype.createGroupElement = function () {
		return {
			it: [],
			prevViewData: []
		}
	}, CVShapeElement.prototype.createTransformElement = function (t) {
		return {
			transform: {
				opacity: 1,
				_opMdf: !1,
				key: this.transformsManager.getNewKey(),
				op: PropertyFactory.getProp(this, t.o, 0, .01, this),
				mProps: TransformPropertyFactory.getTransformProperty(this, t, this)
			}
		}
	}, CVShapeElement.prototype.createShapeElement = function (t) {
		var e = new CVShapeData(this, t, this.stylesList, this.transformsManager);
		return this.shapes.push(e), this.addShapeToModifiers(e), e
	}, CVShapeElement.prototype.reloadShapes = function () {
		var t;
		this._isFirstFrame = !0;
		var e = this.itemsData.length;
		for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
		for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []), e = this.dynamicProperties.length, t = 0; t < e; t += 1) this.dynamicProperties[t].getValue();
		this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame)
	}, CVShapeElement.prototype.addTransformToStyleList = function (t) {
		var e, r = this.stylesList.length;
		for (e = 0; e < r; e += 1) this.stylesList[e].closed || this.stylesList[e].transforms.push(t)
	}, CVShapeElement.prototype.removeTransformFromStyleList = function () {
		var t, e = this.stylesList.length;
		for (t = 0; t < e; t += 1) this.stylesList[t].closed || this.stylesList[t].transforms.pop()
	}, CVShapeElement.prototype.closeStyles = function (t) {
		var e, r = t.length;
		for (e = 0; e < r; e += 1) t[e].closed = !0
	}, CVShapeElement.prototype.searchShapes = function (t, e, r, i, s) {
		var a, n, o, h, l, p, f = t.length - 1,
			m = [],
			c = [],
			d = [].concat(s);
		for (a = f; a >= 0; a -= 1) {
			if ((h = this.searchProcessedElement(t[a])) ? e[a] = r[h - 1] : t[a]._shouldRender = i, "fl" === t[a].ty || "st" === t[a].ty || "gf" === t[a].ty || "gs" === t[a].ty) h ? e[a].style.closed = !1 : e[a] = this.createStyleElement(t[a], d), m.push(e[a].style);
			else if ("gr" === t[a].ty) {
				if (h)
					for (o = e[a].it.length, n = 0; n < o; n += 1) e[a].prevViewData[n] = e[a].it[n];
				else e[a] = this.createGroupElement(t[a]);
				this.searchShapes(t[a].it, e[a].it, e[a].prevViewData, i, d)
			} else "tr" === t[a].ty ? (h || (p = this.createTransformElement(t[a]), e[a] = p), d.push(e[a]), this.addTransformToStyleList(e[a])) : "sh" === t[a].ty || "rc" === t[a].ty || "el" === t[a].ty || "sr" === t[a].ty ? h || (e[a] = this.createShapeElement(t[a])) : "tm" === t[a].ty || "rd" === t[a].ty || "pb" === t[a].ty || "zz" === t[a].ty || "op" === t[a].ty ? (h ? (l = e[a]).closed = !1 : ((l = ShapeModifiers.getModifier(t[a].ty)).init(this, t[a]), e[a] = l, this.shapeModifiers.push(l)), c.push(l)) : "rp" === t[a].ty && (h ? (l = e[a]).closed = !0 : (l = ShapeModifiers.getModifier(t[a].ty), e[a] = l, l.init(this, t, a, e), this.shapeModifiers.push(l), i = !1), c.push(l));
			this.addProcessedElement(t[a], a + 1)
		}
		for (this.removeTransformFromStyleList(), this.closeStyles(m), f = c.length, a = 0; a < f; a += 1) c[a].closed = !0
	}, CVShapeElement.prototype.renderInnerContent = function () {
		this.transformHelper.opacity = 1, this.transformHelper._opMdf = !1, this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame), this.renderShape(this.transformHelper, this.shapesData, this.itemsData, !0)
	}, CVShapeElement.prototype.renderShapeTransform = function (t, e) {
		(t._opMdf || e.op._mdf || this._isFirstFrame) && (e.opacity = t.opacity, e.opacity *= e.op.v, e._opMdf = !0)
	}, CVShapeElement.prototype.drawLayer = function () {
		var t, e, r, i, s, a, n, o, h, l = this.stylesList.length,
			p = this.globalData.renderer,
			f = this.globalData.canvasContext;
		for (t = 0; t < l; t += 1)
			if (("st" !== (o = (h = this.stylesList[t]).type) && "gs" !== o || 0 !== h.wi) && h.data._shouldRender && 0 !== h.coOp && 0 !== this.globalData.currentGlobalAlpha) {
				for (p.save(), a = h.elements, "st" === o || "gs" === o ? (f.strokeStyle = "st" === o ? h.co : h.grd, f.lineWidth = h.wi, f.lineCap = h.lc, f.lineJoin = h.lj, f.miterLimit = h.ml || 0) : f.fillStyle = "fl" === o ? h.co : h.grd, p.ctxOpacity(h.coOp), "st" !== o && "gs" !== o && f.beginPath(), p.ctxTransform(h.preTransforms.finalTransform.props), r = a.length, e = 0; e < r; e += 1) {
					for ("st" !== o && "gs" !== o || (f.beginPath(), h.da && (f.setLineDash(h.da), f.lineDashOffset = h.do)), s = (n = a[e].trNodes).length, i = 0; i < s; i += 1) "m" === n[i].t ? f.moveTo(n[i].p[0], n[i].p[1]) : "c" === n[i].t ? f.bezierCurveTo(n[i].pts[0], n[i].pts[1], n[i].pts[2], n[i].pts[3], n[i].pts[4], n[i].pts[5]) : f.closePath();
					"st" !== o && "gs" !== o || (f.stroke(), h.da && f.setLineDash(this.dashResetter))
				}
				"st" !== o && "gs" !== o && f.fill(h.r), p.restore()
			}
	}, CVShapeElement.prototype.renderShape = function (t, e, r, i) {
		var s, a;
		for (a = t, s = e.length - 1; s >= 0; s -= 1) "tr" === e[s].ty ? (a = r[s].transform, this.renderShapeTransform(t, a)) : "sh" === e[s].ty || "el" === e[s].ty || "rc" === e[s].ty || "sr" === e[s].ty ? this.renderPath(e[s], r[s]) : "fl" === e[s].ty ? this.renderFill(e[s], r[s], a) : "st" === e[s].ty ? this.renderStroke(e[s], r[s], a) : "gf" === e[s].ty || "gs" === e[s].ty ? this.renderGradientFill(e[s], r[s], a) : "gr" === e[s].ty ? this.renderShape(a, e[s].it, r[s].it) : e[s].ty;
		i && this.drawLayer()
	}, CVShapeElement.prototype.renderStyledShape = function (t, e) {
		if (this._isFirstFrame || e._mdf || t.transforms._mdf) {
			var r, i, s, a = t.trNodes,
				n = e.paths,
				o = n._length;
			a.length = 0;
			var h = t.transforms.finalTransform;
			for (s = 0; s < o; s += 1) {
				var l = n.shapes[s];
				if (l && l.v) {
					for (i = l._length, r = 1; r < i; r += 1) 1 === r && a.push({
						t: "m",
						p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
					}), a.push({
						t: "c",
						pts: h.applyToTriplePoints(l.o[r - 1], l.i[r], l.v[r])
					});
					1 === i && a.push({
						t: "m",
						p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
					}), l.c && i && (a.push({
						t: "c",
						pts: h.applyToTriplePoints(l.o[r - 1], l.i[0], l.v[0])
					}), a.push({
						t: "z"
					}))
				}
			}
			t.trNodes = a
		}
	}, CVShapeElement.prototype.renderPath = function (t, e) {
		if (!0 !== t.hd && t._shouldRender) {
			var r, i = e.styledShapes.length;
			for (r = 0; r < i; r += 1) this.renderStyledShape(e.styledShapes[r], e.sh)
		}
	}, CVShapeElement.prototype.renderFill = function (t, e, r) {
		var i = e.style;
		(e.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + bmFloor(e.c.v[0]) + "," + bmFloor(e.c.v[1]) + "," + bmFloor(e.c.v[2]) + ")"), (e.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * r.opacity)
	}, CVShapeElement.prototype.renderGradientFill = function (t, e, r) {
		var i, s = e.style;
		if (!s.grd || e.g._mdf || e.s._mdf || e.e._mdf || 1 !== t.t && (e.h._mdf || e.a._mdf)) {
			var a, n = this.globalData.canvasContext,
				o = e.s.v,
				h = e.e.v;
			if (1 === t.t) i = n.createLinearGradient(o[0], o[1], h[0], h[1]);
			else {
				var l = Math.sqrt(Math.pow(o[0] - h[0], 2) + Math.pow(o[1] - h[1], 2)),
					p = Math.atan2(h[1] - o[1], h[0] - o[0]),
					f = e.h.v;
				f >= 1 ? f = .99 : f <= -1 && (f = -.99);
				var m = l * f,
					c = Math.cos(p + e.a.v) * m + o[0],
					d = Math.sin(p + e.a.v) * m + o[1];
				i = n.createRadialGradient(c, d, 0, o[0], o[1], l)
			}
			var u = t.g.p,
				y = e.g.c,
				g = 1;
			for (a = 0; a < u; a += 1) e.g._hasOpacity && e.g._collapsable && (g = e.g.o[2 * a + 1]), i.addColorStop(y[4 * a] / 100, "rgba(" + y[4 * a + 1] + "," + y[4 * a + 2] + "," + y[4 * a + 3] + "," + g + ")");
			s.grd = i
		}
		s.coOp = e.o.v * r.opacity
	}, CVShapeElement.prototype.renderStroke = function (t, e, r) {
		var i = e.style,
			s = e.d;
		s && (s._mdf || this._isFirstFrame) && (i.da = s.dashArray, i.do = s.dashoffset[0]), (e.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + bmFloor(e.c.v[0]) + "," + bmFloor(e.c.v[1]) + "," + bmFloor(e.c.v[2]) + ")"), (e.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * r.opacity), (e.w._mdf || this._isFirstFrame) && (i.wi = e.w.v)
	}, CVShapeElement.prototype.destroy = function () {
		this.shapesData = null, this.globalData = null, this.canvasContext = null, this.stylesList.length = 0, this.itemsData.length = 0
	}, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement, ITextElement], CVTextElement), CVTextElement.prototype.tHelper = createTag("canvas").getContext("2d"), CVTextElement.prototype.buildNewText = function () {
		var t = this.textProperty.currentData;
		this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
		var e = !1;
		t.fc ? (e = !0, this.values.fill = this.buildColor(t.fc)) : this.values.fill = "rgba(0,0,0,0)", this.fill = e;
		var r = !1;
		t.sc && (r = !0, this.values.stroke = this.buildColor(t.sc), this.values.sWidth = t.sw);
		var i, s, a, n, o, h, l, p, f, m, c, d, u = this.globalData.fontManager.getFontByName(t.f),
			y = t.l,
			g = this.mHelper;
		this.stroke = r, this.values.fValue = t.finalSize + "px " + this.globalData.fontManager.getFontByName(t.f).fFamily, s = t.finalText.length;
		var v = this.data.singleShape,
			b = .001 * t.tr * t.finalSize,
			P = 0,
			x = 0,
			E = !0,
			S = 0;
		for (i = 0; i < s; i += 1) {
			n = (a = this.globalData.fontManager.getCharData(t.finalText[i], u.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily)) && a.data || {}, g.reset(), v && y[i].n && (P = -b, x += t.yOffset, x += E ? 1 : 0, E = !1), f = (l = n.shapes ? n.shapes[0].it : []).length, g.scale(t.finalSize / 100, t.finalSize / 100), v && this.applyTextPropertiesToMatrix(t, g, y[i].line, P, x), c = createSizedArray(f - 1);
			var C = 0;
			for (p = 0; p < f; p += 1)
				if ("sh" === l[p].ty) {
					for (h = l[p].ks.k.i.length, m = l[p].ks.k, d = [], o = 1; o < h; o += 1) 1 === o && d.push(g.applyToX(m.v[0][0], m.v[0][1], 0), g.applyToY(m.v[0][0], m.v[0][1], 0)), d.push(g.applyToX(m.o[o - 1][0], m.o[o - 1][1], 0), g.applyToY(m.o[o - 1][0], m.o[o - 1][1], 0), g.applyToX(m.i[o][0], m.i[o][1], 0), g.applyToY(m.i[o][0], m.i[o][1], 0), g.applyToX(m.v[o][0], m.v[o][1], 0), g.applyToY(m.v[o][0], m.v[o][1], 0));
					d.push(g.applyToX(m.o[o - 1][0], m.o[o - 1][1], 0), g.applyToY(m.o[o - 1][0], m.o[o - 1][1], 0), g.applyToX(m.i[0][0], m.i[0][1], 0), g.applyToY(m.i[0][0], m.i[0][1], 0), g.applyToX(m.v[0][0], m.v[0][1], 0), g.applyToY(m.v[0][0], m.v[0][1], 0)), c[C] = d, C += 1
				} v && (P += y[i].l, P += b), this.textSpans[S] ? this.textSpans[S].elem = c : this.textSpans[S] = {
				elem: c
			}, S += 1
		}
	}, CVTextElement.prototype.renderInnerContent = function () {
		var t, e, r, i, s, a, n = this.canvasContext;
		n.font = this.values.fValue, n.lineCap = "butt", n.lineJoin = "miter", n.miterLimit = 4, this.data.singleShape || this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
		var o, h = this.textAnimator.renderedLetters,
			l = this.textProperty.currentData.l;
		e = l.length;
		var p, f, m = null,
			c = null,
			d = null;
		for (t = 0; t < e; t += 1)
			if (!l[t].n) {
				if ((o = h[t]) && (this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(o.p), this.globalData.renderer.ctxOpacity(o.o)), this.fill) {
					for (o && o.fc ? m !== o.fc && (m = o.fc, n.fillStyle = o.fc) : m !== this.values.fill && (m = this.values.fill, n.fillStyle = this.values.fill), i = (p = this.textSpans[t].elem).length, this.globalData.canvasContext.beginPath(), r = 0; r < i; r += 1)
						for (a = (f = p[r]).length, this.globalData.canvasContext.moveTo(f[0], f[1]), s = 2; s < a; s += 6) this.globalData.canvasContext.bezierCurveTo(f[s], f[s + 1], f[s + 2], f[s + 3], f[s + 4], f[s + 5]);
					this.globalData.canvasContext.closePath(), this.globalData.canvasContext.fill()
				}
				if (this.stroke) {
					for (o && o.sw ? d !== o.sw && (d = o.sw, n.lineWidth = o.sw) : d !== this.values.sWidth && (d = this.values.sWidth, n.lineWidth = this.values.sWidth), o && o.sc ? c !== o.sc && (c = o.sc, n.strokeStyle = o.sc) : c !== this.values.stroke && (c = this.values.stroke, n.strokeStyle = this.values.stroke), i = (p = this.textSpans[t].elem).length, this.globalData.canvasContext.beginPath(), r = 0; r < i; r += 1)
						for (a = (f = p[r]).length, this.globalData.canvasContext.moveTo(f[0], f[1]), s = 2; s < a; s += 6) this.globalData.canvasContext.bezierCurveTo(f[s], f[s + 1], f[s + 2], f[s + 3], f[s + 4], f[s + 5]);
					this.globalData.canvasContext.closePath(), this.globalData.canvasContext.stroke()
				}
				o && this.globalData.renderer.restore()
			}
	}, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVImageElement), CVImageElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVImageElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVImageElement.prototype.createContent = function () {
		if (this.img.width && (this.assetData.w !== this.img.width || this.assetData.h !== this.img.height)) {
			var t = createTag("canvas");
			t.width = this.assetData.w, t.height = this.assetData.h;
			var e, r, i = t.getContext("2d"),
				s = this.img.width,
				a = this.img.height,
				n = s / a,
				o = this.assetData.w / this.assetData.h,
				h = this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio;
			n > o && "xMidYMid slice" === h || n < o && "xMidYMid slice" !== h ? e = (r = a) * o : r = (e = s) / o, i.drawImage(this.img, (s - e) / 2, (a - r) / 2, e, r, 0, 0, this.assetData.w, this.assetData.h), this.img = t
		}
	}, CVImageElement.prototype.renderInnerContent = function () {
		this.canvasContext.drawImage(this.img, 0, 0)
	}, CVImageElement.prototype.destroy = function () {
		this.img = null
	}, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVSolidElement), CVSolidElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVSolidElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVSolidElement.prototype.renderInnerContent = function () {
		var t = this.canvasContext;
		t.fillStyle = this.data.sc, t.fillRect(0, 0, this.data.sw, this.data.sh)
	}, extendPrototype([BaseRenderer], CanvasRendererBase), CanvasRendererBase.prototype.createShape = function (t) {
		return new CVShapeElement(t, this.globalData, this)
	}, CanvasRendererBase.prototype.createText = function (t) {
		return new CVTextElement(t, this.globalData, this)
	}, CanvasRendererBase.prototype.createImage = function (t) {
		return new CVImageElement(t, this.globalData, this)
	}, CanvasRendererBase.prototype.createSolid = function (t) {
		return new CVSolidElement(t, this.globalData, this)
	}, CanvasRendererBase.prototype.createNull = SVGRenderer.prototype.createNull, CanvasRendererBase.prototype.ctxTransform = function (t) {
		if (1 !== t[0] || 0 !== t[1] || 0 !== t[4] || 1 !== t[5] || 0 !== t[12] || 0 !== t[13])
			if (this.renderConfig.clearCanvas) {
				this.transformMat.cloneFromProps(t);
				var e = this.contextData.getTransform(),
					r = e.props;
				this.transformMat.transform(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12], r[13], r[14], r[15]), e.cloneFromProps(this.transformMat.props);
				var i = e.props;
				this.canvasContext.setTransform(i[0], i[1], i[4], i[5], i[12], i[13])
			} else this.canvasContext.transform(t[0], t[1], t[4], t[5], t[12], t[13])
	}, CanvasRendererBase.prototype.ctxOpacity = function (t) {
		var e = this.contextData.getOpacity();
		if (!this.renderConfig.clearCanvas) return this.canvasContext.globalAlpha *= t < 0 ? 0 : t, void(this.globalData.currentGlobalAlpha = e);
		e *= t < 0 ? 0 : t, this.contextData.setOpacity(e), this.globalData.currentGlobalAlpha !== e && (this.canvasContext.globalAlpha = e, this.globalData.currentGlobalAlpha = e)
	}, CanvasRendererBase.prototype.reset = function () {
		this.renderConfig.clearCanvas ? this.contextData.reset() : this.canvasContext.restore()
	}, CanvasRendererBase.prototype.save = function (t) {
		this.renderConfig.clearCanvas ? (t && this.canvasContext.save(), this.contextData.push()) : this.canvasContext.save()
	}, CanvasRendererBase.prototype.restore = function (t) {
		if (this.renderConfig.clearCanvas) {
			t && (this.canvasContext.restore(), this.globalData.blendMode = "source-over");
			var e = this.contextData.pop(),
				r = e.transform,
				i = e.opacity;
			this.canvasContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13]), this.globalData.currentGlobalAlpha !== i && (this.canvasContext.globalAlpha = i, this.globalData.currentGlobalAlpha = i)
		} else this.canvasContext.restore()
	}, CanvasRendererBase.prototype.configAnimation = function (t) {
		if (this.animationItem.wrapper) {
			this.animationItem.container = createTag("canvas");
			var e = this.animationItem.container.style;
			e.width = "100%", e.height = "100%";
			var r = "0px 0px 0px";
			e.transformOrigin = r, e.mozTransformOrigin = r, e.webkitTransformOrigin = r, e["-webkit-transform"] = r, e.contentVisibility = this.renderConfig.contentVisibility, this.animationItem.wrapper.appendChild(this.animationItem.container), this.canvasContext = this.animationItem.container.getContext("2d"), this.renderConfig.className && this.animationItem.container.setAttribute("class", this.renderConfig.className), this.renderConfig.id && this.animationItem.container.setAttribute("id", this.renderConfig.id)
		} else this.canvasContext = this.renderConfig.context;
		this.data = t, this.layers = t.layers, this.transformCanvas = {
			w: t.w,
			h: t.h,
			sx: 0,
			sy: 0,
			tx: 0,
			ty: 0
		}, this.setupGlobalData(t, document.body), this.globalData.canvasContext = this.canvasContext, this.globalData.renderer = this, this.globalData.isDashed = !1, this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.globalData.transformCanvas = this.transformCanvas, this.elements = createSizedArray(t.layers.length), this.updateContainerSize()
	}, CanvasRendererBase.prototype.updateContainerSize = function (t, e) {
		var r, i, s, a;
		if (this.reset(), t ? (r = t, i = e, this.canvasContext.canvas.width = r, this.canvasContext.canvas.height = i) : (this.animationItem.wrapper && this.animationItem.container ? (r = this.animationItem.wrapper.offsetWidth, i = this.animationItem.wrapper.offsetHeight) : (r = this.canvasContext.canvas.width, i = this.canvasContext.canvas.height), this.canvasContext.canvas.width = r * this.renderConfig.dpr, this.canvasContext.canvas.height = i * this.renderConfig.dpr), -1 !== this.renderConfig.preserveAspectRatio.indexOf("meet") || -1 !== this.renderConfig.preserveAspectRatio.indexOf("slice")) {
			var n = this.renderConfig.preserveAspectRatio.split(" "),
				o = n[1] || "meet",
				h = n[0] || "xMidYMid",
				l = h.substr(0, 4),
				p = h.substr(4);
			s = r / i, (a = this.transformCanvas.w / this.transformCanvas.h) > s && "meet" === o || a < s && "slice" === o ? (this.transformCanvas.sx = r / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = r / (this.transformCanvas.w / this.renderConfig.dpr)) : (this.transformCanvas.sx = i / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.sy = i / (this.transformCanvas.h / this.renderConfig.dpr)), this.transformCanvas.tx = "xMid" === l && (a < s && "meet" === o || a > s && "slice" === o) ? (r - this.transformCanvas.w * (i / this.transformCanvas.h)) / 2 * this.renderConfig.dpr : "xMax" === l && (a < s && "meet" === o || a > s && "slice" === o) ? (r - this.transformCanvas.w * (i / this.transformCanvas.h)) * this.renderConfig.dpr : 0, this.transformCanvas.ty = "YMid" === p && (a > s && "meet" === o || a < s && "slice" === o) ? (i - this.transformCanvas.h * (r / this.transformCanvas.w)) / 2 * this.renderConfig.dpr : "YMax" === p && (a > s && "meet" === o || a < s && "slice" === o) ? (i - this.transformCanvas.h * (r / this.transformCanvas.w)) * this.renderConfig.dpr : 0
		} else "none" === this.renderConfig.preserveAspectRatio ? (this.transformCanvas.sx = r / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = i / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.tx = 0, this.transformCanvas.ty = 0) : (this.transformCanvas.sx = this.renderConfig.dpr, this.transformCanvas.sy = this.renderConfig.dpr, this.transformCanvas.tx = 0, this.transformCanvas.ty = 0);
		this.transformCanvas.props = [this.transformCanvas.sx, 0, 0, 0, 0, this.transformCanvas.sy, 0, 0, 0, 0, 1, 0, this.transformCanvas.tx, this.transformCanvas.ty, 0, 1], this.ctxTransform(this.transformCanvas.props), this.canvasContext.beginPath(), this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h), this.canvasContext.closePath(), this.canvasContext.clip(), this.renderFrame(this.renderedFrame, !0)
	}, CanvasRendererBase.prototype.destroy = function () {
		var t;
		for (this.renderConfig.clearCanvas && this.animationItem.wrapper && (this.animationItem.wrapper.innerText = ""), t = (this.layers ? this.layers.length : 0) - 1; t >= 0; t -= 1) this.elements[t] && this.elements[t].destroy();
		this.elements.length = 0, this.globalData.canvasContext = null, this.animationItem.container = null, this.destroyed = !0
	}, CanvasRendererBase.prototype.renderFrame = function (t, e) {
		if ((this.renderedFrame !== t || !0 !== this.renderConfig.clearCanvas || e) && !this.destroyed && -1 !== t) {
			var r;
			this.renderedFrame = t, this.globalData.frameNum = t - this.animationItem._isFirstFrame, this.globalData.frameId += 1, this.globalData._mdf = !this.renderConfig.clearCanvas || e, this.globalData.projectInterface.currentFrame = t;
			var i = this.layers.length;
			for (this.completeLayers || this.checkLayers(t), r = 0; r < i; r += 1)(this.completeLayers || this.elements[r]) && this.elements[r].prepareFrame(t - this.layers[r].st);
			if (this.globalData._mdf) {
				for (!0 === this.renderConfig.clearCanvas ? this.canvasContext.clearRect(0, 0, this.transformCanvas.w, this.transformCanvas.h) : this.save(), r = i - 1; r >= 0; r -= 1)(this.completeLayers || this.elements[r]) && this.elements[r].renderFrame();
				!0 !== this.renderConfig.clearCanvas && this.restore()
			}
		}
	}, CanvasRendererBase.prototype.buildItem = function (t) {
		var e = this.elements;
		if (!e[t] && 99 !== this.layers[t].ty) {
			var r = this.createItem(this.layers[t], this, this.globalData);
			e[t] = r, r.initExpressions()
		}
	}, CanvasRendererBase.prototype.checkPendingElements = function () {
		for (; this.pendingElements.length;) {
			this.pendingElements.pop().checkParenting()
		}
	}, CanvasRendererBase.prototype.hide = function () {
		this.animationItem.container.style.display = "none"
	}, CanvasRendererBase.prototype.show = function () {
		this.animationItem.container.style.display = "block"
	}, extendPrototype([CanvasRendererBase, ICompElement, CVBaseElement], CVCompElement), CVCompElement.prototype.renderInnerContent = function () {
		var t, e = this.canvasContext;
		for (e.beginPath(), e.moveTo(0, 0), e.lineTo(this.data.w, 0), e.lineTo(this.data.w, this.data.h), e.lineTo(0, this.data.h), e.lineTo(0, 0), e.clip(), t = this.layers.length - 1; t >= 0; t -= 1)(this.completeLayers || this.elements[t]) && this.elements[t].renderFrame()
	}, CVCompElement.prototype.destroy = function () {
		var t;
		for (t = this.layers.length - 1; t >= 0; t -= 1) this.elements[t] && this.elements[t].destroy();
		this.layers = null, this.elements = null
	}, CVCompElement.prototype.createComp = function (t) {
		return new CVCompElement(t, this.globalData, this)
	}, extendPrototype([CanvasRendererBase], CanvasRenderer), CanvasRenderer.prototype.createComp = function (t) {
		return new CVCompElement(t, this.globalData, this)
	}, HBaseElement.prototype = {
		checkBlendMode: function () {},
		initRendererElement: function () {
			this.baseElement = createTag(this.data.tg || "div"), this.data.hasMask ? (this.svgElement = createNS("svg"), this.layerElement = createNS("g"), this.maskedElement = this.layerElement, this.svgElement.appendChild(this.layerElement), this.baseElement.appendChild(this.svgElement)) : this.layerElement = this.baseElement, styleDiv(this.baseElement)
		},
		createContainerElements: function () {
			this.renderableEffectsManager = new CVEffects(this), this.transformedElement = this.baseElement, this.maskedElement = this.layerElement, this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), 0 !== this.data.bm && this.setBlendMode()
		},
		renderElement: function () {
			var t = this.transformedElement ? this.transformedElement.style : {};
			if (this.finalTransform._matMdf) {
				var e = this.finalTransform.mat.toCSS();
				t.transform = e, t.webkitTransform = e
			}
			this.finalTransform._opMdf && (t.opacity = this.finalTransform.mProp.o.v)
		},
		renderFrame: function () {
			this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1))
		},
		destroy: function () {
			this.layerElement = null, this.transformedElement = null, this.matteElement && (this.matteElement = null), this.maskManager && (this.maskManager.destroy(), this.maskManager = null)
		},
		createRenderableComponents: function () {
			this.maskManager = new MaskElement(this.data, this, this.globalData)
		},
		addEffects: function () {},
		setMatte: function () {}
	}, HBaseElement.prototype.getBaseElement = SVGBaseElement.prototype.getBaseElement, HBaseElement.prototype.destroyBaseElement = HBaseElement.prototype.destroy, HBaseElement.prototype.buildElementParenting = BaseRenderer.prototype.buildElementParenting, extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], HSolidElement), HSolidElement.prototype.createContent = function () {
		var t;
		this.data.hasMask ? ((t = createNS("rect")).setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.svgElement.setAttribute("width", this.data.sw), this.svgElement.setAttribute("height", this.data.sh)) : ((t = createTag("div")).style.width = this.data.sw + "px", t.style.height = this.data.sh + "px", t.style.backgroundColor = this.data.sc), this.layerElement.appendChild(t)
	}, extendPrototype([BaseElement, TransformElement, HSolidElement, SVGShapeElement, HBaseElement, HierarchyElement, FrameElement, RenderableElement], HShapeElement), HShapeElement.prototype._renderShapeFrame = HShapeElement.prototype.renderInnerContent, HShapeElement.prototype.createContent = function () {
		var t;
		if (this.baseElement.style.fontSize = 0, this.data.hasMask) this.layerElement.appendChild(this.shapesContainer), t = this.svgElement;
		else {
			t = createNS("svg");
			var e = this.comp.data ? this.comp.data : this.globalData.compSize;
			t.setAttribute("width", e.w), t.setAttribute("height", e.h), t.appendChild(this.shapesContainer), this.layerElement.appendChild(t)
		}
		this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.shapesContainer, 0, [], !0), this.filterUniqueShapes(), this.shapeCont = t
	}, HShapeElement.prototype.getTransformedPoint = function (t, e) {
		var r, i = t.length;
		for (r = 0; r < i; r += 1) e = t[r].mProps.v.applyToPointArray(e[0], e[1], 0);
		return e
	}, HShapeElement.prototype.calculateShapeBoundingBox = function (t, e) {
		var r, i, s, a, n, o = t.sh.v,
			h = t.transformers,
			l = o._length;
		if (!(l <= 1)) {
			for (r = 0; r < l - 1; r += 1) i = this.getTransformedPoint(h, o.v[r]), s = this.getTransformedPoint(h, o.o[r]), a = this.getTransformedPoint(h, o.i[r + 1]), n = this.getTransformedPoint(h, o.v[r + 1]), this.checkBounds(i, s, a, n, e);
			o.c && (i = this.getTransformedPoint(h, o.v[r]), s = this.getTransformedPoint(h, o.o[r]), a = this.getTransformedPoint(h, o.i[0]), n = this.getTransformedPoint(h, o.v[0]), this.checkBounds(i, s, a, n, e))
		}
	}, HShapeElement.prototype.checkBounds = function (t, e, r, i, s) {
		this.getBoundsOfCurve(t, e, r, i);
		var a = this.shapeBoundingBox;
		s.x = bmMin(a.left, s.x), s.xMax = bmMax(a.right, s.xMax), s.y = bmMin(a.top, s.y), s.yMax = bmMax(a.bottom, s.yMax)
	}, HShapeElement.prototype.shapeBoundingBox = {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	}, HShapeElement.prototype.tempBoundingBox = {
		x: 0,
		xMax: 0,
		y: 0,
		yMax: 0,
		width: 0,
		height: 0
	}, HShapeElement.prototype.getBoundsOfCurve = function (t, e, r, i) {
		for (var s, a, n, o, h, l, p, f = [
				[t[0], i[0]],
				[t[1], i[1]]
			], m = 0; m < 2; ++m) a = 6 * t[m] - 12 * e[m] + 6 * r[m], s = -3 * t[m] + 9 * e[m] - 9 * r[m] + 3 * i[m], n = 3 * e[m] - 3 * t[m], a |= 0, n |= 0, 0 === (s |= 0) && 0 === a || (0 === s ? (o = -n / a) > 0 && o < 1 && f[m].push(this.calculateF(o, t, e, r, i, m)) : (h = a * a - 4 * n * s) >= 0 && ((l = (-a + bmSqrt(h)) / (2 * s)) > 0 && l < 1 && f[m].push(this.calculateF(l, t, e, r, i, m)), (p = (-a - bmSqrt(h)) / (2 * s)) > 0 && p < 1 && f[m].push(this.calculateF(p, t, e, r, i, m))));
		this.shapeBoundingBox.left = bmMin.apply(null, f[0]), this.shapeBoundingBox.top = bmMin.apply(null, f[1]), this.shapeBoundingBox.right = bmMax.apply(null, f[0]), this.shapeBoundingBox.bottom = bmMax.apply(null, f[1])
	}, HShapeElement.prototype.calculateF = function (t, e, r, i, s, a) {
		return bmPow(1 - t, 3) * e[a] + 3 * bmPow(1 - t, 2) * t * r[a] + 3 * (1 - t) * bmPow(t, 2) * i[a] + bmPow(t, 3) * s[a]
	}, HShapeElement.prototype.calculateBoundingBox = function (t, e) {
		var r, i = t.length;
		for (r = 0; r < i; r += 1) t[r] && t[r].sh ? this.calculateShapeBoundingBox(t[r], e) : t[r] && t[r].it ? this.calculateBoundingBox(t[r].it, e) : t[r] && t[r].style && t[r].w && this.expandStrokeBoundingBox(t[r].w, e)
	}, HShapeElement.prototype.expandStrokeBoundingBox = function (t, e) {
		var r = 0;
		if (t.keyframes) {
			for (var i = 0; i < t.keyframes.length; i += 1) {
				var s = t.keyframes[i].s;
				s > r && (r = s)
			}
			r *= t.mult
		} else r = t.v * t.mult;
		e.x -= r, e.xMax += r, e.y -= r, e.yMax += r
	}, HShapeElement.prototype.currentBoxContains = function (t) {
		return this.currentBBox.x <= t.x && this.currentBBox.y <= t.y && this.currentBBox.width + this.currentBBox.x >= t.x + t.width && this.currentBBox.height + this.currentBBox.y >= t.y + t.height
	}, HShapeElement.prototype.renderInnerContent = function () {
		if (this._renderShapeFrame(), !this.hidden && (this._isFirstFrame || this._mdf)) {
			var t = this.tempBoundingBox,
				e = 999999;
			if (t.x = e, t.xMax = -e, t.y = e, t.yMax = -e, this.calculateBoundingBox(this.itemsData, t), t.width = t.xMax < t.x ? 0 : t.xMax - t.x, t.height = t.yMax < t.y ? 0 : t.yMax - t.y, this.currentBoxContains(t)) return;
			var r = !1;
			if (this.currentBBox.w !== t.width && (this.currentBBox.w = t.width, this.shapeCont.setAttribute("width", t.width), r = !0), this.currentBBox.h !== t.height && (this.currentBBox.h = t.height, this.shapeCont.setAttribute("height", t.height), r = !0), r || this.currentBBox.x !== t.x || this.currentBBox.y !== t.y) {
				this.currentBBox.w = t.width, this.currentBBox.h = t.height, this.currentBBox.x = t.x, this.currentBBox.y = t.y, this.shapeCont.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h);
				var i = this.shapeCont.style,
					s = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)";
				i.transform = s, i.webkitTransform = s
			}
		}
	}, extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], HTextElement), HTextElement.prototype.createContent = function () {
		if (this.isMasked = this.checkMasks(), this.isMasked) {
			this.renderType = "svg", this.compW = this.comp.data.w, this.compH = this.comp.data.h, this.svgElement.setAttribute("width", this.compW), this.svgElement.setAttribute("height", this.compH);
			var t = createNS("g");
			this.maskedElement.appendChild(t), this.innerElem = t
		} else this.renderType = "html", this.innerElem = this.layerElement;
		this.checkParenting()
	}, HTextElement.prototype.buildNewText = function () {
		var t = this.textProperty.currentData;
		this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
		var e = this.innerElem.style,
			r = t.fc ? this.buildColor(t.fc) : "rgba(0,0,0,0)";
		e.fill = r, e.color = r, t.sc && (e.stroke = this.buildColor(t.sc), e.strokeWidth = t.sw + "px");
		var i, s, a = this.globalData.fontManager.getFontByName(t.f);
		if (!this.globalData.fontManager.chars)
			if (e.fontSize = t.finalSize + "px", e.lineHeight = t.finalSize + "px", a.fClass) this.innerElem.className = a.fClass;
			else {
				e.fontFamily = a.fFamily;
				var n = t.fWeight,
					o = t.fStyle;
				e.fontStyle = o, e.fontWeight = n
			} var h, l, p, f = t.l;
		s = f.length;
		var m, c = this.mHelper,
			d = "",
			u = 0;
		for (i = 0; i < s; i += 1) {
			if (this.globalData.fontManager.chars ? (this.textPaths[u] ? h = this.textPaths[u] : ((h = createNS("path")).setAttribute("stroke-linecap", lineCapEnum[1]), h.setAttribute("stroke-linejoin", lineJoinEnum[2]), h.setAttribute("stroke-miterlimit", "4")), this.isMasked || (this.textSpans[u] ? p = (l = this.textSpans[u]).children[0] : ((l = createTag("div")).style.lineHeight = 0, (p = createNS("svg")).appendChild(h), styleDiv(l)))) : this.isMasked ? h = this.textPaths[u] ? this.textPaths[u] : createNS("text") : this.textSpans[u] ? (l = this.textSpans[u], h = this.textPaths[u]) : (styleDiv(l = createTag("span")), styleDiv(h = createTag("span")), l.appendChild(h)), this.globalData.fontManager.chars) {
				var y, g = this.globalData.fontManager.getCharData(t.finalText[i], a.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily);
				if (y = g ? g.data : null, c.reset(), y && y.shapes && y.shapes.length && (m = y.shapes[0].it, c.scale(t.finalSize / 100, t.finalSize / 100), d = this.createPathShape(c, m), h.setAttribute("d", d)), this.isMasked) this.innerElem.appendChild(h);
				else {
					if (this.innerElem.appendChild(l), y && y.shapes) {
						document.body.appendChild(p);
						var v = p.getBBox();
						p.setAttribute("width", v.width + 2), p.setAttribute("height", v.height + 2), p.setAttribute("viewBox", v.x - 1 + " " + (v.y - 1) + " " + (v.width + 2) + " " + (v.height + 2));
						var b = p.style,
							P = "translate(" + (v.x - 1) + "px," + (v.y - 1) + "px)";
						b.transform = P, b.webkitTransform = P, f[i].yOffset = v.y - 1
					} else p.setAttribute("width", 1), p.setAttribute("height", 1);
					l.appendChild(p)
				}
			} else if (h.textContent = f[i].val, h.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), this.isMasked) this.innerElem.appendChild(h);
			else {
				this.innerElem.appendChild(l);
				var x = h.style,
					E = "translate3d(0," + -t.finalSize / 1.2 + "px,0)";
				x.transform = E, x.webkitTransform = E
			}
			this.isMasked ? this.textSpans[u] = h : this.textSpans[u] = l, this.textSpans[u].style.display = "block", this.textPaths[u] = h, u += 1
		}
		for (; u < this.textSpans.length;) this.textSpans[u].style.display = "none", u += 1
	}, HTextElement.prototype.renderInnerContent = function () {
		var t;
		if (this.data.singleShape) {
			if (!this._isFirstFrame && !this.lettersChangedFlag) return;
			if (this.isMasked && this.finalTransform._matMdf) {
				this.svgElement.setAttribute("viewBox", -this.finalTransform.mProp.p.v[0] + " " + -this.finalTransform.mProp.p.v[1] + " " + this.compW + " " + this.compH), t = this.svgElement.style;
				var e = "translate(" + -this.finalTransform.mProp.p.v[0] + "px," + -this.finalTransform.mProp.p.v[1] + "px)";
				t.transform = e, t.webkitTransform = e
			}
		}
		if (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag) {
			var r, i, s, a, n, o = 0,
				h = this.textAnimator.renderedLetters,
				l = this.textProperty.currentData.l;
			for (i = l.length, r = 0; r < i; r += 1) l[r].n ? o += 1 : (a = this.textSpans[r], n = this.textPaths[r], s = h[o], o += 1, s._mdf.m && (this.isMasked ? a.setAttribute("transform", s.m) : (a.style.webkitTransform = s.m, a.style.transform = s.m)), a.style.opacity = s.o, s.sw && s._mdf.sw && n.setAttribute("stroke-width", s.sw), s.sc && s._mdf.sc && n.setAttribute("stroke", s.sc), s.fc && s._mdf.fc && (n.setAttribute("fill", s.fc), n.style.color = s.fc));
			if (this.innerElem.getBBox && !this.hidden && (this._isFirstFrame || this._mdf)) {
				var p = this.innerElem.getBBox();
				this.currentBBox.w !== p.width && (this.currentBBox.w = p.width, this.svgElement.setAttribute("width", p.width)), this.currentBBox.h !== p.height && (this.currentBBox.h = p.height, this.svgElement.setAttribute("height", p.height));
				if (this.currentBBox.w !== p.width + 2 || this.currentBBox.h !== p.height + 2 || this.currentBBox.x !== p.x - 1 || this.currentBBox.y !== p.y - 1) {
					this.currentBBox.w = p.width + 2, this.currentBBox.h = p.height + 2, this.currentBBox.x = p.x - 1, this.currentBBox.y = p.y - 1, this.svgElement.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h), t = this.svgElement.style;
					var f = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)";
					t.transform = f, t.webkitTransform = f
				}
			}
		}
	}, extendPrototype([BaseElement, FrameElement, HierarchyElement], HCameraElement), HCameraElement.prototype.setup = function () {
		var t, e, r, i, s = this.comp.threeDElements.length;
		for (t = 0; t < s; t += 1)
			if ("3d" === (e = this.comp.threeDElements[t]).type) {
				r = e.perspectiveElem.style, i = e.container.style;
				var a = this.pe.v + "px",
					n = "0px 0px 0px",
					o = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";
				r.perspective = a, r.webkitPerspective = a, i.transformOrigin = n, i.mozTransformOrigin = n, i.webkitTransformOrigin = n, r.transform = o, r.webkitTransform = o
			}
	}, HCameraElement.prototype.createElements = function () {}, HCameraElement.prototype.hide = function () {}, HCameraElement.prototype.renderFrame = function () {
		var t, e, r = this._isFirstFrame;
		if (this.hierarchy)
			for (e = this.hierarchy.length, t = 0; t < e; t += 1) r = this.hierarchy[t].finalTransform.mProp._mdf || r;
		if (r || this.pe._mdf || this.p && this.p._mdf || this.px && (this.px._mdf || this.py._mdf || this.pz._mdf) || this.rx._mdf || this.ry._mdf || this.rz._mdf || this.or._mdf || this.a && this.a._mdf) {
			if (this.mat.reset(), this.hierarchy)
				for (t = e = this.hierarchy.length - 1; t >= 0; t -= 1) {
					var i = this.hierarchy[t].finalTransform.mProp;
					this.mat.translate(-i.p.v[0], -i.p.v[1], i.p.v[2]), this.mat.rotateX(-i.or.v[0]).rotateY(-i.or.v[1]).rotateZ(i.or.v[2]), this.mat.rotateX(-i.rx.v).rotateY(-i.ry.v).rotateZ(i.rz.v), this.mat.scale(1 / i.s.v[0], 1 / i.s.v[1], 1 / i.s.v[2]), this.mat.translate(i.a.v[0], i.a.v[1], i.a.v[2])
				}
			if (this.p ? this.mat.translate(-this.p.v[0], -this.p.v[1], this.p.v[2]) : this.mat.translate(-this.px.v, -this.py.v, this.pz.v), this.a) {
				var s;
				s = this.p ? [this.p.v[0] - this.a.v[0], this.p.v[1] - this.a.v[1], this.p.v[2] - this.a.v[2]] : [this.px.v - this.a.v[0], this.py.v - this.a.v[1], this.pz.v - this.a.v[2]];
				var a = Math.sqrt(Math.pow(s[0], 2) + Math.pow(s[1], 2) + Math.pow(s[2], 2)),
					n = [s[0] / a, s[1] / a, s[2] / a],
					o = Math.sqrt(n[2] * n[2] + n[0] * n[0]),
					h = Math.atan2(n[1], o),
					l = Math.atan2(n[0], -n[2]);
				this.mat.rotateY(l).rotateX(-h)
			}
			this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v), this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]), this.mat.translate(this.globalData.compSize.w / 2, this.globalData.compSize.h / 2, 0), this.mat.translate(0, 0, this.pe.v);
			var p = !this._prevMat.equals(this.mat);
			if ((p || this.pe._mdf) && this.comp.threeDElements) {
				var f, m, c;
				for (e = this.comp.threeDElements.length, t = 0; t < e; t += 1)
					if ("3d" === (f = this.comp.threeDElements[t]).type) {
						if (p) {
							var d = this.mat.toCSS();
							(c = f.container.style).transform = d, c.webkitTransform = d
						}
						this.pe._mdf && ((m = f.perspectiveElem.style).perspective = this.pe.v + "px", m.webkitPerspective = this.pe.v + "px")
					} this.mat.clone(this._prevMat)
			}
		}
		this._isFirstFrame = !1
	}, HCameraElement.prototype.prepareFrame = function (t) {
		this.prepareProperties(t, !0)
	}, HCameraElement.prototype.destroy = function () {}, HCameraElement.prototype.getBaseElement = function () {
		return null
	}, extendPrototype([BaseElement, TransformElement, HBaseElement, HSolidElement, HierarchyElement, FrameElement, RenderableElement], HImageElement), HImageElement.prototype.createContent = function () {
		var t = this.globalData.getAssetsPath(this.assetData),
			e = new Image;
		this.data.hasMask ? (this.imageElem = createNS("image"), this.imageElem.setAttribute("width", this.assetData.w + "px"), this.imageElem.setAttribute("height", this.assetData.h + "px"), this.imageElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.imageElem), this.baseElement.setAttribute("width", this.assetData.w), this.baseElement.setAttribute("height", this.assetData.h)) : this.layerElement.appendChild(e), e.crossOrigin = "anonymous", e.src = t, this.data.ln && this.baseElement.setAttribute("id", this.data.ln)
	}, extendPrototype([BaseRenderer], HybridRendererBase), HybridRendererBase.prototype.buildItem = SVGRenderer.prototype.buildItem, HybridRendererBase.prototype.checkPendingElements = function () {
		for (; this.pendingElements.length;) {
			this.pendingElements.pop().checkParenting()
		}
	}, HybridRendererBase.prototype.appendElementInPos = function (t, e) {
		var r = t.getBaseElement();
		if (r) {
			var i = this.layers[e];
			if (i.ddd && this.supports3d) this.addTo3dContainer(r, e);
			else if (this.threeDElements) this.addTo3dContainer(r, e);
			else {
				for (var s, a, n = 0; n < e;) this.elements[n] && !0 !== this.elements[n] && this.elements[n].getBaseElement && (a = this.elements[n], s = (this.layers[n].ddd ? this.getThreeDContainerByPos(n) : a.getBaseElement()) || s), n += 1;
				s ? i.ddd && this.supports3d || this.layerElement.insertBefore(r, s) : i.ddd && this.supports3d || this.layerElement.appendChild(r)
			}
		}
	}, HybridRendererBase.prototype.createShape = function (t) {
		return this.supports3d ? new HShapeElement(t, this.globalData, this) : new SVGShapeElement(t, this.globalData, this)
	}, HybridRendererBase.prototype.createText = function (t) {
		return this.supports3d ? new HTextElement(t, this.globalData, this) : new SVGTextLottieElement(t, this.globalData, this)
	}, HybridRendererBase.prototype.createCamera = function (t) {
		return this.camera = new HCameraElement(t, this.globalData, this), this.camera
	}, HybridRendererBase.prototype.createImage = function (t) {
		return this.supports3d ? new HImageElement(t, this.globalData, this) : new IImageElement(t, this.globalData, this)
	}, HybridRendererBase.prototype.createSolid = function (t) {
		return this.supports3d ? new HSolidElement(t, this.globalData, this) : new ISolidElement(t, this.globalData, this)
	}, HybridRendererBase.prototype.createNull = SVGRenderer.prototype.createNull, HybridRendererBase.prototype.getThreeDContainerByPos = function (t) {
		for (var e = 0, r = this.threeDElements.length; e < r;) {
			if (this.threeDElements[e].startPos <= t && this.threeDElements[e].endPos >= t) return this.threeDElements[e].perspectiveElem;
			e += 1
		}
		return null
	}, HybridRendererBase.prototype.createThreeDContainer = function (t, e) {
		var r, i, s = createTag("div");
		styleDiv(s);
		var a = createTag("div");
		if (styleDiv(a), "3d" === e) {
			(r = s.style).width = this.globalData.compSize.w + "px", r.height = this.globalData.compSize.h + "px";
			var n = "50% 50%";
			r.webkitTransformOrigin = n, r.mozTransformOrigin = n, r.transformOrigin = n;
			var o = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";
			(i = a.style).transform = o, i.webkitTransform = o
		}
		s.appendChild(a);
		var h = {
			container: a,
			perspectiveElem: s,
			startPos: t,
			endPos: t,
			type: e
		};
		return this.threeDElements.push(h), h
	}, HybridRendererBase.prototype.build3dContainers = function () {
		var t, e, r = this.layers.length,
			i = "";
		for (t = 0; t < r; t += 1) this.layers[t].ddd && 3 !== this.layers[t].ty ? ("3d" !== i && (i = "3d", e = this.createThreeDContainer(t, "3d")), e.endPos = Math.max(e.endPos, t)) : ("2d" !== i && (i = "2d", e = this.createThreeDContainer(t, "2d")), e.endPos = Math.max(e.endPos, t));
		for (t = (r = this.threeDElements.length) - 1; t >= 0; t -= 1) this.resizerElem.appendChild(this.threeDElements[t].perspectiveElem)
	}, HybridRendererBase.prototype.addTo3dContainer = function (t, e) {
		for (var r = 0, i = this.threeDElements.length; r < i;) {
			if (e <= this.threeDElements[r].endPos) {
				for (var s, a = this.threeDElements[r].startPos; a < e;) this.elements[a] && this.elements[a].getBaseElement && (s = this.elements[a].getBaseElement()), a += 1;
				s ? this.threeDElements[r].container.insertBefore(t, s) : this.threeDElements[r].container.appendChild(t);
				break
			}
			r += 1
		}
	}, HybridRendererBase.prototype.configAnimation = function (t) {
		var e = createTag("div"),
			r = this.animationItem.wrapper,
			i = e.style;
		i.width = t.w + "px", i.height = t.h + "px", this.resizerElem = e, styleDiv(e), i.transformStyle = "flat", i.mozTransformStyle = "flat", i.webkitTransformStyle = "flat", this.renderConfig.className && e.setAttribute("class", this.renderConfig.className), r.appendChild(e), i.overflow = "hidden";
		var s = createNS("svg");
		s.setAttribute("width", "1"), s.setAttribute("height", "1"), styleDiv(s), this.resizerElem.appendChild(s);
		var a = createNS("defs");
		s.appendChild(a), this.data = t, this.setupGlobalData(t, s), this.globalData.defs = a, this.layers = t.layers, this.layerElement = this.resizerElem, this.build3dContainers(), this.updateContainerSize()
	}, HybridRendererBase.prototype.destroy = function () {
		var t;
		this.animationItem.wrapper && (this.animationItem.wrapper.innerText = ""), this.animationItem.container = null, this.globalData.defs = null;
		var e = this.layers ? this.layers.length : 0;
		for (t = 0; t < e; t += 1) this.elements[t].destroy();
		this.elements.length = 0, this.destroyed = !0, this.animationItem = null
	}, HybridRendererBase.prototype.updateContainerSize = function () {
		var t, e, r, i, s = this.animationItem.wrapper.offsetWidth,
			a = this.animationItem.wrapper.offsetHeight,
			n = s / a;
		this.globalData.compSize.w / this.globalData.compSize.h > n ? (t = s / this.globalData.compSize.w, e = s / this.globalData.compSize.w, r = 0, i = (a - this.globalData.compSize.h * (s / this.globalData.compSize.w)) / 2) : (t = a / this.globalData.compSize.h, e = a / this.globalData.compSize.h, r = (s - this.globalData.compSize.w * (a / this.globalData.compSize.h)) / 2, i = 0);
		var o = this.resizerElem.style;
		o.webkitTransform = "matrix3d(" + t + ",0,0,0,0," + e + ",0,0,0,0,1,0," + r + "," + i + ",0,1)", o.transform = o.webkitTransform
	}, HybridRendererBase.prototype.renderFrame = SVGRenderer.prototype.renderFrame, HybridRendererBase.prototype.hide = function () {
		this.resizerElem.style.display = "none"
	}, HybridRendererBase.prototype.show = function () {
		this.resizerElem.style.display = "block"
	}, HybridRendererBase.prototype.initItems = function () {
		if (this.buildAllItems(), this.camera) this.camera.setup();
		else {
			var t, e = this.globalData.compSize.w,
				r = this.globalData.compSize.h,
				i = this.threeDElements.length;
			for (t = 0; t < i; t += 1) {
				var s = this.threeDElements[t].perspectiveElem.style;
				s.webkitPerspective = Math.sqrt(Math.pow(e, 2) + Math.pow(r, 2)) + "px", s.perspective = s.webkitPerspective
			}
		}
	}, HybridRendererBase.prototype.searchExtraCompositions = function (t) {
		var e, r = t.length,
			i = createTag("div");
		for (e = 0; e < r; e += 1)
			if (t[e].xt) {
				var s = this.createComp(t[e], i, this.globalData.comp, null);
				s.initExpressions(), this.globalData.projectInterface.registerComposition(s)
			}
	}, extendPrototype([HybridRendererBase, ICompElement, HBaseElement], HCompElement), HCompElement.prototype._createBaseContainerElements = HCompElement.prototype.createContainerElements, HCompElement.prototype.createContainerElements = function () {
		this._createBaseContainerElements(), this.data.hasMask ? (this.svgElement.setAttribute("width", this.data.w), this.svgElement.setAttribute("height", this.data.h), this.transformedElement = this.baseElement) : this.transformedElement = this.layerElement
	}, HCompElement.prototype.addTo3dContainer = function (t, e) {
		for (var r, i = 0; i < e;) this.elements[i] && this.elements[i].getBaseElement && (r = this.elements[i].getBaseElement()), i += 1;
		r ? this.layerElement.insertBefore(t, r) : this.layerElement.appendChild(t)
	}, HCompElement.prototype.createComp = function (t) {
		return this.supports3d ? new HCompElement(t, this.globalData, this) : new SVGCompElement(t, this.globalData, this)
	}, extendPrototype([HybridRendererBase], HybridRenderer), HybridRenderer.prototype.createComp = function (t) {
		return this.supports3d ? new HCompElement(t, this.globalData, this) : new SVGCompElement(t, this.globalData, this)
	};
	var CompExpressionInterface = function (t) {
			function e(e) {
				for (var r = 0, i = t.layers.length; r < i;) {
					if (t.layers[r].nm === e || t.layers[r].ind === e) return t.elements[r].layerInterface;
					r += 1
				}
				return null
			}
			return Object.defineProperty(e, "_name", {
				value: t.data.nm
			}), e.layer = e, e.pixelAspect = 1, e.height = t.data.h || t.globalData.compSize.h, e.width = t.data.w || t.globalData.compSize.w, e.pixelAspect = 1, e.frameDuration = 1 / t.globalData.frameRate, e.displayStartTime = 0, e.numLayers = t.layers.length, e
		},
		Expressions = function () {
			var t = {};
			return t.initExpressions = function (t) {
				var e = 0,
					r = [];
				t.renderer.compInterface = CompExpressionInterface(t.renderer), t.renderer.globalData.projectInterface.registerComposition(t.renderer), t.renderer.globalData.pushExpression = function () {
					e += 1
				}, t.renderer.globalData.popExpression = function () {
					0 == (e -= 1) && function () {
						var t, e = r.length;
						for (t = 0; t < e; t += 1) r[t].release();
						r.length = 0
					}()
				}, t.renderer.globalData.registerExpressionProperty = function (t) {
					-1 === r.indexOf(t) && r.push(t)
				}
			}, t
		}(),
		MaskManagerInterface = function () {
			function t(t, e) {
				this._mask = t, this._data = e
			}
			Object.defineProperty(t.prototype, "maskPath", {
				get: function () {
					return this._mask.prop.k && this._mask.prop.getValue(), this._mask.prop
				}
			}), Object.defineProperty(t.prototype, "maskOpacity", {
				get: function () {
					return this._mask.op.k && this._mask.op.getValue(), 100 * this._mask.op.v
				}
			});
			return function (e) {
				var r, i = createSizedArray(e.viewData.length),
					s = e.viewData.length;
				for (r = 0; r < s; r += 1) i[r] = new t(e.viewData[r], e.masksProperties[r]);
				return function (t) {
					for (r = 0; r < s;) {
						if (e.masksProperties[r].nm === t) return i[r];
						r += 1
					}
					return null
				}
			}
		}(),
		ExpressionPropertyInterface = function () {
			var t = {
					pv: 0,
					v: 0,
					mult: 1
				},
				e = {
					pv: [0, 0, 0],
					v: [0, 0, 0],
					mult: 1
				};

			function r(t, e, r) {
				Object.defineProperty(t, "velocity", {
					get: function () {
						return e.getVelocityAtTime(e.comp.currentFrame)
					}
				}), t.numKeys = e.keyframes ? e.keyframes.length : 0, t.key = function (i) {
					if (!t.numKeys) return 0;
					var s = "";
					s = "s" in e.keyframes[i - 1] ? e.keyframes[i - 1].s : "e" in e.keyframes[i - 2] ? e.keyframes[i - 2].e : e.keyframes[i - 2].s;
					var a = "unidimensional" === r ? new Number(s) : Object.assign({}, s);
					return a.time = e.keyframes[i - 1].t / e.elem.comp.globalData.frameRate, a.value = "unidimensional" === r ? s[0] : s, a
				}, t.valueAtTime = e.getValueAtTime, t.speedAtTime = e.getSpeedAtTime, t.velocityAtTime = e.getVelocityAtTime, t.propertyGroup = e.propertyGroup
			}

			function i() {
				return t
			}
			return function (s) {
				return s ? "unidimensional" === s.propType ? function (e) {
					e && "pv" in e || (e = t);
					var i = 1 / e.mult,
						s = e.pv * i,
						a = new Number(s);
					return a.value = s, r(a, e, "unidimensional"),
						function () {
							return e.k && e.getValue(), s = e.v * i, a.value !== s && ((a = new Number(s)).value = s, r(a, e, "unidimensional")), a
						}
				}(s) : function (t) {
					t && "pv" in t || (t = e);
					var i = 1 / t.mult,
						s = t.data && t.data.l || t.pv.length,
						a = createTypedArray("float32", s),
						n = createTypedArray("float32", s);
					return a.value = n, r(a, t, "multidimensional"),
						function () {
							t.k && t.getValue();
							for (var e = 0; e < s; e += 1) n[e] = t.v[e] * i, a[e] = n[e];
							return a
						}
				}(s) : i
			}
		}(),
		TransformExpressionInterface = function (t) {
			function e(t) {
				switch (t) {
					case "scale":
					case "Scale":
					case "ADBE Scale":
					case 6:
						return e.scale;
					case "rotation":
					case "Rotation":
					case "ADBE Rotation":
					case "ADBE Rotate Z":
					case 10:
						return e.rotation;
					case "ADBE Rotate X":
						return e.xRotation;
					case "ADBE Rotate Y":
						return e.yRotation;
					case "position":
					case "Position":
					case "ADBE Position":
					case 2:
						return e.position;
					case "ADBE Position_0":
						return e.xPosition;
					case "ADBE Position_1":
						return e.yPosition;
					case "ADBE Position_2":
						return e.zPosition;
					case "anchorPoint":
					case "AnchorPoint":
					case "Anchor Point":
					case "ADBE AnchorPoint":
					case 1:
						return e.anchorPoint;
					case "opacity":
					case "Opacity":
					case 11:
						return e.opacity;
					default:
						return null
				}
			}
			var r, i, s, a;
			return Object.defineProperty(e, "rotation", {
				get: ExpressionPropertyInterface(t.r || t.rz)
			}), Object.defineProperty(e, "zRotation", {
				get: ExpressionPropertyInterface(t.rz || t.r)
			}), Object.defineProperty(e, "xRotation", {
				get: ExpressionPropertyInterface(t.rx)
			}), Object.defineProperty(e, "yRotation", {
				get: ExpressionPropertyInterface(t.ry)
			}), Object.defineProperty(e, "scale", {
				get: ExpressionPropertyInterface(t.s)
			}), t.p ? a = ExpressionPropertyInterface(t.p) : (r = ExpressionPropertyInterface(t.px), i = ExpressionPropertyInterface(t.py), t.pz && (s = ExpressionPropertyInterface(t.pz))), Object.defineProperty(e, "position", {
				get: function () {
					return t.p ? a() : [r(), i(), s ? s() : 0]
				}
			}), Object.defineProperty(e, "xPosition", {
				get: ExpressionPropertyInterface(t.px)
			}), Object.defineProperty(e, "yPosition", {
				get: ExpressionPropertyInterface(t.py)
			}), Object.defineProperty(e, "zPosition", {
				get: ExpressionPropertyInterface(t.pz)
			}), Object.defineProperty(e, "anchorPoint", {
				get: ExpressionPropertyInterface(t.a)
			}), Object.defineProperty(e, "opacity", {
				get: ExpressionPropertyInterface(t.o)
			}), Object.defineProperty(e, "skew", {
				get: ExpressionPropertyInterface(t.sk)
			}), Object.defineProperty(e, "skewAxis", {
				get: ExpressionPropertyInterface(t.sa)
			}), Object.defineProperty(e, "orientation", {
				get: ExpressionPropertyInterface(t.or)
			}), e
		},
		LayerExpressionInterface = function () {
			function t(t) {
				var e = new Matrix;
				void 0 !== t ? this._elem.finalTransform.mProp.getValueAtTime(t).clone(e) : this._elem.finalTransform.mProp.applyToMatrix(e);
				return e
			}

			function e(t, e) {
				var r = this.getMatrix(e);
				return r.props[12] = 0, r.props[13] = 0, r.props[14] = 0, this.applyPoint(r, t)
			}

			function r(t, e) {
				var r = this.getMatrix(e);
				return this.applyPoint(r, t)
			}

			function i(t, e) {
				var r = this.getMatrix(e);
				return r.props[12] = 0, r.props[13] = 0, r.props[14] = 0, this.invertPoint(r, t)
			}

			function s(t, e) {
				var r = this.getMatrix(e);
				return this.invertPoint(r, t)
			}

			function a(t, e) {
				if (this._elem.hierarchy && this._elem.hierarchy.length) {
					var r, i = this._elem.hierarchy.length;
					for (r = 0; r < i; r += 1) this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(t)
				}
				return t.applyToPointArray(e[0], e[1], e[2] || 0)
			}

			function n(t, e) {
				if (this._elem.hierarchy && this._elem.hierarchy.length) {
					var r, i = this._elem.hierarchy.length;
					for (r = 0; r < i; r += 1) this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(t)
				}
				return t.inversePoint(e)
			}

			function o(t) {
				var e = new Matrix;
				if (e.reset(), this._elem.finalTransform.mProp.applyToMatrix(e), this._elem.hierarchy && this._elem.hierarchy.length) {
					var r, i = this._elem.hierarchy.length;
					for (r = 0; r < i; r += 1) this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(e);
					return e.inversePoint(t)
				}
				return e.inversePoint(t)
			}

			function h() {
				return [1, 1, 1, 1]
			}
			return function (l) {
				var p;

				function f(t) {
					switch (t) {
						case "ADBE Root Vectors Group":
						case "Contents":
						case 2:
							return f.shapeInterface;
						case 1:
						case 6:
						case "Transform":
						case "transform":
						case "ADBE Transform Group":
							return p;
						case 4:
						case "ADBE Effect Parade":
						case "effects":
						case "Effects":
							return f.effect;
						case "ADBE Text Properties":
							return f.textInterface;
						default:
							return null
					}
				}
				f.getMatrix = t, f.invertPoint = n, f.applyPoint = a, f.toWorld = r, f.toWorldVec = e, f.fromWorld = s, f.fromWorldVec = i, f.toComp = r, f.fromComp = o, f.sampleImage = h, f.sourceRectAtTime = l.sourceRectAtTime.bind(l), f._elem = l;
				var m = getDescriptor(p = TransformExpressionInterface(l.finalTransform.mProp), "anchorPoint");
				return Object.defineProperties(f, {
					hasParent: {
						get: function () {
							return l.hierarchy.length
						}
					},
					parent: {
						get: function () {
							return l.hierarchy[0].layerInterface
						}
					},
					rotation: getDescriptor(p, "rotation"),
					scale: getDescriptor(p, "scale"),
					position: getDescriptor(p, "position"),
					opacity: getDescriptor(p, "opacity"),
					anchorPoint: m,
					anchor_point: m,
					transform: {
						get: function () {
							return p
						}
					},
					active: {
						get: function () {
							return l.isInRange
						}
					}
				}), f.startTime = l.data.st, f.index = l.data.ind, f.source = l.data.refId, f.height = 0 === l.data.ty ? l.data.h : 100, f.width = 0 === l.data.ty ? l.data.w : 100, f.inPoint = l.data.ip / l.comp.globalData.frameRate, f.outPoint = l.data.op / l.comp.globalData.frameRate, f._name = l.data.nm, f.registerMaskInterface = function (t) {
					f.mask = new MaskManagerInterface(t, l)
				}, f.registerEffectsInterface = function (t) {
					f.effect = t
				}, f
			}
		}(),
		propertyGroupFactory = function (t, e) {
			return function (r) {
				return (r = void 0 === r ? 1 : r) <= 0 ? t : e(r - 1)
			}
		},
		PropertyInterface = function (t, e) {
			var r = {
				_name: t
			};
			return function (t) {
				return (t = void 0 === t ? 1 : t) <= 0 ? r : e(t - 1)
			}
		},
		EffectsExpressionInterface = function () {
			function t(r, i, s, a) {
				function n(t) {
					for (var e = r.ef, i = 0, s = e.length; i < s;) {
						if (t === e[i].nm || t === e[i].mn || t === e[i].ix) return 5 === e[i].ty ? l[i] : l[i]();
						i += 1
					}
					throw new Error
				}
				var o, h = propertyGroupFactory(n, s),
					l = [],
					p = r.ef.length;
				for (o = 0; o < p; o += 1) 5 === r.ef[o].ty ? l.push(t(r.ef[o], i.effectElements[o], i.effectElements[o].propertyGroup, a)) : l.push(e(i.effectElements[o], r.ef[o].ty, a, h));
				return "ADBE Color Control" === r.mn && Object.defineProperty(n, "color", {
					get: function () {
						return l[0]()
					}
				}), Object.defineProperties(n, {
					numProperties: {
						get: function () {
							return r.np
						}
					},
					_name: {
						value: r.nm
					},
					propertyGroup: {
						value: h
					}
				}), n.enabled = 0 !== r.en, n.active = n.enabled, n
			}

			function e(t, e, r, i) {
				var s = ExpressionPropertyInterface(t.p);
				return t.p.setGroupProperty && t.p.setGroupProperty(PropertyInterface("", i)),
					function () {
						return 10 === e ? r.comp.compInterface(t.p.v) : s()
					}
			}
			return {
				createEffectsInterface: function (e, r) {
					if (e.effectsManager) {
						var i, s = [],
							a = e.data.ef,
							n = e.effectsManager.effectElements.length;
						for (i = 0; i < n; i += 1) s.push(t(a[i], e.effectsManager.effectElements[i], r, e));
						var o = e.data.ef || [],
							h = function (t) {
								for (i = 0, n = o.length; i < n;) {
									if (t === o[i].nm || t === o[i].mn || t === o[i].ix) return s[i];
									i += 1
								}
								return null
							};
						return Object.defineProperty(h, "numProperties", {
							get: function () {
								return o.length
							}
						}), h
					}
					return null
				}
			}
		}(),
		ShapePathInterface = function (t, e, r) {
			var i = e.sh;

			function s(t) {
				return "Shape" === t || "shape" === t || "Path" === t || "path" === t || "ADBE Vector Shape" === t || 2 === t ? s.path : null
			}
			var a = propertyGroupFactory(s, r);
			return i.setGroupProperty(PropertyInterface("Path", a)), Object.defineProperties(s, {
				path: {
					get: function () {
						return i.k && i.getValue(), i
					}
				},
				shape: {
					get: function () {
						return i.k && i.getValue(), i
					}
				},
				_name: {
					value: t.nm
				},
				ix: {
					value: t.ix
				},
				propertyIndex: {
					value: t.ix
				},
				mn: {
					value: t.mn
				},
				propertyGroup: {
					value: r
				}
			}), s
		},
		ShapeExpressionInterface = function () {
			function t(t, o, c) {
				var d, u = [],
					y = t ? t.length : 0;
				for (d = 0; d < y; d += 1) "gr" === t[d].ty ? u.push(e(t[d], o[d], c)) : "fl" === t[d].ty ? u.push(r(t[d], o[d], c)) : "st" === t[d].ty ? u.push(a(t[d], o[d], c)) : "tm" === t[d].ty ? u.push(n(t[d], o[d], c)) : "tr" === t[d].ty || ("el" === t[d].ty ? u.push(h(t[d], o[d], c)) : "sr" === t[d].ty ? u.push(l(t[d], o[d], c)) : "sh" === t[d].ty ? u.push(ShapePathInterface(t[d], o[d], c)) : "rc" === t[d].ty ? u.push(p(t[d], o[d], c)) : "rd" === t[d].ty ? u.push(f(t[d], o[d], c)) : "rp" === t[d].ty ? u.push(m(t[d], o[d], c)) : "gf" === t[d].ty ? u.push(i(t[d], o[d], c)) : u.push(s(t[d], o[d])));
				return u
			}

			function e(e, r, i) {
				var s = function (t) {
					switch (t) {
						case "ADBE Vectors Group":
						case "Contents":
						case 2:
							return s.content;
						default:
							return s.transform
					}
				};
				s.propertyGroup = propertyGroupFactory(s, i);
				var a = function (e, r, i) {
						var s, a = function (t) {
							for (var e = 0, r = s.length; e < r;) {
								if (s[e]._name === t || s[e].mn === t || s[e].propertyIndex === t || s[e].ix === t || s[e].ind === t) return s[e];
								e += 1
							}
							return "number" == typeof t ? s[t - 1] : null
						};
						a.propertyGroup = propertyGroupFactory(a, i), s = t(e.it, r.it, a.propertyGroup), a.numProperties = s.length;
						var n = o(e.it[e.it.length - 1], r.it[r.it.length - 1], a.propertyGroup);
						return a.transform = n, a.propertyIndex = e.cix, a._name = e.nm, a
					}(e, r, s.propertyGroup),
					n = o(e.it[e.it.length - 1], r.it[r.it.length - 1], s.propertyGroup);
				return s.content = a, s.transform = n, Object.defineProperty(s, "_name", {
					get: function () {
						return e.nm
					}
				}), s.numProperties = e.np, s.propertyIndex = e.ix, s.nm = e.nm, s.mn = e.mn, s
			}

			function r(t, e, r) {
				function i(t) {
					return "Color" === t || "color" === t ? i.color : "Opacity" === t || "opacity" === t ? i.opacity : null
				}
				return Object.defineProperties(i, {
					color: {
						get: ExpressionPropertyInterface(e.c)
					},
					opacity: {
						get: ExpressionPropertyInterface(e.o)
					},
					_name: {
						value: t.nm
					},
					mn: {
						value: t.mn
					}
				}), e.c.setGroupProperty(PropertyInterface("Color", r)), e.o.setGroupProperty(PropertyInterface("Opacity", r)), i
			}

			function i(t, e, r) {
				function i(t) {
					return "Start Point" === t || "start point" === t ? i.startPoint : "End Point" === t || "end point" === t ? i.endPoint : "Opacity" === t || "opacity" === t ? i.opacity : null
				}
				return Object.defineProperties(i, {
					startPoint: {
						get: ExpressionPropertyInterface(e.s)
					},
					endPoint: {
						get: ExpressionPropertyInterface(e.e)
					},
					opacity: {
						get: ExpressionPropertyInterface(e.o)
					},
					type: {
						get: function () {
							return "a"
						}
					},
					_name: {
						value: t.nm
					},
					mn: {
						value: t.mn
					}
				}), e.s.setGroupProperty(PropertyInterface("Start Point", r)), e.e.setGroupProperty(PropertyInterface("End Point", r)), e.o.setGroupProperty(PropertyInterface("Opacity", r)), i
			}

			function s() {
				return function () {
					return null
				}
			}

			function a(t, e, r) {
				var i, s = propertyGroupFactory(l, r),
					a = propertyGroupFactory(h, s);

				function n(r) {
					Object.defineProperty(h, t.d[r].nm, {
						get: ExpressionPropertyInterface(e.d.dataProps[r].p)
					})
				}
				var o = t.d ? t.d.length : 0,
					h = {};
				for (i = 0; i < o; i += 1) n(i), e.d.dataProps[i].p.setGroupProperty(a);

				function l(t) {
					return "Color" === t || "color" === t ? l.color : "Opacity" === t || "opacity" === t ? l.opacity : "Stroke Width" === t || "stroke width" === t ? l.strokeWidth : null
				}
				return Object.defineProperties(l, {
					color: {
						get: ExpressionPropertyInterface(e.c)
					},
					opacity: {
						get: ExpressionPropertyInterface(e.o)
					},
					strokeWidth: {
						get: ExpressionPropertyInterface(e.w)
					},
					dash: {
						get: function () {
							return h
						}
					},
					_name: {
						value: t.nm
					},
					mn: {
						value: t.mn
					}
				}), e.c.setGroupProperty(PropertyInterface("Color", s)), e.o.setGroupProperty(PropertyInterface("Opacity", s)), e.w.setGroupProperty(PropertyInterface("Stroke Width", s)), l
			}

			function n(t, e, r) {
				function i(e) {
					return e === t.e.ix || "End" === e || "end" === e ? i.end : e === t.s.ix ? i.start : e === t.o.ix ? i.offset : null
				}
				var s = propertyGroupFactory(i, r);
				return i.propertyIndex = t.ix, e.s.setGroupProperty(PropertyInterface("Start", s)), e.e.setGroupProperty(PropertyInterface("End", s)), e.o.setGroupProperty(PropertyInterface("Offset", s)), i.propertyIndex = t.ix, i.propertyGroup = r, Object.defineProperties(i, {
					start: {
						get: ExpressionPropertyInterface(e.s)
					},
					end: {
						get: ExpressionPropertyInterface(e.e)
					},
					offset: {
						get: ExpressionPropertyInterface(e.o)
					},
					_name: {
						value: t.nm
					}
				}), i.mn = t.mn, i
			}

			function o(t, e, r) {
				function i(e) {
					return t.a.ix === e || "Anchor Point" === e ? i.anchorPoint : t.o.ix === e || "Opacity" === e ? i.opacity : t.p.ix === e || "Position" === e ? i.position : t.r.ix === e || "Rotation" === e || "ADBE Vector Rotation" === e ? i.rotation : t.s.ix === e || "Scale" === e ? i.scale : t.sk && t.sk.ix === e || "Skew" === e ? i.skew : t.sa && t.sa.ix === e || "Skew Axis" === e ? i.skewAxis : null
				}
				var s = propertyGroupFactory(i, r);
				return e.transform.mProps.o.setGroupProperty(PropertyInterface("Opacity", s)), e.transform.mProps.p.setGroupProperty(PropertyInterface("Position", s)), e.transform.mProps.a.setGroupProperty(PropertyInterface("Anchor Point", s)), e.transform.mProps.s.setGroupProperty(PropertyInterface("Scale", s)), e.transform.mProps.r.setGroupProperty(PropertyInterface("Rotation", s)), e.transform.mProps.sk && (e.transform.mProps.sk.setGroupProperty(PropertyInterface("Skew", s)), e.transform.mProps.sa.setGroupProperty(PropertyInterface("Skew Angle", s))), e.transform.op.setGroupProperty(PropertyInterface("Opacity", s)), Object.defineProperties(i, {
					opacity: {
						get: ExpressionPropertyInterface(e.transform.mProps.o)
					},
					position: {
						get: ExpressionPropertyInterface(e.transform.mProps.p)
					},
					anchorPoint: {
						get: ExpressionPropertyInterface(e.transform.mProps.a)
					},
					scale: {
						get: ExpressionPropertyInterface(e.transform.mProps.s)
					},
					rotation: {
						get: ExpressionPropertyInterface(e.transform.mProps.r)
					},
					skew: {
						get: ExpressionPropertyInterface(e.transform.mProps.sk)
					},
					skewAxis: {
						get: ExpressionPropertyInterface(e.transform.mProps.sa)
					},
					_name: {
						value: t.nm
					}
				}), i.ty = "tr", i.mn = t.mn, i.propertyGroup = r, i
			}

			function h(t, e, r) {
				function i(e) {
					return t.p.ix === e ? i.position : t.s.ix === e ? i.size : null
				}
				var s = propertyGroupFactory(i, r);
				i.propertyIndex = t.ix;
				var a = "tm" === e.sh.ty ? e.sh.prop : e.sh;
				return a.s.setGroupProperty(PropertyInterface("Size", s)), a.p.setGroupProperty(PropertyInterface("Position", s)), Object.defineProperties(i, {
					size: {
						get: ExpressionPropertyInterface(a.s)
					},
					position: {
						get: ExpressionPropertyInterface(a.p)
					},
					_name: {
						value: t.nm
					}
				}), i.mn = t.mn, i
			}

			function l(t, e, r) {
				function i(e) {
					return t.p.ix === e ? i.position : t.r.ix === e ? i.rotation : t.pt.ix === e ? i.points : t.or.ix === e || "ADBE Vector Star Outer Radius" === e ? i.outerRadius : t.os.ix === e ? i.outerRoundness : !t.ir || t.ir.ix !== e && "ADBE Vector Star Inner Radius" !== e ? t.is && t.is.ix === e ? i.innerRoundness : null : i.innerRadius
				}
				var s = propertyGroupFactory(i, r),
					a = "tm" === e.sh.ty ? e.sh.prop : e.sh;
				return i.propertyIndex = t.ix, a.or.setGroupProperty(PropertyInterface("Outer Radius", s)), a.os.setGroupProperty(PropertyInterface("Outer Roundness", s)), a.pt.setGroupProperty(PropertyInterface("Points", s)), a.p.setGroupProperty(PropertyInterface("Position", s)), a.r.setGroupProperty(PropertyInterface("Rotation", s)), t.ir && (a.ir.setGroupProperty(PropertyInterface("Inner Radius", s)), a.is.setGroupProperty(PropertyInterface("Inner Roundness", s))), Object.defineProperties(i, {
					position: {
						get: ExpressionPropertyInterface(a.p)
					},
					rotation: {
						get: ExpressionPropertyInterface(a.r)
					},
					points: {
						get: ExpressionPropertyInterface(a.pt)
					},
					outerRadius: {
						get: ExpressionPropertyInterface(a.or)
					},
					outerRoundness: {
						get: ExpressionPropertyInterface(a.os)
					},
					innerRadius: {
						get: ExpressionPropertyInterface(a.ir)
					},
					innerRoundness: {
						get: ExpressionPropertyInterface(a.is)
					},
					_name: {
						value: t.nm
					}
				}), i.mn = t.mn, i
			}

			function p(t, e, r) {
				function i(e) {
					return t.p.ix === e ? i.position : t.r.ix === e ? i.roundness : t.s.ix === e || "Size" === e || "ADBE Vector Rect Size" === e ? i.size : null
				}
				var s = propertyGroupFactory(i, r),
					a = "tm" === e.sh.ty ? e.sh.prop : e.sh;
				return i.propertyIndex = t.ix, a.p.setGroupProperty(PropertyInterface("Position", s)), a.s.setGroupProperty(PropertyInterface("Size", s)), a.r.setGroupProperty(PropertyInterface("Rotation", s)), Object.defineProperties(i, {
					position: {
						get: ExpressionPropertyInterface(a.p)
					},
					roundness: {
						get: ExpressionPropertyInterface(a.r)
					},
					size: {
						get: ExpressionPropertyInterface(a.s)
					},
					_name: {
						value: t.nm
					}
				}), i.mn = t.mn, i
			}

			function f(t, e, r) {
				function i(e) {
					return t.r.ix === e || "Round Corners 1" === e ? i.radius : null
				}
				var s = propertyGroupFactory(i, r),
					a = e;
				return i.propertyIndex = t.ix, a.rd.setGroupProperty(PropertyInterface("Radius", s)), Object.defineProperties(i, {
					radius: {
						get: ExpressionPropertyInterface(a.rd)
					},
					_name: {
						value: t.nm
					}
				}), i.mn = t.mn, i
			}

			function m(t, e, r) {
				function i(e) {
					return t.c.ix === e || "Copies" === e ? i.copies : t.o.ix === e || "Offset" === e ? i.offset : null
				}
				var s = propertyGroupFactory(i, r),
					a = e;
				return i.propertyIndex = t.ix, a.c.setGroupProperty(PropertyInterface("Copies", s)), a.o.setGroupProperty(PropertyInterface("Offset", s)), Object.defineProperties(i, {
					copies: {
						get: ExpressionPropertyInterface(a.c)
					},
					offset: {
						get: ExpressionPropertyInterface(a.o)
					},
					_name: {
						value: t.nm
					}
				}), i.mn = t.mn, i
			}
			return function (e, r, i) {
				var s;

				function a(t) {
					if ("number" == typeof t) return 0 === (t = void 0 === t ? 1 : t) ? i : s[t - 1];
					for (var e = 0, r = s.length; e < r;) {
						if (s[e]._name === t) return s[e];
						e += 1
					}
					return null
				}
				return a.propertyGroup = propertyGroupFactory(a, (function () {
					return i
				})), s = t(e, r, a.propertyGroup), a.numProperties = s.length, a._name = "Contents", a
			}
		}(),
		TextExpressionInterface = function (t) {
			var e, r;

			function i(t) {
				return "ADBE Text Document" === t ? i.sourceText : null
			}
			return Object.defineProperty(i, "sourceText", {
				get: function () {
					t.textProperty.getValue();
					var i = t.textProperty.currentData.t;
					return i !== e && (e = t.textProperty.currentData.t, (r = new String(i)).value = i || new String(i), Object.defineProperty(r, "style", {
						get: function () {
							return {
								fillColor: t.textProperty.currentData.fc
							}
						}
					})), r
				}
			}), i
		};

	function _typeof$2(t) {
		return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
			return typeof t
		} : function (t) {
			return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
		}, _typeof$2(t)
	}
	var FootageInterface = (dataInterfaceFactory = function (t) {
			function e(t) {
				return "Outline" === t ? e.outlineInterface() : null
			}
			return e._name = "Outline", e.outlineInterface = function (t) {
				var e = "",
					r = t.getFootageData();

				function i(t) {
					if (r[t]) return e = t, "object" === _typeof$2(r = r[t]) ? i : r;
					var s = t.indexOf(e);
					if (-1 !== s) {
						var a = parseInt(t.substr(s + e.length), 10);
						return "object" === _typeof$2(r = r[a]) ? i : r
					}
					return ""
				}
				return function () {
					return e = "", r = t.getFootageData(), i
				}
			}(t), e
		}, function (t) {
			function e(t) {
				return "Data" === t ? e.dataInterface : null
			}
			return e._name = "Data", e.dataInterface = dataInterfaceFactory(t), e
		}),
		dataInterfaceFactory, interfaces = {
			layer: LayerExpressionInterface,
			effects: EffectsExpressionInterface,
			comp: CompExpressionInterface,
			shape: ShapeExpressionInterface,
			text: TextExpressionInterface,
			footage: FootageInterface
		};

	function getInterface(t) {
		return interfaces[t] || null
	}

	function _typeof$1(t) {
		return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
			return typeof t
		} : function (t) {
			return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
		}, _typeof$1(t)
	}

	function seedRandom(t, e) {
		var r, i = this,
			s = 256,
			a = e.pow(s, 6),
			n = e.pow(2, 52),
			o = 2 * n,
			h = 255;

		function l(t) {
			var e, r = t.length,
				i = this,
				a = 0,
				n = i.i = i.j = 0,
				o = i.S = [];
			for (r || (t = [r++]); a < s;) o[a] = a++;
			for (a = 0; a < s; a++) o[a] = o[n = h & n + t[a % r] + (e = o[a])], o[n] = e;
			i.g = function (t) {
				for (var e, r = 0, a = i.i, n = i.j, o = i.S; t--;) e = o[a = h & a + 1], r = r * s + o[h & (o[a] = o[n = h & n + e]) + (o[n] = e)];
				return i.i = a, i.j = n, r
			}
		}

		function p(t, e) {
			return e.i = t.i, e.j = t.j, e.S = t.S.slice(), e
		}

		function f(t, e) {
			var r, i = [],
				s = _typeof$1(t);
			if (e && "object" == s)
				for (r in t) try {
					i.push(f(t[r], e - 1))
				} catch (t) {}
			return i.length ? i : "string" == s ? t : t + "\0"
		}

		function m(t, e) {
			for (var r, i = t + "", s = 0; s < i.length;) e[h & s] = h & (r ^= 19 * e[h & s]) + i.charCodeAt(s++);
			return c(e)
		}

		function c(t) {
			return String.fromCharCode.apply(0, t)
		}
		e.seedrandom = function (h, d, u) {
			var y = [],
				g = m(f((d = !0 === d ? {
					entropy: !0
				} : d || {}).entropy ? [h, c(t)] : null === h ? function () {
					try {
						r;
						var e = new Uint8Array(s);
						return (i.crypto || i.msCrypto).getRandomValues(e), c(e)
					} catch (e) {
						var a = i.navigator,
							n = a && a.plugins;
						return [+new Date, i, n, i.screen, c(t)]
					}
				}() : h, 3), y),
				v = new l(y),
				b = function () {
					for (var t = v.g(6), e = a, r = 0; t < n;) t = (t + r) * s, e *= s, r = v.g(1);
					for (; t >= o;) t /= 2, e /= 2, r >>>= 1;
					return (t + r) / e
				};
			return b.int32 = function () {
				return 0 | v.g(4)
			}, b.quick = function () {
				return v.g(4) / 4294967296
			}, b.double = b, m(c(v.S), t), (d.pass || u || function (t, r, i, s) {
				return s && (s.S && p(s, v), t.state = function () {
					return p(v, {})
				}), i ? (e.random = t, r) : t
			})(b, g, "global" in d ? d.global : this == e, d.state)
		}, m(e.random(), t)
	}

	function initialize$2(t) {
		seedRandom([], t)
	}
	var propTypes = {
		SHAPE: "shape"
	};

	function _typeof(t) {
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
			return typeof t
		} : function (t) {
			return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
		}, _typeof(t)
	}
	var ExpressionManager = function () {
			var ob = {},
				Math = BMMath,
				window = null,
				document = null,
				XMLHttpRequest = null,
				fetch = null,
				frames = null;

			function $bm_isInstanceOfArray(t) {
				return t.constructor === Array || t.constructor === Float32Array
			}

			function isNumerable(t, e) {
				return "number" === t || "boolean" === t || "string" === t || e instanceof Number
			}

			function $bm_neg(t) {
				var e = _typeof(t);
				if ("number" === e || "boolean" === e || t instanceof Number) return -t;
				if ($bm_isInstanceOfArray(t)) {
					var r, i = t.length,
						s = [];
					for (r = 0; r < i; r += 1) s[r] = -t[r];
					return s
				}
				return t.propType ? t.v : -t
			}
			initialize$2(BMMath);
			var easeInBez = BezierFactory.getBezierEasing(.333, 0, .833, .833, "easeIn").get,
				easeOutBez = BezierFactory.getBezierEasing(.167, .167, .667, 1, "easeOut").get,
				easeInOutBez = BezierFactory.getBezierEasing(.33, 0, .667, 1, "easeInOut").get;

			function sum(t, e) {
				var r = _typeof(t),
					i = _typeof(e);
				if ("string" === r || "string" === i) return t + e;
				if (isNumerable(r, t) && isNumerable(i, e)) return t + e;
				if ($bm_isInstanceOfArray(t) && isNumerable(i, e)) return (t = t.slice(0))[0] += e, t;
				if (isNumerable(r, t) && $bm_isInstanceOfArray(e)) return (e = e.slice(0))[0] = t + e[0], e;
				if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
					for (var s = 0, a = t.length, n = e.length, o = []; s < a || s < n;)("number" == typeof t[s] || t[s] instanceof Number) && ("number" == typeof e[s] || e[s] instanceof Number) ? o[s] = t[s] + e[s] : o[s] = void 0 === e[s] ? t[s] : t[s] || e[s], s += 1;
					return o
				}
				return 0
			}
			var add = sum;

			function sub(t, e) {
				var r = _typeof(t),
					i = _typeof(e);
				if (isNumerable(r, t) && isNumerable(i, e)) return "string" === r && (t = parseInt(t, 10)), "string" === i && (e = parseInt(e, 10)), t - e;
				if ($bm_isInstanceOfArray(t) && isNumerable(i, e)) return (t = t.slice(0))[0] -= e, t;
				if (isNumerable(r, t) && $bm_isInstanceOfArray(e)) return (e = e.slice(0))[0] = t - e[0], e;
				if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
					for (var s = 0, a = t.length, n = e.length, o = []; s < a || s < n;)("number" == typeof t[s] || t[s] instanceof Number) && ("number" == typeof e[s] || e[s] instanceof Number) ? o[s] = t[s] - e[s] : o[s] = void 0 === e[s] ? t[s] : t[s] || e[s], s += 1;
					return o
				}
				return 0
			}

			function mul(t, e) {
				var r, i, s, a = _typeof(t),
					n = _typeof(e);
				if (isNumerable(a, t) && isNumerable(n, e)) return t * e;
				if ($bm_isInstanceOfArray(t) && isNumerable(n, e)) {
					for (s = t.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) r[i] = t[i] * e;
					return r
				}
				if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
					for (s = e.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) r[i] = t * e[i];
					return r
				}
				return 0
			}

			function div(t, e) {
				var r, i, s, a = _typeof(t),
					n = _typeof(e);
				if (isNumerable(a, t) && isNumerable(n, e)) return t / e;
				if ($bm_isInstanceOfArray(t) && isNumerable(n, e)) {
					for (s = t.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) r[i] = t[i] / e;
					return r
				}
				if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
					for (s = e.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) r[i] = t / e[i];
					return r
				}
				return 0
			}

			function mod(t, e) {
				return "string" == typeof t && (t = parseInt(t, 10)), "string" == typeof e && (e = parseInt(e, 10)), t % e
			}
			var $bm_sum = sum,
				$bm_sub = sub,
				$bm_mul = mul,
				$bm_div = div,
				$bm_mod = mod;

			function clamp(t, e, r) {
				if (e > r) {
					var i = r;
					r = e, e = i
				}
				return Math.min(Math.max(t, e), r)
			}

			function radiansToDegrees(t) {
				return t / degToRads
			}
			var radians_to_degrees = radiansToDegrees;

			function degreesToRadians(t) {
				return t * degToRads
			}
			var degrees_to_radians = radiansToDegrees,
				helperLengthArray = [0, 0, 0, 0, 0, 0];

			function length(t, e) {
				if ("number" == typeof t || t instanceof Number) return e = e || 0, Math.abs(t - e);
				var r;
				e || (e = helperLengthArray);
				var i = Math.min(t.length, e.length),
					s = 0;
				for (r = 0; r < i; r += 1) s += Math.pow(e[r] - t[r], 2);
				return Math.sqrt(s)
			}

			function normalize(t) {
				return div(t, length(t))
			}

			function rgbToHsl(t) {
				var e, r, i = t[0],
					s = t[1],
					a = t[2],
					n = Math.max(i, s, a),
					o = Math.min(i, s, a),
					h = (n + o) / 2;
				if (n === o) e = 0, r = 0;
				else {
					var l = n - o;
					switch (r = h > .5 ? l / (2 - n - o) : l / (n + o), n) {
						case i:
							e = (s - a) / l + (s < a ? 6 : 0);
							break;
						case s:
							e = (a - i) / l + 2;
							break;
						case a:
							e = (i - s) / l + 4
					}
					e /= 6
				}
				return [e, r, h, t[3]]
			}

			function hue2rgb(t, e, r) {
				return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? t + 6 * (e - t) * r : r < .5 ? e : r < 2 / 3 ? t + (e - t) * (2 / 3 - r) * 6 : t
			}

			function hslToRgb(t) {
				var e, r, i, s = t[0],
					a = t[1],
					n = t[2];
				if (0 === a) e = n, i = n, r = n;
				else {
					var o = n < .5 ? n * (1 + a) : n + a - n * a,
						h = 2 * n - o;
					e = hue2rgb(h, o, s + 1 / 3), r = hue2rgb(h, o, s), i = hue2rgb(h, o, s - 1 / 3)
				}
				return [e, r, i, t[3]]
			}

			function linear(t, e, r, i, s) {
				if (void 0 !== i && void 0 !== s || (i = e, s = r, e = 0, r = 1), r < e) {
					var a = r;
					r = e, e = a
				}
				if (t <= e) return i;
				if (t >= r) return s;
				var n, o = r === e ? 0 : (t - e) / (r - e);
				if (!i.length) return i + (s - i) * o;
				var h = i.length,
					l = createTypedArray("float32", h);
				for (n = 0; n < h; n += 1) l[n] = i[n] + (s[n] - i[n]) * o;
				return l
			}

			function random(t, e) {
				if (void 0 === e && (void 0 === t ? (t = 0, e = 1) : (e = t, t = void 0)), e.length) {
					var r, i = e.length;
					t || (t = createTypedArray("float32", i));
					var s = createTypedArray("float32", i),
						a = BMMath.random();
					for (r = 0; r < i; r += 1) s[r] = t[r] + a * (e[r] - t[r]);
					return s
				}
				return void 0 === t && (t = 0), t + BMMath.random() * (e - t)
			}

			function createPath(t, e, r, i) {
				var s, a = t.length,
					n = shapePool.newElement();
				n.setPathData(!!i, a);
				var o, h, l = [0, 0];
				for (s = 0; s < a; s += 1) o = e && e[s] ? e[s] : l, h = r && r[s] ? r[s] : l, n.setTripleAt(t[s][0], t[s][1], h[0] + t[s][0], h[1] + t[s][1], o[0] + t[s][0], o[1] + t[s][1], s, !0);
				return n
			}

			function initiateExpression(elem, data, property) {
				function noOp(t) {
					return t
				}
				if (!elem.globalData.renderConfig.runExpressions) return noOp;
				var val = data.x,
					needsVelocity = /velocity(?![\w\d])/.test(val),
					_needsRandom = -1 !== val.indexOf("random"),
					elemType = elem.data.ty,
					transform, $bm_transform, content, effect, thisProperty = property;
				thisProperty.valueAtTime = thisProperty.getValueAtTime, Object.defineProperty(thisProperty, "value", {
					get: function () {
						return thisProperty.v
					}
				}), elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate, elem.comp.displayStartTime = 0;
				var inPoint = elem.data.ip / elem.comp.globalData.frameRate,
					outPoint = elem.data.op / elem.comp.globalData.frameRate,
					width = elem.data.sw ? elem.data.sw : 0,
					height = elem.data.sh ? elem.data.sh : 0,
					name = elem.data.nm,
					loopIn, loop_in, loopOut, loop_out, smooth, toWorld, fromWorld, fromComp, toComp, fromCompToSurface, position, rotation, anchorPoint, scale, thisLayer, thisComp, mask, valueAtTime, velocityAtTime, scoped_bm_rt, expression_function = eval("[function _expression_function(){" + val + ";scoped_bm_rt=$bm_rt}]")[0],
					numKeys = property.kf ? data.k.length : 0,
					active = !this.data || !0 !== this.data.hd,
					wiggle = function (t, e) {
						var r, i, s = this.pv.length ? this.pv.length : 1,
							a = createTypedArray("float32", s);
						var n = Math.floor(5 * time);
						for (r = 0, i = 0; r < n;) {
							for (i = 0; i < s; i += 1) a[i] += -e + 2 * e * BMMath.random();
							r += 1
						}
						var o = 5 * time,
							h = o - Math.floor(o),
							l = createTypedArray("float32", s);
						if (s > 1) {
							for (i = 0; i < s; i += 1) l[i] = this.pv[i] + a[i] + (-e + 2 * e * BMMath.random()) * h;
							return l
						}
						return this.pv + a[0] + (-e + 2 * e * BMMath.random()) * h
					}.bind(this);

				function loopInDuration(t, e) {
					return loopIn(t, e, !0)
				}

				function loopOutDuration(t, e) {
					return loopOut(t, e, !0)
				}
				thisProperty.loopIn && (loopIn = thisProperty.loopIn.bind(thisProperty), loop_in = loopIn), thisProperty.loopOut && (loopOut = thisProperty.loopOut.bind(thisProperty), loop_out = loopOut), thisProperty.smooth && (smooth = thisProperty.smooth.bind(thisProperty)), this.getValueAtTime && (valueAtTime = this.getValueAtTime.bind(this)), this.getVelocityAtTime && (velocityAtTime = this.getVelocityAtTime.bind(this));
				var comp = elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface),
					time, velocity, value, text, textIndex, textTotal, selectorValue;

				function lookAt(t, e) {
					var r = [e[0] - t[0], e[1] - t[1], e[2] - t[2]],
						i = Math.atan2(r[0], Math.sqrt(r[1] * r[1] + r[2] * r[2])) / degToRads;
					return [-Math.atan2(r[1], r[2]) / degToRads, i, 0]
				}

				function easeOut(t, e, r, i, s) {
					return applyEase(easeOutBez, t, e, r, i, s)
				}

				function easeIn(t, e, r, i, s) {
					return applyEase(easeInBez, t, e, r, i, s)
				}

				function ease(t, e, r, i, s) {
					return applyEase(easeInOutBez, t, e, r, i, s)
				}

				function applyEase(t, e, r, i, s, a) {
					void 0 === s ? (s = r, a = i) : e = (e - r) / (i - r), e > 1 ? e = 1 : e < 0 && (e = 0);
					var n = t(e);
					if ($bm_isInstanceOfArray(s)) {
						var o, h = s.length,
							l = createTypedArray("float32", h);
						for (o = 0; o < h; o += 1) l[o] = (a[o] - s[o]) * n + s[o];
						return l
					}
					return (a - s) * n + s
				}

				function nearestKey(t) {
					var e, r, i, s = data.k.length;
					if (data.k.length && "number" != typeof data.k[0])
						if (r = -1, (t *= elem.comp.globalData.frameRate) < data.k[0].t) r = 1, i = data.k[0].t;
						else {
							for (e = 0; e < s - 1; e += 1) {
								if (t === data.k[e].t) {
									r = e + 1, i = data.k[e].t;
									break
								}
								if (t > data.k[e].t && t < data.k[e + 1].t) {
									t - data.k[e].t > data.k[e + 1].t - t ? (r = e + 2, i = data.k[e + 1].t) : (r = e + 1, i = data.k[e].t);
									break
								}
							} - 1 === r && (r = e + 1, i = data.k[e].t)
						}
					else r = 0, i = 0;
					var a = {};
					return a.index = r, a.time = i / elem.comp.globalData.frameRate, a
				}

				function key(t) {
					var e, r, i;
					if (!data.k.length || "number" == typeof data.k[0]) throw new Error("The property has no keyframe at index " + t);
					t -= 1, e = {
						time: data.k[t].t / elem.comp.globalData.frameRate,
						value: []
					};
					var s = Object.prototype.hasOwnProperty.call(data.k[t], "s") ? data.k[t].s : data.k[t - 1].e;
					for (i = s.length, r = 0; r < i; r += 1) e[r] = s[r], e.value[r] = s[r];
					return e
				}

				function framesToTime(t, e) {
					return e || (e = elem.comp.globalData.frameRate), t / e
				}

				function timeToFrames(t, e) {
					return t || 0 === t || (t = time), e || (e = elem.comp.globalData.frameRate), t * e
				}

				function seedRandom(t) {
					BMMath.seedrandom(randSeed + t)
				}

				function sourceRectAtTime() {
					return elem.sourceRectAtTime()
				}

				function substring(t, e) {
					return "string" == typeof value ? void 0 === e ? value.substring(t) : value.substring(t, e) : ""
				}

				function substr(t, e) {
					return "string" == typeof value ? void 0 === e ? value.substr(t) : value.substr(t, e) : ""
				}

				function posterizeTime(t) {
					time = 0 === t ? 0 : Math.floor(time * t) / t, value = valueAtTime(time)
				}
				var index = elem.data.ind,
					hasParent = !(!elem.hierarchy || !elem.hierarchy.length),
					parent, randSeed = Math.floor(1e6 * Math.random()),
					globalData = elem.globalData;

				function executeExpression(t) {
					return value = t, this.frameExpressionId === elem.globalData.frameId && "textSelector" !== this.propType ? value : ("textSelector" === this.propType && (textIndex = this.textIndex, textTotal = this.textTotal, selectorValue = this.selectorValue), thisLayer || (text = elem.layerInterface.text, thisLayer = elem.layerInterface, thisComp = elem.comp.compInterface, toWorld = thisLayer.toWorld.bind(thisLayer), fromWorld = thisLayer.fromWorld.bind(thisLayer), fromComp = thisLayer.fromComp.bind(thisLayer), toComp = thisLayer.toComp.bind(thisLayer), mask = thisLayer.mask ? thisLayer.mask.bind(thisLayer) : null, fromCompToSurface = fromComp), transform || (transform = elem.layerInterface("ADBE Transform Group"), $bm_transform = transform, transform && (anchorPoint = transform.anchorPoint)), 4 !== elemType || content || (content = thisLayer("ADBE Root Vectors Group")), effect || (effect = thisLayer(4)), (hasParent = !(!elem.hierarchy || !elem.hierarchy.length)) && !parent && (parent = elem.hierarchy[0].layerInterface), time = this.comp.renderedFrame / this.comp.globalData.frameRate, _needsRandom && seedRandom(randSeed + time), needsVelocity && (velocity = velocityAtTime(time)), expression_function(), this.frameExpressionId = elem.globalData.frameId, scoped_bm_rt = scoped_bm_rt.propType === propTypes.SHAPE ? scoped_bm_rt.v : scoped_bm_rt)
				}
				return executeExpression.__preventDeadCodeRemoval = [$bm_transform, anchorPoint, time, velocity, inPoint, outPoint, width, height, name, loop_in, loop_out, smooth, toComp, fromCompToSurface, toWorld, fromWorld, mask, position, rotation, scale, thisComp, numKeys, active, wiggle, loopInDuration, loopOutDuration, comp, lookAt, easeOut, easeIn, ease, nearestKey, key, text, textIndex, textTotal, selectorValue, framesToTime, timeToFrames, sourceRectAtTime, substring, substr, posterizeTime, index, globalData], executeExpression
			}
			return ob.initiateExpression = initiateExpression, ob.__preventDeadCodeRemoval = [window, document, XMLHttpRequest, fetch, frames, $bm_neg, add, $bm_sum, $bm_sub, $bm_mul, $bm_div, $bm_mod, clamp, radians_to_degrees, degreesToRadians, degrees_to_radians, normalize, rgbToHsl, hslToRgb, linear, random, createPath], ob
		}(),
		expressionHelpers = {
			searchExpressions: function (t, e, r) {
				e.x && (r.k = !0, r.x = !0, r.initiateExpression = ExpressionManager.initiateExpression, r.effectsSequence.push(r.initiateExpression(t, e, r).bind(r)))
			},
			getSpeedAtTime: function (t) {
				var e = this.getValueAtTime(t),
					r = this.getValueAtTime(t + -.01),
					i = 0;
				if (e.length) {
					var s;
					for (s = 0; s < e.length; s += 1) i += Math.pow(r[s] - e[s], 2);
					i = 100 * Math.sqrt(i)
				} else i = 0;
				return i
			},
			getVelocityAtTime: function (t) {
				if (void 0 !== this.vel) return this.vel;
				var e, r, i = -.001,
					s = this.getValueAtTime(t),
					a = this.getValueAtTime(t + i);
				if (s.length)
					for (e = createTypedArray("float32", s.length), r = 0; r < s.length; r += 1) e[r] = (a[r] - s[r]) / i;
				else e = (a - s) / i;
				return e
			},
			getValueAtTime: function (t) {
				return t *= this.elem.globalData.frameRate, (t -= this.offsetTime) !== this._cachingAtTime.lastFrame && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastFrame < t ? this._cachingAtTime.lastIndex : 0, this._cachingAtTime.value = this.interpolateValue(t, this._cachingAtTime), this._cachingAtTime.lastFrame = t), this._cachingAtTime.value
			},
			getStaticValueAtTime: function () {
				return this.pv
			},
			setGroupProperty: function (t) {
				this.propertyGroup = t
			}
		};

	function addPropertyDecorator() {
		function t(t, e, r) {
			if (!this.k || !this.keyframes) return this.pv;
			t = t ? t.toLowerCase() : "";
			var i, s, a, n, o, h = this.comp.renderedFrame,
				l = this.keyframes,
				p = l[l.length - 1].t;
			if (h <= p) return this.pv;
			if (r ? s = p - (i = e ? Math.abs(p - this.elem.comp.globalData.frameRate * e) : Math.max(0, p - this.elem.data.ip)) : ((!e || e > l.length - 1) && (e = l.length - 1), i = p - (s = l[l.length - 1 - e].t)), "pingpong" === t) {
				if (Math.floor((h - s) / i) % 2 != 0) return this.getValueAtTime((i - (h - s) % i + s) / this.comp.globalData.frameRate, 0)
			} else {
				if ("offset" === t) {
					var f = this.getValueAtTime(s / this.comp.globalData.frameRate, 0),
						m = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
						c = this.getValueAtTime(((h - s) % i + s) / this.comp.globalData.frameRate, 0),
						d = Math.floor((h - s) / i);
					if (this.pv.length) {
						for (n = (o = new Array(f.length)).length, a = 0; a < n; a += 1) o[a] = (m[a] - f[a]) * d + c[a];
						return o
					}
					return (m - f) * d + c
				}
				if ("continue" === t) {
					var u = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
						y = this.getValueAtTime((p - .001) / this.comp.globalData.frameRate, 0);
					if (this.pv.length) {
						for (n = (o = new Array(u.length)).length, a = 0; a < n; a += 1) o[a] = u[a] + (u[a] - y[a]) * ((h - p) / this.comp.globalData.frameRate) / 5e-4;
						return o
					}
					return u + (h - p) / .001 * (u - y)
				}
			}
			return this.getValueAtTime(((h - s) % i + s) / this.comp.globalData.frameRate, 0)
		}

		function e(t, e, r) {
			if (!this.k) return this.pv;
			t = t ? t.toLowerCase() : "";
			var i, s, a, n, o, h = this.comp.renderedFrame,
				l = this.keyframes,
				p = l[0].t;
			if (h >= p) return this.pv;
			if (r ? s = p + (i = e ? Math.abs(this.elem.comp.globalData.frameRate * e) : Math.max(0, this.elem.data.op - p)) : ((!e || e > l.length - 1) && (e = l.length - 1), i = (s = l[e].t) - p), "pingpong" === t) {
				if (Math.floor((p - h) / i) % 2 == 0) return this.getValueAtTime(((p - h) % i + p) / this.comp.globalData.frameRate, 0)
			} else {
				if ("offset" === t) {
					var f = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
						m = this.getValueAtTime(s / this.comp.globalData.frameRate, 0),
						c = this.getValueAtTime((i - (p - h) % i + p) / this.comp.globalData.frameRate, 0),
						d = Math.floor((p - h) / i) + 1;
					if (this.pv.length) {
						for (n = (o = new Array(f.length)).length, a = 0; a < n; a += 1) o[a] = c[a] - (m[a] - f[a]) * d;
						return o
					}
					return c - (m - f) * d
				}
				if ("continue" === t) {
					var u = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
						y = this.getValueAtTime((p + .001) / this.comp.globalData.frameRate, 0);
					if (this.pv.length) {
						for (n = (o = new Array(u.length)).length, a = 0; a < n; a += 1) o[a] = u[a] + (u[a] - y[a]) * (p - h) / .001;
						return o
					}
					return u + (u - y) * (p - h) / .001
				}
			}
			return this.getValueAtTime((i - ((p - h) % i + p)) / this.comp.globalData.frameRate, 0)
		}

		function r(t, e) {
			if (!this.k) return this.pv;
			if (t = .5 * (t || .4), (e = Math.floor(e || 5)) <= 1) return this.pv;
			var r, i, s = this.comp.renderedFrame / this.comp.globalData.frameRate,
				a = s - t,
				n = e > 1 ? (s + t - a) / (e - 1) : 1,
				o = 0,
				h = 0;
			for (r = this.pv.length ? createTypedArray("float32", this.pv.length) : 0; o < e;) {
				if (i = this.getValueAtTime(a + o * n), this.pv.length)
					for (h = 0; h < this.pv.length; h += 1) r[h] += i[h];
				else r += i;
				o += 1
			}
			if (this.pv.length)
				for (h = 0; h < this.pv.length; h += 1) r[h] /= e;
			else r /= e;
			return r
		}

		function i(t) {
			this._transformCachingAtTime || (this._transformCachingAtTime = {
				v: new Matrix
			});
			var e = this._transformCachingAtTime.v;
			if (e.cloneFromProps(this.pre.props), this.appliedTransformations < 1) {
				var r = this.a.getValueAtTime(t);
				e.translate(-r[0] * this.a.mult, -r[1] * this.a.mult, r[2] * this.a.mult)
			}
			if (this.appliedTransformations < 2) {
				var i = this.s.getValueAtTime(t);
				e.scale(i[0] * this.s.mult, i[1] * this.s.mult, i[2] * this.s.mult)
			}
			if (this.sk && this.appliedTransformations < 3) {
				var s = this.sk.getValueAtTime(t),
					a = this.sa.getValueAtTime(t);
				e.skewFromAxis(-s * this.sk.mult, a * this.sa.mult)
			}
			if (this.r && this.appliedTransformations < 4) {
				var n = this.r.getValueAtTime(t);
				e.rotate(-n * this.r.mult)
			} else if (!this.r && this.appliedTransformations < 4) {
				var o = this.rz.getValueAtTime(t),
					h = this.ry.getValueAtTime(t),
					l = this.rx.getValueAtTime(t),
					p = this.or.getValueAtTime(t);
				e.rotateZ(-o * this.rz.mult).rotateY(h * this.ry.mult).rotateX(l * this.rx.mult).rotateZ(-p[2] * this.or.mult).rotateY(p[1] * this.or.mult).rotateX(p[0] * this.or.mult)
			}
			if (this.data.p && this.data.p.s) {
				var f = this.px.getValueAtTime(t),
					m = this.py.getValueAtTime(t);
				if (this.data.p.z) {
					var c = this.pz.getValueAtTime(t);
					e.translate(f * this.px.mult, m * this.py.mult, -c * this.pz.mult)
				} else e.translate(f * this.px.mult, m * this.py.mult, 0)
			} else {
				var d = this.p.getValueAtTime(t);
				e.translate(d[0] * this.p.mult, d[1] * this.p.mult, -d[2] * this.p.mult)
			}
			return e
		}

		function s() {
			return this.v.clone(new Matrix)
		}
		var a = TransformPropertyFactory.getTransformProperty;
		TransformPropertyFactory.getTransformProperty = function (t, e, r) {
			var n = a(t, e, r);
			return n.dynamicProperties.length ? n.getValueAtTime = i.bind(n) : n.getValueAtTime = s.bind(n), n.setGroupProperty = expressionHelpers.setGroupProperty, n
		};
		var n = PropertyFactory.getProp;
		PropertyFactory.getProp = function (i, s, a, o, h) {
			var l = n(i, s, a, o, h);
			l.kf ? l.getValueAtTime = expressionHelpers.getValueAtTime.bind(l) : l.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(l), l.setGroupProperty = expressionHelpers.setGroupProperty, l.loopOut = t, l.loopIn = e, l.smooth = r, l.getVelocityAtTime = expressionHelpers.getVelocityAtTime.bind(l), l.getSpeedAtTime = expressionHelpers.getSpeedAtTime.bind(l), l.numKeys = 1 === s.a ? s.k.length : 0, l.propertyIndex = s.ix;
			var p = 0;
			return 0 !== a && (p = createTypedArray("float32", 1 === s.a ? s.k[0].s.length : s.k.length)), l._cachingAtTime = {
				lastFrame: initialDefaultFrame,
				lastIndex: 0,
				value: p
			}, expressionHelpers.searchExpressions(i, s, l), l.k && h.addDynamicProperty(l), l
		};
		var o = ShapePropertyFactory.getConstructorFunction(),
			h = ShapePropertyFactory.getKeyframedConstructorFunction();

		function l() {}
		l.prototype = {
			vertices: function (t, e) {
				this.k && this.getValue();
				var r, i = this.v;
				void 0 !== e && (i = this.getValueAtTime(e, 0));
				var s = i._length,
					a = i[t],
					n = i.v,
					o = createSizedArray(s);
				for (r = 0; r < s; r += 1) o[r] = "i" === t || "o" === t ? [a[r][0] - n[r][0], a[r][1] - n[r][1]] : [a[r][0], a[r][1]];
				return o
			},
			points: function (t) {
				return this.vertices("v", t)
			},
			inTangents: function (t) {
				return this.vertices("i", t)
			},
			outTangents: function (t) {
				return this.vertices("o", t)
			},
			isClosed: function () {
				return this.v.c
			},
			pointOnPath: function (t, e) {
				var r = this.v;
				void 0 !== e && (r = this.getValueAtTime(e, 0)), this._segmentsLength || (this._segmentsLength = bez.getSegmentsLength(r));
				for (var i, s = this._segmentsLength, a = s.lengths, n = s.totalLength * t, o = 0, h = a.length, l = 0; o < h;) {
					if (l + a[o].addedLength > n) {
						var p = o,
							f = r.c && o === h - 1 ? 0 : o + 1,
							m = (n - l) / a[o].addedLength;
						i = bez.getPointInSegment(r.v[p], r.v[f], r.o[p], r.i[f], m, a[o]);
						break
					}
					l += a[o].addedLength, o += 1
				}
				return i || (i = r.c ? [r.v[0][0], r.v[0][1]] : [r.v[r._length - 1][0], r.v[r._length - 1][1]]), i
			},
			vectorOnPath: function (t, e, r) {
				1 == t ? t = this.v.c : 0 == t && (t = .999);
				var i = this.pointOnPath(t, e),
					s = this.pointOnPath(t + .001, e),
					a = s[0] - i[0],
					n = s[1] - i[1],
					o = Math.sqrt(Math.pow(a, 2) + Math.pow(n, 2));
				return 0 === o ? [0, 0] : "tangent" === r ? [a / o, n / o] : [-n / o, a / o]
			},
			tangentOnPath: function (t, e) {
				return this.vectorOnPath(t, e, "tangent")
			},
			normalOnPath: function (t, e) {
				return this.vectorOnPath(t, e, "normal")
			},
			setGroupProperty: expressionHelpers.setGroupProperty,
			getValueAtTime: expressionHelpers.getStaticValueAtTime
		}, extendPrototype([l], o), extendPrototype([l], h), h.prototype.getValueAtTime = function (t) {
			return this._cachingAtTime || (this._cachingAtTime = {
				shapeValue: shapePool.clone(this.pv),
				lastIndex: 0,
				lastTime: initialDefaultFrame
			}), t *= this.elem.globalData.frameRate, (t -= this.offsetTime) !== this._cachingAtTime.lastTime && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastTime < t ? this._caching.lastIndex : 0, this._cachingAtTime.lastTime = t, this.interpolateShape(t, this._cachingAtTime.shapeValue, this._cachingAtTime)), this._cachingAtTime.shapeValue
		}, h.prototype.initiateExpression = ExpressionManager.initiateExpression;
		var p = ShapePropertyFactory.getShapeProp;
		ShapePropertyFactory.getShapeProp = function (t, e, r, i, s) {
			var a = p(t, e, r, i, s);
			return a.propertyIndex = e.ix, a.lock = !1, 3 === r ? expressionHelpers.searchExpressions(t, e.pt, a) : 4 === r && expressionHelpers.searchExpressions(t, e.ks, a), a.k && t.addDynamicProperty(a), a
		}
	}

	function initialize$1() {
		addPropertyDecorator()
	}

	function addDecorator() {
		TextProperty.prototype.getExpressionValue = function (t, e) {
			var r = this.calculateExpression(e);
			if (t.t !== r) {
				var i = {};
				return this.copyData(i, t), i.t = r.toString(), i.__complete = !1, i
			}
			return t
		}, TextProperty.prototype.searchProperty = function () {
			var t = this.searchKeyframes(),
				e = this.searchExpressions();
			return this.kf = t || e, this.kf
		}, TextProperty.prototype.searchExpressions = function () {
			return this.data.d.x ? (this.calculateExpression = ExpressionManager.initiateExpression.bind(this)(this.elem, this.data.d, this), this.addEffect(this.getExpressionValue.bind(this)), !0) : null
		}
	}

	function initialize() {
		addDecorator()
	}

	function SVGComposableEffect() {}
	SVGComposableEffect.prototype = {
		createMergeNode: function (t, e) {
			var r, i, s = createNS("feMerge");
			for (s.setAttribute("result", t), i = 0; i < e.length; i += 1)(r = createNS("feMergeNode")).setAttribute("in", e[i]), s.appendChild(r), s.appendChild(r);
			return s
		}
	};
	var linearFilterValue = "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0";

	function SVGTintFilter(t, e, r, i, s) {
		this.filterManager = e;
		var a = createNS("feColorMatrix");
		a.setAttribute("type", "matrix"), a.setAttribute("color-interpolation-filters", "linearRGB"), a.setAttribute("values", linearFilterValue + " 1 0"), this.linearFilter = a, a.setAttribute("result", i + "_tint_1"), t.appendChild(a), (a = createNS("feColorMatrix")).setAttribute("type", "matrix"), a.setAttribute("color-interpolation-filters", "sRGB"), a.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), a.setAttribute("result", i + "_tint_2"), t.appendChild(a), this.matrixFilter = a;
		var n = this.createMergeNode(i, [s, i + "_tint_1", i + "_tint_2"]);
		t.appendChild(n)
	}

	function SVGFillFilter(t, e, r, i) {
		this.filterManager = e;
		var s = createNS("feColorMatrix");
		s.setAttribute("type", "matrix"), s.setAttribute("color-interpolation-filters", "sRGB"), s.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), s.setAttribute("result", i), t.appendChild(s), this.matrixFilter = s
	}

	function SVGStrokeEffect(t, e, r) {
		this.initialized = !1, this.filterManager = e, this.elem = r, this.paths = []
	}

	function SVGTritoneFilter(t, e, r, i) {
		this.filterManager = e;
		var s = createNS("feColorMatrix");
		s.setAttribute("type", "matrix"), s.setAttribute("color-interpolation-filters", "linearRGB"), s.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), t.appendChild(s);
		var a = createNS("feComponentTransfer");
		a.setAttribute("color-interpolation-filters", "sRGB"), a.setAttribute("result", i), this.matrixFilter = a;
		var n = createNS("feFuncR");
		n.setAttribute("type", "table"), a.appendChild(n), this.feFuncR = n;
		var o = createNS("feFuncG");
		o.setAttribute("type", "table"), a.appendChild(o), this.feFuncG = o;
		var h = createNS("feFuncB");
		h.setAttribute("type", "table"), a.appendChild(h), this.feFuncB = h, t.appendChild(a)
	}

	function SVGProLevelsFilter(t, e, r, i) {
		this.filterManager = e;
		var s = this.filterManager.effectElements,
			a = createNS("feComponentTransfer");
		(s[10].p.k || 0 !== s[10].p.v || s[11].p.k || 1 !== s[11].p.v || s[12].p.k || 1 !== s[12].p.v || s[13].p.k || 0 !== s[13].p.v || s[14].p.k || 1 !== s[14].p.v) && (this.feFuncR = this.createFeFunc("feFuncR", a)), (s[17].p.k || 0 !== s[17].p.v || s[18].p.k || 1 !== s[18].p.v || s[19].p.k || 1 !== s[19].p.v || s[20].p.k || 0 !== s[20].p.v || s[21].p.k || 1 !== s[21].p.v) && (this.feFuncG = this.createFeFunc("feFuncG", a)), (s[24].p.k || 0 !== s[24].p.v || s[25].p.k || 1 !== s[25].p.v || s[26].p.k || 1 !== s[26].p.v || s[27].p.k || 0 !== s[27].p.v || s[28].p.k || 1 !== s[28].p.v) && (this.feFuncB = this.createFeFunc("feFuncB", a)), (s[31].p.k || 0 !== s[31].p.v || s[32].p.k || 1 !== s[32].p.v || s[33].p.k || 1 !== s[33].p.v || s[34].p.k || 0 !== s[34].p.v || s[35].p.k || 1 !== s[35].p.v) && (this.feFuncA = this.createFeFunc("feFuncA", a)), (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) && (a.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(a)), (s[3].p.k || 0 !== s[3].p.v || s[4].p.k || 1 !== s[4].p.v || s[5].p.k || 1 !== s[5].p.v || s[6].p.k || 0 !== s[6].p.v || s[7].p.k || 1 !== s[7].p.v) && ((a = createNS("feComponentTransfer")).setAttribute("color-interpolation-filters", "sRGB"), a.setAttribute("result", i), t.appendChild(a), this.feFuncRComposed = this.createFeFunc("feFuncR", a), this.feFuncGComposed = this.createFeFunc("feFuncG", a), this.feFuncBComposed = this.createFeFunc("feFuncB", a))
	}

	function SVGDropShadowEffect(t, e, r, i, s) {
		var a = e.container.globalData.renderConfig.filterSize,
			n = e.data.fs || a;
		t.setAttribute("x", n.x || a.x), t.setAttribute("y", n.y || a.y), t.setAttribute("width", n.width || a.width), t.setAttribute("height", n.height || a.height), this.filterManager = e;
		var o = createNS("feGaussianBlur");
		o.setAttribute("in", "SourceAlpha"), o.setAttribute("result", i + "_drop_shadow_1"), o.setAttribute("stdDeviation", "0"), this.feGaussianBlur = o, t.appendChild(o);
		var h = createNS("feOffset");
		h.setAttribute("dx", "25"), h.setAttribute("dy", "0"), h.setAttribute("in", i + "_drop_shadow_1"), h.setAttribute("result", i + "_drop_shadow_2"), this.feOffset = h, t.appendChild(h);
		var l = createNS("feFlood");
		l.setAttribute("flood-color", "#00ff00"), l.setAttribute("flood-opacity", "1"), l.setAttribute("result", i + "_drop_shadow_3"), this.feFlood = l, t.appendChild(l);
		var p = createNS("feComposite");
		p.setAttribute("in", i + "_drop_shadow_3"), p.setAttribute("in2", i + "_drop_shadow_2"), p.setAttribute("operator", "in"), p.setAttribute("result", i + "_drop_shadow_4"), t.appendChild(p);
		var f = this.createMergeNode(i, [i + "_drop_shadow_4", s]);
		t.appendChild(f)
	}
	extendPrototype([SVGComposableEffect], SVGTintFilter), SVGTintFilter.prototype.renderFrame = function (t) {
		if (t || this.filterManager._mdf) {
			var e = this.filterManager.effectElements[0].p.v,
				r = this.filterManager.effectElements[1].p.v,
				i = this.filterManager.effectElements[2].p.v / 100;
			this.linearFilter.setAttribute("values", linearFilterValue + " " + i + " 0"), this.matrixFilter.setAttribute("values", r[0] - e[0] + " 0 0 0 " + e[0] + " " + (r[1] - e[1]) + " 0 0 0 " + e[1] + " " + (r[2] - e[2]) + " 0 0 0 " + e[2] + " 0 0 0 1 0")
		}
	}, SVGFillFilter.prototype.renderFrame = function (t) {
		if (t || this.filterManager._mdf) {
			var e = this.filterManager.effectElements[2].p.v,
				r = this.filterManager.effectElements[6].p.v;
			this.matrixFilter.setAttribute("values", "0 0 0 0 " + e[0] + " 0 0 0 0 " + e[1] + " 0 0 0 0 " + e[2] + " 0 0 0 " + r + " 0")
		}
	}, SVGStrokeEffect.prototype.initialize = function () {
		var t, e, r, i, s = this.elem.layerElement.children || this.elem.layerElement.childNodes;
		for (1 === this.filterManager.effectElements[1].p.v ? (i = this.elem.maskManager.masksProperties.length, r = 0) : i = (r = this.filterManager.effectElements[0].p.v - 1) + 1, (e = createNS("g")).setAttribute("fill", "none"), e.setAttribute("stroke-linecap", "round"), e.setAttribute("stroke-dashoffset", 1); r < i; r += 1) t = createNS("path"), e.appendChild(t), this.paths.push({
			p: t,
			m: r
		});
		if (3 === this.filterManager.effectElements[10].p.v) {
			var a = createNS("mask"),
				n = createElementID();
			a.setAttribute("id", n), a.setAttribute("mask-type", "alpha"), a.appendChild(e), this.elem.globalData.defs.appendChild(a);
			var o = createNS("g");
			for (o.setAttribute("mask", "url(" + getLocationHref() + "#" + n + ")"); s[0];) o.appendChild(s[0]);
			this.elem.layerElement.appendChild(o), this.masker = a, e.setAttribute("stroke", "#fff")
		} else if (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) {
			if (2 === this.filterManager.effectElements[10].p.v)
				for (s = this.elem.layerElement.children || this.elem.layerElement.childNodes; s.length;) this.elem.layerElement.removeChild(s[0]);
			this.elem.layerElement.appendChild(e), this.elem.layerElement.removeAttribute("mask"), e.setAttribute("stroke", "#fff")
		}
		this.initialized = !0, this.pathMasker = e
	}, SVGStrokeEffect.prototype.renderFrame = function (t) {
		var e;
		this.initialized || this.initialize();
		var r, i, s = this.paths.length;
		for (e = 0; e < s; e += 1)
			if (-1 !== this.paths[e].m && (r = this.elem.maskManager.viewData[this.paths[e].m], i = this.paths[e].p, (t || this.filterManager._mdf || r.prop._mdf) && i.setAttribute("d", r.lastPath), t || this.filterManager.effectElements[9].p._mdf || this.filterManager.effectElements[4].p._mdf || this.filterManager.effectElements[7].p._mdf || this.filterManager.effectElements[8].p._mdf || r.prop._mdf)) {
				var a;
				if (0 !== this.filterManager.effectElements[7].p.v || 100 !== this.filterManager.effectElements[8].p.v) {
					var n = .01 * Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v),
						o = .01 * Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v),
						h = i.getTotalLength();
					a = "0 0 0 " + h * n + " ";
					var l, p = h * (o - n),
						f = 1 + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v * .01,
						m = Math.floor(p / f);
					for (l = 0; l < m; l += 1) a += "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v * .01 + " ";
					a += "0 " + 10 * h + " 0 0"
				} else a = "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v * .01;
				i.setAttribute("stroke-dasharray", a)
			} if ((t || this.filterManager.effectElements[4].p._mdf) && this.pathMasker.setAttribute("stroke-width", 2 * this.filterManager.effectElements[4].p.v), (t || this.filterManager.effectElements[6].p._mdf) && this.pathMasker.setAttribute("opacity", this.filterManager.effectElements[6].p.v), (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) && (t || this.filterManager.effectElements[3].p._mdf)) {
			var c = this.filterManager.effectElements[3].p.v;
			this.pathMasker.setAttribute("stroke", "rgb(" + bmFloor(255 * c[0]) + "," + bmFloor(255 * c[1]) + "," + bmFloor(255 * c[2]) + ")")
		}
	}, SVGTritoneFilter.prototype.renderFrame = function (t) {
		if (t || this.filterManager._mdf) {
			var e = this.filterManager.effectElements[0].p.v,
				r = this.filterManager.effectElements[1].p.v,
				i = this.filterManager.effectElements[2].p.v,
				s = i[0] + " " + r[0] + " " + e[0],
				a = i[1] + " " + r[1] + " " + e[1],
				n = i[2] + " " + r[2] + " " + e[2];
			this.feFuncR.setAttribute("tableValues", s), this.feFuncG.setAttribute("tableValues", a), this.feFuncB.setAttribute("tableValues", n)
		}
	}, SVGProLevelsFilter.prototype.createFeFunc = function (t, e) {
		var r = createNS(t);
		return r.setAttribute("type", "table"), e.appendChild(r), r
	}, SVGProLevelsFilter.prototype.getTableValue = function (t, e, r, i, s) {
		for (var a, n, o = 0, h = Math.min(t, e), l = Math.max(t, e), p = Array.call(null, {
				length: 256
			}), f = 0, m = s - i, c = e - t; o <= 256;) n = (a = o / 256) <= h ? c < 0 ? s : i : a >= l ? c < 0 ? i : s : i + m * Math.pow((a - t) / c, 1 / r), p[f] = n, f += 1, o += 256 / 255;
		return p.join(" ")
	}, SVGProLevelsFilter.prototype.renderFrame = function (t) {
		if (t || this.filterManager._mdf) {
			var e, r = this.filterManager.effectElements;
			this.feFuncRComposed && (t || r[3].p._mdf || r[4].p._mdf || r[5].p._mdf || r[6].p._mdf || r[7].p._mdf) && (e = this.getTableValue(r[3].p.v, r[4].p.v, r[5].p.v, r[6].p.v, r[7].p.v), this.feFuncRComposed.setAttribute("tableValues", e), this.feFuncGComposed.setAttribute("tableValues", e), this.feFuncBComposed.setAttribute("tableValues", e)), this.feFuncR && (t || r[10].p._mdf || r[11].p._mdf || r[12].p._mdf || r[13].p._mdf || r[14].p._mdf) && (e = this.getTableValue(r[10].p.v, r[11].p.v, r[12].p.v, r[13].p.v, r[14].p.v), this.feFuncR.setAttribute("tableValues", e)), this.feFuncG && (t || r[17].p._mdf || r[18].p._mdf || r[19].p._mdf || r[20].p._mdf || r[21].p._mdf) && (e = this.getTableValue(r[17].p.v, r[18].p.v, r[19].p.v, r[20].p.v, r[21].p.v), this.feFuncG.setAttribute("tableValues", e)), this.feFuncB && (t || r[24].p._mdf || r[25].p._mdf || r[26].p._mdf || r[27].p._mdf || r[28].p._mdf) && (e = this.getTableValue(r[24].p.v, r[25].p.v, r[26].p.v, r[27].p.v, r[28].p.v), this.feFuncB.setAttribute("tableValues", e)), this.feFuncA && (t || r[31].p._mdf || r[32].p._mdf || r[33].p._mdf || r[34].p._mdf || r[35].p._mdf) && (e = this.getTableValue(r[31].p.v, r[32].p.v, r[33].p.v, r[34].p.v, r[35].p.v), this.feFuncA.setAttribute("tableValues", e))
		}
	}, extendPrototype([SVGComposableEffect], SVGDropShadowEffect), SVGDropShadowEffect.prototype.renderFrame = function (t) {
		if (t || this.filterManager._mdf) {
			if ((t || this.filterManager.effectElements[4].p._mdf) && this.feGaussianBlur.setAttribute("stdDeviation", this.filterManager.effectElements[4].p.v / 4), t || this.filterManager.effectElements[0].p._mdf) {
				var e = this.filterManager.effectElements[0].p.v;
				this.feFlood.setAttribute("flood-color", rgbToHex(Math.round(255 * e[0]), Math.round(255 * e[1]), Math.round(255 * e[2])))
			}
			if ((t || this.filterManager.effectElements[1].p._mdf) && this.feFlood.setAttribute("flood-opacity", this.filterManager.effectElements[1].p.v / 255), t || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf) {
				var r = this.filterManager.effectElements[3].p.v,
					i = (this.filterManager.effectElements[2].p.v - 90) * degToRads,
					s = r * Math.cos(i),
					a = r * Math.sin(i);
				this.feOffset.setAttribute("dx", s), this.feOffset.setAttribute("dy", a)
			}
		}
	};
	var _svgMatteSymbols = [];

	function SVGMatte3Effect(t, e, r) {
		this.initialized = !1, this.filterManager = e, this.filterElem = t, this.elem = r, r.matteElement = createNS("g"), r.matteElement.appendChild(r.layerElement), r.matteElement.appendChild(r.transformedElement), r.baseElement = r.matteElement
	}

	function SVGGaussianBlurEffect(t, e, r, i) {
		t.setAttribute("x", "-100%"), t.setAttribute("y", "-100%"), t.setAttribute("width", "300%"), t.setAttribute("height", "300%"), this.filterManager = e;
		var s = createNS("feGaussianBlur");
		s.setAttribute("result", i), t.appendChild(s), this.feGaussianBlur = s
	}
	return SVGMatte3Effect.prototype.findSymbol = function (t) {
		for (var e = 0, r = _svgMatteSymbols.length; e < r;) {
			if (_svgMatteSymbols[e] === t) return _svgMatteSymbols[e];
			e += 1
		}
		return null
	}, SVGMatte3Effect.prototype.replaceInParent = function (t, e) {
		var r = t.layerElement.parentNode;
		if (r) {
			for (var i, s = r.children, a = 0, n = s.length; a < n && s[a] !== t.layerElement;) a += 1;
			a <= n - 2 && (i = s[a + 1]);
			var o = createNS("use");
			o.setAttribute("href", "#" + e), i ? r.insertBefore(o, i) : r.appendChild(o)
		}
	}, SVGMatte3Effect.prototype.setElementAsMask = function (t, e) {
		if (!this.findSymbol(e)) {
			var r = createElementID(),
				i = createNS("mask");
			i.setAttribute("id", e.layerId), i.setAttribute("mask-type", "alpha"), _svgMatteSymbols.push(e);
			var s = t.globalData.defs;
			s.appendChild(i);
			var a = createNS("symbol");
			a.setAttribute("id", r), this.replaceInParent(e, r), a.appendChild(e.layerElement), s.appendChild(a);
			var n = createNS("use");
			n.setAttribute("href", "#" + r), i.appendChild(n), e.data.hd = !1, e.show()
		}
		t.setMatte(e.layerId)
	}, SVGMatte3Effect.prototype.initialize = function () {
		for (var t = this.filterManager.effectElements[0].p.v, e = this.elem.comp.elements, r = 0, i = e.length; r < i;) e[r] && e[r].data.ind === t && this.setElementAsMask(this.elem, e[r]), r += 1;
		this.initialized = !0
	}, SVGMatte3Effect.prototype.renderFrame = function () {
		this.initialized || this.initialize()
	}, SVGGaussianBlurEffect.prototype.renderFrame = function (t) {
		if (t || this.filterManager._mdf) {
			var e = .3 * this.filterManager.effectElements[0].p.v,
				r = this.filterManager.effectElements[1].p.v,
				i = 3 == r ? 0 : e,
				s = 2 == r ? 0 : e;
			this.feGaussianBlur.setAttribute("stdDeviation", i + " " + s);
			var a = 1 == this.filterManager.effectElements[2].p.v ? "wrap" : "duplicate";
			this.feGaussianBlur.setAttribute("edgeMode", a)
		}
	}, registerRenderer("canvas", CanvasRenderer), registerRenderer("html", HybridRenderer), registerRenderer("svg", SVGRenderer), ShapeModifiers.registerModifier("tm", TrimModifier), ShapeModifiers.registerModifier("pb", PuckerAndBloatModifier), ShapeModifiers.registerModifier("rp", RepeaterModifier), ShapeModifiers.registerModifier("rd", RoundCornersModifier), ShapeModifiers.registerModifier("zz", ZigZagModifier), ShapeModifiers.registerModifier("op", OffsetPathModifier), setExpressionsPlugin(Expressions), setExpressionInterfaces(getInterface), initialize$1(), initialize(), registerEffect(20, SVGTintFilter, !0), registerEffect(21, SVGFillFilter, !0), registerEffect(22, SVGStrokeEffect, !1), registerEffect(23, SVGTritoneFilter, !0), registerEffect(24, SVGProLevelsFilter, !0), registerEffect(25, SVGDropShadowEffect, !0), registerEffect(28, SVGMatte3Effect, !1), registerEffect(29, SVGGaussianBlurEffect, !0), lottie
}));

/**
 * Swiper 9.1.0
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2023 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: February 28, 2023
 */

! function (e, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Swiper = t()
}(this, (function () {
	"use strict";

	function e(e) {
		return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object
	}

	function t(s, a) {
		void 0 === s && (s = {}), void 0 === a && (a = {}), Object.keys(a).forEach((i => {
			void 0 === s[i] ? s[i] = a[i] : e(a[i]) && e(s[i]) && Object.keys(a[i]).length > 0 && t(s[i], a[i])
		}))
	}
	const s = {
		body: {},
		addEventListener() {},
		removeEventListener() {},
		activeElement: {
			blur() {},
			nodeName: ""
		},
		querySelector: () => null,
		querySelectorAll: () => [],
		getElementById: () => null,
		createEvent: () => ({
			initEvent() {}
		}),
		createElement: () => ({
			children: [],
			childNodes: [],
			style: {},
			setAttribute() {},
			getElementsByTagName: () => []
		}),
		createElementNS: () => ({}),
		importNode: () => null,
		location: {
			hash: "",
			host: "",
			hostname: "",
			href: "",
			origin: "",
			pathname: "",
			protocol: "",
			search: ""
		}
	};

	function a() {
		const e = "undefined" != typeof document ? document : {};
		return t(e, s), e
	}
	const i = {
		document: s,
		navigator: {
			userAgent: ""
		},
		location: {
			hash: "",
			host: "",
			hostname: "",
			href: "",
			origin: "",
			pathname: "",
			protocol: "",
			search: ""
		},
		history: {
			replaceState() {},
			pushState() {},
			go() {},
			back() {}
		},
		CustomEvent: function () {
			return this
		},
		addEventListener() {},
		removeEventListener() {},
		getComputedStyle: () => ({
			getPropertyValue: () => ""
		}),
		Image() {},
		Date() {},
		screen: {},
		setTimeout() {},
		clearTimeout() {},
		matchMedia: () => ({}),
		requestAnimationFrame: e => "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
		cancelAnimationFrame(e) {
			"undefined" != typeof setTimeout && clearTimeout(e)
		}
	};

	function r() {
		const e = "undefined" != typeof window ? window : {};
		return t(e, i), e
	}

	function n(e, t) {
		return void 0 === t && (t = 0), setTimeout(e, t)
	}

	function l() {
		return Date.now()
	}

	function o(e, t) {
		void 0 === t && (t = "x");
		const s = r();
		let a, i, n;
		const l = function (e) {
			const t = r();
			let s;
			return t.getComputedStyle && (s = t.getComputedStyle(e, null)), !s && e.currentStyle && (s = e.currentStyle), s || (s = e.style), s
		}(e);
		return s.WebKitCSSMatrix ? (i = l.transform || l.webkitTransform, i.split(",").length > 6 && (i = i.split(", ").map((e => e.replace(",", "."))).join(", ")), n = new s.WebKitCSSMatrix("none" === i ? "" : i)) : (n = l.MozTransform || l.OTransform || l.MsTransform || l.msTransform || l.transform || l.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), a = n.toString().split(",")), "x" === t && (i = s.WebKitCSSMatrix ? n.m41 : 16 === a.length ? parseFloat(a[12]) : parseFloat(a[4])), "y" === t && (i = s.WebKitCSSMatrix ? n.m42 : 16 === a.length ? parseFloat(a[13]) : parseFloat(a[5])), i || 0
	}

	function d(e) {
		return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1)
	}

	function c(e) {
		return "undefined" != typeof window && void 0 !== window.HTMLElement ? e instanceof HTMLElement : e && (1 === e.nodeType || 11 === e.nodeType)
	}

	function p() {
		const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
			t = ["__proto__", "constructor", "prototype"];
		for (let s = 1; s < arguments.length; s += 1) {
			const a = s < 0 || arguments.length <= s ? void 0 : arguments[s];
			if (null != a && !c(a)) {
				const s = Object.keys(Object(a)).filter((e => t.indexOf(e) < 0));
				for (let t = 0, i = s.length; t < i; t += 1) {
					const i = s[t],
						r = Object.getOwnPropertyDescriptor(a, i);
					void 0 !== r && r.enumerable && (d(e[i]) && d(a[i]) ? a[i].__swiper__ ? e[i] = a[i] : p(e[i], a[i]) : !d(e[i]) && d(a[i]) ? (e[i] = {}, a[i].__swiper__ ? e[i] = a[i] : p(e[i], a[i])) : e[i] = a[i])
				}
			}
		}
		return e
	}

	function u(e, t, s) {
		e.style.setProperty(t, s)
	}

	function m(e) {
		let {
			swiper: t,
			targetPosition: s,
			side: a
		} = e;
		const i = r(),
			n = -t.translate;
		let l, o = null;
		const d = t.params.speed;
		t.wrapperEl.style.scrollSnapType = "none", i.cancelAnimationFrame(t.cssModeFrameID);
		const c = s > n ? "next" : "prev",
			p = (e, t) => "next" === c && e >= t || "prev" === c && e <= t,
			u = () => {
				l = (new Date).getTime(), null === o && (o = l);
				const e = Math.max(Math.min((l - o) / d, 1), 0),
					r = .5 - Math.cos(e * Math.PI) / 2;
				let c = n + r * (s - n);
				if (p(c, s) && (c = s), t.wrapperEl.scrollTo({
						[a]: c
					}), p(c, s)) return t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.scrollSnapType = "", setTimeout((() => {
					t.wrapperEl.style.overflow = "", t.wrapperEl.scrollTo({
						[a]: c
					})
				})), void i.cancelAnimationFrame(t.cssModeFrameID);
				t.cssModeFrameID = i.requestAnimationFrame(u)
			};
		u()
	}

	function h(e) {
		return e.querySelector(".swiper-slide-transform") || e.shadowEl && e.shadowEl.querySelector(".swiper-slide-transform") || e
	}

	function f(e, t) {
		return void 0 === t && (t = ""), [...e.children].filter((e => e.matches(t)))
	}

	function g(e, t) {
		void 0 === t && (t = []);
		const s = document.createElement(e);
		return s.classList.add(...Array.isArray(t) ? t : [t]), s
	}

	function v(e) {
		const t = r(),
			s = a(),
			i = e.getBoundingClientRect(),
			n = s.body,
			l = e.clientTop || n.clientTop || 0,
			o = e.clientLeft || n.clientLeft || 0,
			d = e === t ? t.scrollY : e.scrollTop,
			c = e === t ? t.scrollX : e.scrollLeft;
		return {
			top: i.top + d - l,
			left: i.left + c - o
		}
	}

	function w(e, t) {
		return r().getComputedStyle(e, null).getPropertyValue(t)
	}

	function b(e) {
		let t, s = e;
		if (s) {
			for (t = 0; null !== (s = s.previousSibling);) 1 === s.nodeType && (t += 1);
			return t
		}
	}

	function y(e, t) {
		const s = [];
		let a = e.parentElement;
		for (; a;) t ? a.matches(t) && s.push(a) : s.push(a), a = a.parentElement;
		return s
	}

	function E(e, t) {
		t && e.addEventListener("transitionend", (function s(a) {
			a.target === e && (t.call(e, a), e.removeEventListener("transitionend", s))
		}))
	}

	function x(e, t, s) {
		const a = r();
		return s ? e["width" === t ? "offsetWidth" : "offsetHeight"] + parseFloat(a.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-right" : "margin-top")) + parseFloat(a.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-left" : "margin-bottom")) : e.offsetWidth
	}
	let S, T, M;

	function C() {
		return S || (S = function () {
			const e = r(),
				t = a();
			return {
				smoothScroll: t.documentElement && "scrollBehavior" in t.documentElement.style,
				touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch)
			}
		}()), S
	}

	function P(e) {
		return void 0 === e && (e = {}), T || (T = function (e) {
			let {
				userAgent: t
			} = void 0 === e ? {} : e;
			const s = C(),
				a = r(),
				i = a.navigator.platform,
				n = t || a.navigator.userAgent,
				l = {
					ios: !1,
					android: !1
				},
				o = a.screen.width,
				d = a.screen.height,
				c = n.match(/(Android);?[\s\/]+([\d.]+)?/);
			let p = n.match(/(iPad).*OS\s([\d_]+)/);
			const u = n.match(/(iPod)(.*OS\s([\d_]+))?/),
				m = !p && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
				h = "Win32" === i;
			let f = "MacIntel" === i;
			return !p && f && s.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${o}x${d}`) >= 0 && (p = n.match(/(Version)\/([\d.]+)/), p || (p = [0, 1, "13_0_0"]), f = !1), c && !h && (l.os = "android", l.android = !0), (p || m || u) && (l.os = "ios", l.ios = !0), l
		}(e)), T
	}

	function L() {
		return M || (M = function () {
			const e = r();
			let t = !1;

			function s() {
				const t = e.navigator.userAgent.toLowerCase();
				return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0
			}
			if (s()) {
				const s = String(e.navigator.userAgent);
				if (s.includes("Version/")) {
					const [e, a] = s.split("Version/")[1].split(" ")[0].split(".").map((e => Number(e)));
					t = e < 16 || 16 === e && a < 2
				}
			}
			return {
				isSafari: t || s(),
				needPerspectiveFix: t,
				isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
			}
		}()), M
	}
	var A = {
		on(e, t, s) {
			const a = this;
			if (!a.eventsListeners || a.destroyed) return a;
			if ("function" != typeof t) return a;
			const i = s ? "unshift" : "push";
			return e.split(" ").forEach((e => {
				a.eventsListeners[e] || (a.eventsListeners[e] = []), a.eventsListeners[e][i](t)
			})), a
		},
		once(e, t, s) {
			const a = this;
			if (!a.eventsListeners || a.destroyed) return a;
			if ("function" != typeof t) return a;

			function i() {
				a.off(e, i), i.__emitterProxy && delete i.__emitterProxy;
				for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++) r[n] = arguments[n];
				t.apply(a, r)
			}
			return i.__emitterProxy = t, a.on(e, i, s)
		},
		onAny(e, t) {
			const s = this;
			if (!s.eventsListeners || s.destroyed) return s;
			if ("function" != typeof e) return s;
			const a = t ? "unshift" : "push";
			return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[a](e), s
		},
		offAny(e) {
			const t = this;
			if (!t.eventsListeners || t.destroyed) return t;
			if (!t.eventsAnyListeners) return t;
			const s = t.eventsAnyListeners.indexOf(e);
			return s >= 0 && t.eventsAnyListeners.splice(s, 1), t
		},
		off(e, t) {
			const s = this;
			return !s.eventsListeners || s.destroyed ? s : s.eventsListeners ? (e.split(" ").forEach((e => {
				void 0 === t ? s.eventsListeners[e] = [] : s.eventsListeners[e] && s.eventsListeners[e].forEach(((a, i) => {
					(a === t || a.__emitterProxy && a.__emitterProxy === t) && s.eventsListeners[e].splice(i, 1)
				}))
			})), s) : s
		},
		emit() {
			const e = this;
			if (!e.eventsListeners || e.destroyed) return e;
			if (!e.eventsListeners) return e;
			let t, s, a;
			for (var i = arguments.length, r = new Array(i), n = 0; n < i; n++) r[n] = arguments[n];
			"string" == typeof r[0] || Array.isArray(r[0]) ? (t = r[0], s = r.slice(1, r.length), a = e) : (t = r[0].events, s = r[0].data, a = r[0].context || e), s.unshift(a);
			return (Array.isArray(t) ? t : t.split(" ")).forEach((t => {
				e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach((e => {
					e.apply(a, [t, ...s])
				})), e.eventsListeners && e.eventsListeners[t] && e.eventsListeners[t].forEach((e => {
					e.apply(a, s)
				}))
			})), e
		}
	};
	var $ = {
		updateSize: function () {
			const e = this;
			let t, s;
			const a = e.el;
			t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : a.clientWidth, s = void 0 !== e.params.height && null !== e.params.height ? e.params.height : a.clientHeight, 0 === t && e.isHorizontal() || 0 === s && e.isVertical() || (t = t - parseInt(w(a, "padding-left") || 0, 10) - parseInt(w(a, "padding-right") || 0, 10), s = s - parseInt(w(a, "padding-top") || 0, 10) - parseInt(w(a, "padding-bottom") || 0, 10), Number.isNaN(t) && (t = 0), Number.isNaN(s) && (s = 0), Object.assign(e, {
				width: t,
				height: s,
				size: e.isHorizontal() ? t : s
			}))
		},
		updateSlides: function () {
			const e = this;

			function t(t) {
				return e.isHorizontal() ? t : {
					width: "height",
					"margin-top": "margin-left",
					"margin-bottom ": "margin-right",
					"margin-left": "margin-top",
					"margin-right": "margin-bottom",
					"padding-left": "padding-top",
					"padding-right": "padding-bottom",
					marginRight: "marginBottom"
				} [t]
			}

			function s(e, s) {
				return parseFloat(e.getPropertyValue(t(s)) || 0)
			}
			const a = e.params,
				{
					wrapperEl: i,
					slidesEl: r,
					size: n,
					rtlTranslate: l,
					wrongRTL: o
				} = e,
				d = e.virtual && a.virtual.enabled,
				c = d ? e.virtual.slides.length : e.slides.length,
				p = f(r, `.${e.params.slideClass}, swiper-slide`),
				m = d ? e.virtual.slides.length : p.length;
			let h = [];
			const g = [],
				v = [];
			let b = a.slidesOffsetBefore;
			"function" == typeof b && (b = a.slidesOffsetBefore.call(e));
			let y = a.slidesOffsetAfter;
			"function" == typeof y && (y = a.slidesOffsetAfter.call(e));
			const E = e.snapGrid.length,
				S = e.slidesGrid.length;
			let T = a.spaceBetween,
				M = -b,
				C = 0,
				P = 0;
			if (void 0 === n) return;
			"string" == typeof T && T.indexOf("%") >= 0 && (T = parseFloat(T.replace("%", "")) / 100 * n), e.virtualSize = -T, p.forEach((e => {
				l ? e.style.marginLeft = "" : e.style.marginRight = "", e.style.marginBottom = "", e.style.marginTop = ""
			})), a.centeredSlides && a.cssMode && (u(i, "--swiper-centered-offset-before", ""), u(i, "--swiper-centered-offset-after", ""));
			const L = a.grid && a.grid.rows > 1 && e.grid;
			let A;
			L && e.grid.initSlides(m);
			const $ = "auto" === a.slidesPerView && a.breakpoints && Object.keys(a.breakpoints).filter((e => void 0 !== a.breakpoints[e].slidesPerView)).length > 0;
			for (let i = 0; i < m; i += 1) {
				let r;
				if (A = 0, p[i] && (r = p[i]), L && e.grid.updateSlide(i, r, m, t), !p[i] || "none" !== w(r, "display")) {
					if ("auto" === a.slidesPerView) {
						$ && (p[i].style[t("width")] = "");
						const n = getComputedStyle(r),
							l = r.style.transform,
							o = r.style.webkitTransform;
						if (l && (r.style.transform = "none"), o && (r.style.webkitTransform = "none"), a.roundLengths) A = e.isHorizontal() ? x(r, "width", !0) : x(r, "height", !0);
						else {
							const e = s(n, "width"),
								t = s(n, "padding-left"),
								a = s(n, "padding-right"),
								i = s(n, "margin-left"),
								l = s(n, "margin-right"),
								o = n.getPropertyValue("box-sizing");
							if (o && "border-box" === o) A = e + i + l;
							else {
								const {
									clientWidth: s,
									offsetWidth: n
								} = r;
								A = e + t + a + i + l + (n - s)
							}
						}
						l && (r.style.transform = l), o && (r.style.webkitTransform = o), a.roundLengths && (A = Math.floor(A))
					} else A = (n - (a.slidesPerView - 1) * T) / a.slidesPerView, a.roundLengths && (A = Math.floor(A)), p[i] && (p[i].style[t("width")] = `${A}px`);
					p[i] && (p[i].swiperSlideSize = A), v.push(A), a.centeredSlides ? (M = M + A / 2 + C / 2 + T, 0 === C && 0 !== i && (M = M - n / 2 - T), 0 === i && (M = M - n / 2 - T), Math.abs(M) < .001 && (M = 0), a.roundLengths && (M = Math.floor(M)), P % a.slidesPerGroup == 0 && h.push(M), g.push(M)) : (a.roundLengths && (M = Math.floor(M)), (P - Math.min(e.params.slidesPerGroupSkip, P)) % e.params.slidesPerGroup == 0 && h.push(M), g.push(M), M = M + A + T), e.virtualSize += A + T, C = A, P += 1
				}
			}
			if (e.virtualSize = Math.max(e.virtualSize, n) + y, l && o && ("slide" === a.effect || "coverflow" === a.effect) && (i.style.width = `${e.virtualSize+a.spaceBetween}px`), a.setWrapperSize && (i.style[t("width")] = `${e.virtualSize+a.spaceBetween}px`), L && e.grid.updateWrapperSize(A, h, t), !a.centeredSlides) {
				const t = [];
				for (let s = 0; s < h.length; s += 1) {
					let i = h[s];
					a.roundLengths && (i = Math.floor(i)), h[s] <= e.virtualSize - n && t.push(i)
				}
				h = t, Math.floor(e.virtualSize - n) - Math.floor(h[h.length - 1]) > 1 && h.push(e.virtualSize - n)
			}
			if (d && a.loop) {
				const t = v[0] + T;
				if (a.slidesPerGroup > 1) {
					const s = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / a.slidesPerGroup),
						i = t * a.slidesPerGroup;
					for (let e = 0; e < s; e += 1) h.push(h[h.length - 1] + i)
				}
				for (let s = 0; s < e.virtual.slidesBefore + e.virtual.slidesAfter; s += 1) 1 === a.slidesPerGroup && h.push(h[h.length - 1] + t), g.push(g[g.length - 1] + t), e.virtualSize += t
			}
			if (0 === h.length && (h = [0]), 0 !== a.spaceBetween) {
				const s = e.isHorizontal() && l ? "marginLeft" : t("marginRight");
				p.filter(((e, t) => !(a.cssMode && !a.loop) || t !== p.length - 1)).forEach((e => {
					e.style[s] = `${T}px`
				}))
			}
			if (a.centeredSlides && a.centeredSlidesBounds) {
				let e = 0;
				v.forEach((t => {
					e += t + (a.spaceBetween ? a.spaceBetween : 0)
				})), e -= a.spaceBetween;
				const t = e - n;
				h = h.map((e => e < 0 ? -b : e > t ? t + y : e))
			}
			if (a.centerInsufficientSlides) {
				let e = 0;
				if (v.forEach((t => {
						e += t + (a.spaceBetween ? a.spaceBetween : 0)
					})), e -= a.spaceBetween, e < n) {
					const t = (n - e) / 2;
					h.forEach(((e, s) => {
						h[s] = e - t
					})), g.forEach(((e, s) => {
						g[s] = e + t
					}))
				}
			}
			if (Object.assign(e, {
					slides: p,
					snapGrid: h,
					slidesGrid: g,
					slidesSizesGrid: v
				}), a.centeredSlides && a.cssMode && !a.centeredSlidesBounds) {
				u(i, "--swiper-centered-offset-before", -h[0] + "px"), u(i, "--swiper-centered-offset-after", e.size / 2 - v[v.length - 1] / 2 + "px");
				const t = -e.snapGrid[0],
					s = -e.slidesGrid[0];
				e.snapGrid = e.snapGrid.map((e => e + t)), e.slidesGrid = e.slidesGrid.map((e => e + s))
			}
			if (m !== c && e.emit("slidesLengthChange"), h.length !== E && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), g.length !== S && e.emit("slidesGridLengthChange"), a.watchSlidesProgress && e.updateSlidesOffset(), !(d || a.cssMode || "slide" !== a.effect && "fade" !== a.effect)) {
				const t = `${a.containerModifierClass}backface-hidden`,
					s = e.el.classList.contains(t);
				m <= a.maxBackfaceHiddenSlides ? s || e.el.classList.add(t) : s && e.el.classList.remove(t)
			}
		},
		updateAutoHeight: function (e) {
			const t = this,
				s = [],
				a = t.virtual && t.params.virtual.enabled;
			let i, r = 0;
			"number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
			const n = e => a ? t.slides.filter((t => parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e))[0] : t.slides[e];
			if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
				if (t.params.centeredSlides)(t.visibleSlides || []).forEach((e => {
					s.push(e)
				}));
				else
					for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
						const e = t.activeIndex + i;
						if (e > t.slides.length && !a) break;
						s.push(n(e))
					} else s.push(n(t.activeIndex));
			for (i = 0; i < s.length; i += 1)
				if (void 0 !== s[i]) {
					const e = s[i].offsetHeight;
					r = e > r ? e : r
				}(r || 0 === r) && (t.wrapperEl.style.height = `${r}px`)
		},
		updateSlidesOffset: function () {
			const e = this,
				t = e.slides,
				s = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
			for (let a = 0; a < t.length; a += 1) t[a].swiperSlideOffset = (e.isHorizontal() ? t[a].offsetLeft : t[a].offsetTop) - s
		},
		updateSlidesProgress: function (e) {
			void 0 === e && (e = this && this.translate || 0);
			const t = this,
				s = t.params,
				{
					slides: a,
					rtlTranslate: i,
					snapGrid: r
				} = t;
			if (0 === a.length) return;
			void 0 === a[0].swiperSlideOffset && t.updateSlidesOffset();
			let n = -e;
			i && (n = e), a.forEach((e => {
				e.classList.remove(s.slideVisibleClass)
			})), t.visibleSlidesIndexes = [], t.visibleSlides = [];
			for (let e = 0; e < a.length; e += 1) {
				const l = a[e];
				let o = l.swiperSlideOffset;
				s.cssMode && s.centeredSlides && (o -= a[0].swiperSlideOffset);
				const d = (n + (s.centeredSlides ? t.minTranslate() : 0) - o) / (l.swiperSlideSize + s.spaceBetween),
					c = (n - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - o) / (l.swiperSlideSize + s.spaceBetween),
					p = -(n - o),
					u = p + t.slidesSizesGrid[e];
				(p >= 0 && p < t.size - 1 || u > 1 && u <= t.size || p <= 0 && u >= t.size) && (t.visibleSlides.push(l), t.visibleSlidesIndexes.push(e), a[e].classList.add(s.slideVisibleClass)), l.progress = i ? -d : d, l.originalProgress = i ? -c : c
			}
		},
		updateProgress: function (e) {
			const t = this;
			if (void 0 === e) {
				const s = t.rtlTranslate ? -1 : 1;
				e = t && t.translate && t.translate * s || 0
			}
			const s = t.params,
				a = t.maxTranslate() - t.minTranslate();
			let {
				progress: i,
				isBeginning: r,
				isEnd: n,
				progressLoop: l
			} = t;
			const o = r,
				d = n;
			if (0 === a) i = 0, r = !0, n = !0;
			else {
				i = (e - t.minTranslate()) / a;
				const s = Math.abs(e - t.minTranslate()) < 1,
					l = Math.abs(e - t.maxTranslate()) < 1;
				r = s || i <= 0, n = l || i >= 1, s && (i = 0), l && (i = 1)
			}
			if (s.loop) {
				const s = t.getSlideIndex(t.slides.filter((e => "0" === e.getAttribute("data-swiper-slide-index")))[0]),
					a = t.getSlideIndex(t.slides.filter((e => 1 * e.getAttribute("data-swiper-slide-index") == t.slides.length - 1))[0]),
					i = t.slidesGrid[s],
					r = t.slidesGrid[a],
					n = t.slidesGrid[t.slidesGrid.length - 1],
					o = Math.abs(e);
				l = o >= i ? (o - i) / n : (o + n - r) / n, l > 1 && (l -= 1)
			}
			Object.assign(t, {
				progress: i,
				progressLoop: l,
				isBeginning: r,
				isEnd: n
			}), (s.watchSlidesProgress || s.centeredSlides && s.autoHeight) && t.updateSlidesProgress(e), r && !o && t.emit("reachBeginning toEdge"), n && !d && t.emit("reachEnd toEdge"), (o && !r || d && !n) && t.emit("fromEdge"), t.emit("progress", i)
		},
		updateSlidesClasses: function () {
			const e = this,
				{
					slides: t,
					params: s,
					slidesEl: a,
					activeIndex: i
				} = e,
				r = e.virtual && s.virtual.enabled,
				n = e => f(a, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
			let l;
			if (t.forEach((e => {
					e.classList.remove(s.slideActiveClass, s.slideNextClass, s.slidePrevClass)
				})), r)
				if (s.loop) {
					let t = i - e.virtual.slidesBefore;
					t < 0 && (t = e.virtual.slides.length + t), t >= e.virtual.slides.length && (t -= e.virtual.slides.length), l = n(`[data-swiper-slide-index="${t}"]`)
				} else l = n(`[data-swiper-slide-index="${i}"]`);
			else l = t[i];
			if (l) {
				l.classList.add(s.slideActiveClass);
				let e = function (e, t) {
					const s = [];
					for (; e.nextElementSibling;) {
						const a = e.nextElementSibling;
						t ? a.matches(t) && s.push(a) : s.push(a), e = a
					}
					return s
				}(l, `.${s.slideClass}, swiper-slide`)[0];
				s.loop && !e && (e = t[0]), e && e.classList.add(s.slideNextClass);
				let a = function (e, t) {
					const s = [];
					for (; e.previousElementSibling;) {
						const a = e.previousElementSibling;
						t ? a.matches(t) && s.push(a) : s.push(a), e = a
					}
					return s
				}(l, `.${s.slideClass}, swiper-slide`)[0];
				s.loop && 0 === !a && (a = t[t.length - 1]), a && a.classList.add(s.slidePrevClass)
			}
			e.emitSlidesClasses()
		},
		updateActiveIndex: function (e) {
			const t = this,
				s = t.rtlTranslate ? t.translate : -t.translate,
				{
					snapGrid: a,
					params: i,
					activeIndex: r,
					realIndex: n,
					snapIndex: l
				} = t;
			let o, d = e;
			const c = e => {
				let s = e - t.virtual.slidesBefore;
				return s < 0 && (s = t.virtual.slides.length + s), s >= t.virtual.slides.length && (s -= t.virtual.slides.length), s
			};
			if (void 0 === d && (d = function (e) {
					const {
						slidesGrid: t,
						params: s
					} = e, a = e.rtlTranslate ? e.translate : -e.translate;
					let i;
					for (let e = 0; e < t.length; e += 1) void 0 !== t[e + 1] ? a >= t[e] && a < t[e + 1] - (t[e + 1] - t[e]) / 2 ? i = e : a >= t[e] && a < t[e + 1] && (i = e + 1) : a >= t[e] && (i = e);
					return s.normalizeSlideIndex && (i < 0 || void 0 === i) && (i = 0), i
				}(t)), a.indexOf(s) >= 0) o = a.indexOf(s);
			else {
				const e = Math.min(i.slidesPerGroupSkip, d);
				o = e + Math.floor((d - e) / i.slidesPerGroup)
			}
			if (o >= a.length && (o = a.length - 1), d === r) return o !== l && (t.snapIndex = o, t.emit("snapIndexChange")), void(t.params.loop && t.virtual && t.params.virtual.enabled && (t.realIndex = c(d)));
			let p;
			p = t.virtual && i.virtual.enabled && i.loop ? c(d) : t.slides[d] ? parseInt(t.slides[d].getAttribute("data-swiper-slide-index") || d, 10) : d, Object.assign(t, {
				snapIndex: o,
				realIndex: p,
				previousIndex: r,
				activeIndex: d
			}), t.emit("activeIndexChange"), t.emit("snapIndexChange"), n !== p && t.emit("realIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange")
		},
		updateClickedSlide: function (e) {
			const t = this,
				s = t.params,
				a = e.closest(`.${s.slideClass}, swiper-slide`);
			let i, r = !1;
			if (a)
				for (let e = 0; e < t.slides.length; e += 1)
					if (t.slides[e] === a) {
						r = !0, i = e;
						break
					} if (!a || !r) return t.clickedSlide = void 0, void(t.clickedIndex = void 0);
			t.clickedSlide = a, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(a.getAttribute("data-swiper-slide-index"), 10) : t.clickedIndex = i, s.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
		}
	};
	var z = {
		getTranslate: function (e) {
			void 0 === e && (e = this.isHorizontal() ? "x" : "y");
			const {
				params: t,
				rtlTranslate: s,
				translate: a,
				wrapperEl: i
			} = this;
			if (t.virtualTranslate) return s ? -a : a;
			if (t.cssMode) return a;
			let r = o(i, e);
			return s && (r = -r), r || 0
		},
		setTranslate: function (e, t) {
			const s = this,
				{
					rtlTranslate: a,
					params: i,
					wrapperEl: r,
					progress: n
				} = s;
			let l, o = 0,
				d = 0;
			s.isHorizontal() ? o = a ? -e : e : d = e, i.roundLengths && (o = Math.floor(o), d = Math.floor(d)), i.cssMode ? r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -o : -d : i.virtualTranslate || (r.style.transform = `translate3d(${o}px, ${d}px, 0px)`), s.previousTranslate = s.translate, s.translate = s.isHorizontal() ? o : d;
			const c = s.maxTranslate() - s.minTranslate();
			l = 0 === c ? 0 : (e - s.minTranslate()) / c, l !== n && s.updateProgress(e), s.emit("setTranslate", s.translate, t)
		},
		minTranslate: function () {
			return -this.snapGrid[0]
		},
		maxTranslate: function () {
			return -this.snapGrid[this.snapGrid.length - 1]
		},
		translateTo: function (e, t, s, a, i) {
			void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), void 0 === a && (a = !0);
			const r = this,
				{
					params: n,
					wrapperEl: l
				} = r;
			if (r.animating && n.preventInteractionOnTransition) return !1;
			const o = r.minTranslate(),
				d = r.maxTranslate();
			let c;
			if (c = a && e > o ? o : a && e < d ? d : e, r.updateProgress(c), n.cssMode) {
				const e = r.isHorizontal();
				if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -c;
				else {
					if (!r.support.smoothScroll) return m({
						swiper: r,
						targetPosition: -c,
						side: e ? "left" : "top"
					}), !0;
					l.scrollTo({
						[e ? "left" : "top"]: -c,
						behavior: "smooth"
					})
				}
				return !0
			}
			return 0 === t ? (r.setTransition(0), r.setTranslate(c), s && (r.emit("beforeTransitionStart", t, i), r.emit("transitionEnd"))) : (r.setTransition(t), r.setTranslate(c), s && (r.emit("beforeTransitionStart", t, i), r.emit("transitionStart")), r.animating || (r.animating = !0, r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function (e) {
				r && !r.destroyed && e.target === this && (r.wrapperEl.removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.onTranslateToWrapperTransitionEnd = null, delete r.onTranslateToWrapperTransitionEnd, s && r.emit("transitionEnd"))
			}), r.wrapperEl.addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd))), !0
		}
	};

	function k(e) {
		let {
			swiper: t,
			runCallbacks: s,
			direction: a,
			step: i
		} = e;
		const {
			activeIndex: r,
			previousIndex: n
		} = t;
		let l = a;
		if (l || (l = r > n ? "next" : r < n ? "prev" : "reset"), t.emit(`transition${i}`), s && r !== n) {
			if ("reset" === l) return void t.emit(`slideResetTransition${i}`);
			t.emit(`slideChangeTransition${i}`), "next" === l ? t.emit(`slideNextTransition${i}`) : t.emit(`slidePrevTransition${i}`)
		}
	}
	var I = {
		slideTo: function (e, t, s, a, i) {
			void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), "string" == typeof e && (e = parseInt(e, 10));
			const r = this;
			let n = e;
			n < 0 && (n = 0);
			const {
				params: l,
				snapGrid: o,
				slidesGrid: d,
				previousIndex: c,
				activeIndex: p,
				rtlTranslate: u,
				wrapperEl: h,
				enabled: f
			} = r;
			if (r.animating && l.preventInteractionOnTransition || !f && !a && !i) return !1;
			const g = Math.min(r.params.slidesPerGroupSkip, n);
			let v = g + Math.floor((n - g) / r.params.slidesPerGroup);
			v >= o.length && (v = o.length - 1);
			const w = -o[v];
			if (l.normalizeSlideIndex)
				for (let e = 0; e < d.length; e += 1) {
					const t = -Math.floor(100 * w),
						s = Math.floor(100 * d[e]),
						a = Math.floor(100 * d[e + 1]);
					void 0 !== d[e + 1] ? t >= s && t < a - (a - s) / 2 ? n = e : t >= s && t < a && (n = e + 1) : t >= s && (n = e)
				}
			if (r.initialized && n !== p) {
				if (!r.allowSlideNext && w < r.translate && w < r.minTranslate()) return !1;
				if (!r.allowSlidePrev && w > r.translate && w > r.maxTranslate() && (p || 0) !== n) return !1
			}
			let b;
			if (n !== (c || 0) && s && r.emit("beforeSlideChangeStart"), r.updateProgress(w), b = n > p ? "next" : n < p ? "prev" : "reset", u && -w === r.translate || !u && w === r.translate) return r.updateActiveIndex(n), l.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== l.effect && r.setTranslate(w), "reset" !== b && (r.transitionStart(s, b), r.transitionEnd(s, b)), !1;
			if (l.cssMode) {
				const e = r.isHorizontal(),
					s = u ? w : -w;
				if (0 === t) {
					const t = r.virtual && r.params.virtual.enabled;
					t && (r.wrapperEl.style.scrollSnapType = "none", r._immediateVirtual = !0), t && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0 ? (r._cssModeVirtualInitialSet = !0, requestAnimationFrame((() => {
						h[e ? "scrollLeft" : "scrollTop"] = s
					}))) : h[e ? "scrollLeft" : "scrollTop"] = s, t && requestAnimationFrame((() => {
						r.wrapperEl.style.scrollSnapType = "", r._immediateVirtual = !1
					}))
				} else {
					if (!r.support.smoothScroll) return m({
						swiper: r,
						targetPosition: s,
						side: e ? "left" : "top"
					}), !0;
					h.scrollTo({
						[e ? "left" : "top"]: s,
						behavior: "smooth"
					})
				}
				return !0
			}
			return r.setTransition(t), r.setTranslate(w), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, a), r.transitionStart(s, b), 0 === t ? r.transitionEnd(s, b) : r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function (e) {
				r && !r.destroyed && e.target === this && (r.wrapperEl.removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(s, b))
			}), r.wrapperEl.addEventListener("transitionend", r.onSlideToWrapperTransitionEnd)), !0
		},
		slideToLoop: function (e, t, s, a) {
			if (void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), "string" == typeof e) {
				e = parseInt(e, 10)
			}
			const i = this;
			let r = e;
			return i.params.loop && (i.virtual && i.params.virtual.enabled ? r += i.virtual.slidesBefore : r = i.getSlideIndex(i.slides.filter((e => 1 * e.getAttribute("data-swiper-slide-index") === r))[0])), i.slideTo(r, t, s, a)
		},
		slideNext: function (e, t, s) {
			void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
			const a = this,
				{
					enabled: i,
					params: r,
					animating: n
				} = a;
			if (!i) return a;
			let l = r.slidesPerGroup;
			"auto" === r.slidesPerView && 1 === r.slidesPerGroup && r.slidesPerGroupAuto && (l = Math.max(a.slidesPerViewDynamic("current", !0), 1));
			const o = a.activeIndex < r.slidesPerGroupSkip ? 1 : l,
				d = a.virtual && r.virtual.enabled;
			if (r.loop) {
				if (n && !d && r.loopPreventsSliding) return !1;
				a.loopFix({
					direction: "next"
				}), a._clientLeft = a.wrapperEl.clientLeft
			}
			return r.rewind && a.isEnd ? a.slideTo(0, e, t, s) : a.slideTo(a.activeIndex + o, e, t, s)
		},
		slidePrev: function (e, t, s) {
			void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
			const a = this,
				{
					params: i,
					snapGrid: r,
					slidesGrid: n,
					rtlTranslate: l,
					enabled: o,
					animating: d
				} = a;
			if (!o) return a;
			const c = a.virtual && i.virtual.enabled;
			if (i.loop) {
				if (d && !c && i.loopPreventsSliding) return !1;
				a.loopFix({
					direction: "prev"
				}), a._clientLeft = a.wrapperEl.clientLeft
			}

			function p(e) {
				return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
			}
			const u = p(l ? a.translate : -a.translate),
				m = r.map((e => p(e)));
			let h = r[m.indexOf(u) - 1];
			if (void 0 === h && i.cssMode) {
				let e;
				r.forEach(((t, s) => {
					u >= t && (e = s)
				})), void 0 !== e && (h = r[e > 0 ? e - 1 : e])
			}
			let f = 0;
			if (void 0 !== h && (f = n.indexOf(h), f < 0 && (f = a.activeIndex - 1), "auto" === i.slidesPerView && 1 === i.slidesPerGroup && i.slidesPerGroupAuto && (f = f - a.slidesPerViewDynamic("previous", !0) + 1, f = Math.max(f, 0))), i.rewind && a.isBeginning) {
				const i = a.params.virtual && a.params.virtual.enabled && a.virtual ? a.virtual.slides.length - 1 : a.slides.length - 1;
				return a.slideTo(i, e, t, s)
			}
			return a.slideTo(f, e, t, s)
		},
		slideReset: function (e, t, s) {
			return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, s)
		},
		slideToClosest: function (e, t, s, a) {
			void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === a && (a = .5);
			const i = this;
			let r = i.activeIndex;
			const n = Math.min(i.params.slidesPerGroupSkip, r),
				l = n + Math.floor((r - n) / i.params.slidesPerGroup),
				o = i.rtlTranslate ? i.translate : -i.translate;
			if (o >= i.snapGrid[l]) {
				const e = i.snapGrid[l];
				o - e > (i.snapGrid[l + 1] - e) * a && (r += i.params.slidesPerGroup)
			} else {
				const e = i.snapGrid[l - 1];
				o - e <= (i.snapGrid[l] - e) * a && (r -= i.params.slidesPerGroup)
			}
			return r = Math.max(r, 0), r = Math.min(r, i.slidesGrid.length - 1), i.slideTo(r, e, t, s)
		},
		slideToClickedSlide: function () {
			const e = this,
				{
					params: t,
					slidesEl: s
				} = e,
				a = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
			let i, r = e.clickedIndex;
			const l = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
			if (t.loop) {
				if (e.animating) return;
				i = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10), t.centeredSlides ? r < e.loopedSlides - a / 2 || r > e.slides.length - e.loopedSlides + a / 2 ? (e.loopFix(), r = e.getSlideIndex(f(s, `${l}[data-swiper-slide-index="${i}"]`)[0]), n((() => {
					e.slideTo(r)
				}))) : e.slideTo(r) : r > e.slides.length - a ? (e.loopFix(), r = e.getSlideIndex(f(s, `${l}[data-swiper-slide-index="${i}"]`)[0]), n((() => {
					e.slideTo(r)
				}))) : e.slideTo(r)
			} else e.slideTo(r)
		}
	};
	var O = {
		loopCreate: function (e) {
			const t = this,
				{
					params: s,
					slidesEl: a
				} = t;
			if (!s.loop || t.virtual && t.params.virtual.enabled) return;
			f(a, `.${s.slideClass}, swiper-slide`).forEach(((e, t) => {
				e.setAttribute("data-swiper-slide-index", t)
			})), t.loopFix({
				slideRealIndex: e,
				direction: s.centeredSlides ? void 0 : "next"
			})
		},
		loopFix: function (e) {
			let {
				slideRealIndex: t,
				slideTo: s = !0,
				direction: a,
				setTranslate: i,
				activeSlideIndex: r,
				byController: n,
				byMousewheel: l
			} = void 0 === e ? {} : e;
			const o = this;
			if (!o.params.loop) return;
			o.emit("beforeLoopFix");
			const {
				slides: d,
				allowSlidePrev: c,
				allowSlideNext: p,
				slidesEl: u,
				params: m
			} = o;
			if (o.allowSlidePrev = !0, o.allowSlideNext = !0, o.virtual && m.virtual.enabled) return s && (m.centeredSlides || 0 !== o.snapIndex ? m.centeredSlides && o.snapIndex < m.slidesPerView ? o.slideTo(o.virtual.slides.length + o.snapIndex, 0, !1, !0) : o.snapIndex === o.snapGrid.length - 1 && o.slideTo(o.virtual.slidesBefore, 0, !1, !0) : o.slideTo(o.virtual.slides.length, 0, !1, !0)), o.allowSlidePrev = c, o.allowSlideNext = p, void o.emit("loopFix");
			const h = "auto" === m.slidesPerView ? o.slidesPerViewDynamic() : Math.ceil(parseFloat(m.slidesPerView, 10));
			let f = m.loopedSlides || h;
			f % m.slidesPerGroup != 0 && (f += m.slidesPerGroup - f % m.slidesPerGroup), o.loopedSlides = f;
			const g = [],
				v = [];
			let w = o.activeIndex;
			void 0 === r ? r = o.getSlideIndex(o.slides.filter((e => e.classList.contains("swiper-slide-active")))[0]) : w = r;
			const b = "next" === a || !a,
				y = "prev" === a || !a;
			let E = 0,
				x = 0;
			if (r < f) {
				E = Math.max(f - r, m.slidesPerGroup);
				for (let e = 0; e < f - r; e += 1) {
					const t = e - Math.floor(e / d.length) * d.length;
					g.push(d.length - t - 1)
				}
			} else if (r > o.slides.length - 2 * f) {
				x = Math.max(r - (o.slides.length - 2 * f), m.slidesPerGroup);
				for (let e = 0; e < x; e += 1) {
					const t = e - Math.floor(e / d.length) * d.length;
					v.push(t)
				}
			}
			if (y && g.forEach((e => {
					u.prepend(o.slides[e])
				})), b && v.forEach((e => {
					u.append(o.slides[e])
				})), o.recalcSlides(), m.watchSlidesProgress && o.updateSlidesOffset(), s)
				if (g.length > 0 && y)
					if (void 0 === t) {
						const e = o.slidesGrid[w],
							t = o.slidesGrid[w + E] - e;
						l ? o.setTranslate(o.translate - t) : (o.slideTo(w + E, 0, !1, !0), i && (o.touches[o.isHorizontal() ? "startX" : "startY"] += t))
					} else i && o.slideToLoop(t, 0, !1, !0);
			else if (v.length > 0 && b)
				if (void 0 === t) {
					const e = o.slidesGrid[w],
						t = o.slidesGrid[w - x] - e;
					l ? o.setTranslate(o.translate - t) : (o.slideTo(w - x, 0, !1, !0), i && (o.touches[o.isHorizontal() ? "startX" : "startY"] += t))
				} else o.slideToLoop(t, 0, !1, !0);
			if (o.allowSlidePrev = c, o.allowSlideNext = p, o.controller && o.controller.control && !n) {
				const e = {
					slideRealIndex: t,
					slideTo: !1,
					direction: a,
					setTranslate: i,
					activeSlideIndex: r,
					byController: !0
				};
				Array.isArray(o.controller.control) ? o.controller.control.forEach((t => {
					t.params.loop && t.loopFix(e)
				})) : o.controller.control instanceof o.constructor && o.controller.control.params.loop && o.controller.control.loopFix(e)
			}
			o.emit("loopFix")
		},
		loopDestroy: function () {
			const e = this,
				{
					slides: t,
					params: s,
					slidesEl: a
				} = e;
			if (!s.loop || e.virtual && e.params.virtual.enabled) return;
			e.recalcSlides();
			const i = [];
			t.forEach((e => {
				const t = void 0 === e.swiperSlideIndex ? 1 * e.getAttribute("data-swiper-slide-index") : e.swiperSlideIndex;
				i[t] = e
			})), t.forEach((e => {
				e.removeAttribute("data-swiper-slide-index")
			})), i.forEach((e => {
				a.append(e)
			})), e.recalcSlides(), e.slideTo(e.realIndex, 0)
		}
	};

	function D(e) {
		const t = this,
			s = a(),
			i = r(),
			n = t.touchEventsData;
		n.evCache.push(e);
		const {
			params: o,
			touches: d,
			enabled: c
		} = t;
		if (!c) return;
		if (!o.simulateTouch && "mouse" === e.pointerType) return;
		if (t.animating && o.preventInteractionOnTransition) return;
		!t.animating && o.cssMode && o.loop && t.loopFix();
		let p = e;
		p.originalEvent && (p = p.originalEvent);
		let u = p.target;
		if ("wrapper" === o.touchEventsTarget && !t.wrapperEl.contains(u)) return;
		if ("which" in p && 3 === p.which) return;
		if ("button" in p && p.button > 0) return;
		if (n.isTouched && n.isMoved) return;
		const m = !!o.noSwipingClass && "" !== o.noSwipingClass,
			h = e.composedPath ? e.composedPath() : e.path;
		m && p.target && p.target.shadowRoot && h && (u = h[0]);
		const f = o.noSwipingSelector ? o.noSwipingSelector : `.${o.noSwipingClass}`,
			g = !(!p.target || !p.target.shadowRoot);
		if (o.noSwiping && (g ? function (e, t) {
				return void 0 === t && (t = this),
					function t(s) {
						if (!s || s === a() || s === r()) return null;
						s.assignedSlot && (s = s.assignedSlot);
						const i = s.closest(e);
						return i || s.getRootNode ? i || t(s.getRootNode().host) : null
					}(t)
			}(f, u) : u.closest(f))) return void(t.allowClick = !0);
		if (o.swipeHandler && !u.closest(o.swipeHandler)) return;
		d.currentX = p.pageX, d.currentY = p.pageY;
		const v = d.currentX,
			w = d.currentY,
			b = o.edgeSwipeDetection || o.iOSEdgeSwipeDetection,
			y = o.edgeSwipeThreshold || o.iOSEdgeSwipeThreshold;
		if (b && (v <= y || v >= i.innerWidth - y)) {
			if ("prevent" !== b) return;
			e.preventDefault()
		}
		Object.assign(n, {
			isTouched: !0,
			isMoved: !1,
			allowTouchCallbacks: !0,
			isScrolling: void 0,
			startMoving: void 0
		}), d.startX = v, d.startY = w, n.touchStartTime = l(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, o.threshold > 0 && (n.allowThresholdMove = !1);
		let E = !0;
		u.matches(n.focusableElements) && (E = !1, "SELECT" === u.nodeName && (n.isTouched = !1)), s.activeElement && s.activeElement.matches(n.focusableElements) && s.activeElement !== u && s.activeElement.blur();
		const x = E && t.allowTouchMove && o.touchStartPreventDefault;
		!o.touchStartForcePreventDefault && !x || u.isContentEditable || p.preventDefault(), t.params.freeMode && t.params.freeMode.enabled && t.freeMode && t.animating && !o.cssMode && t.freeMode.onTouchStart(), t.emit("touchStart", p)
	}

	function G(e) {
		const t = a(),
			s = this,
			i = s.touchEventsData,
			{
				params: r,
				touches: n,
				rtlTranslate: o,
				enabled: d
			} = s;
		if (!d) return;
		if (!r.simulateTouch && "mouse" === e.pointerType) return;
		let c = e;
		if (c.originalEvent && (c = c.originalEvent), !i.isTouched) return void(i.startMoving && i.isScrolling && s.emit("touchMoveOpposite", c));
		const p = i.evCache.findIndex((e => e.pointerId === c.pointerId));
		p >= 0 && (i.evCache[p] = c);
		const u = i.evCache.length > 1 ? i.evCache[0] : c,
			m = u.pageX,
			h = u.pageY;
		if (c.preventedByNestedSwiper) return n.startX = m, void(n.startY = h);
		if (!s.allowTouchMove) return c.target.matches(i.focusableElements) || (s.allowClick = !1), void(i.isTouched && (Object.assign(n, {
			startX: m,
			startY: h,
			prevX: s.touches.currentX,
			prevY: s.touches.currentY,
			currentX: m,
			currentY: h
		}), i.touchStartTime = l()));
		if (r.touchReleaseOnEdges && !r.loop)
			if (s.isVertical()) {
				if (h < n.startY && s.translate <= s.maxTranslate() || h > n.startY && s.translate >= s.minTranslate()) return i.isTouched = !1, void(i.isMoved = !1)
			} else if (m < n.startX && s.translate <= s.maxTranslate() || m > n.startX && s.translate >= s.minTranslate()) return;
		if (t.activeElement && c.target === t.activeElement && c.target.matches(i.focusableElements)) return i.isMoved = !0, void(s.allowClick = !1);
		if (i.allowTouchCallbacks && s.emit("touchMove", c), c.targetTouches && c.targetTouches.length > 1) return;
		n.currentX = m, n.currentY = h;
		const f = n.currentX - n.startX,
			g = n.currentY - n.startY;
		if (s.params.threshold && Math.sqrt(f ** 2 + g ** 2) < s.params.threshold) return;
		if (void 0 === i.isScrolling) {
			let e;
			s.isHorizontal() && n.currentY === n.startY || s.isVertical() && n.currentX === n.startX ? i.isScrolling = !1 : f * f + g * g >= 25 && (e = 180 * Math.atan2(Math.abs(g), Math.abs(f)) / Math.PI, i.isScrolling = s.isHorizontal() ? e > r.touchAngle : 90 - e > r.touchAngle)
		}
		if (i.isScrolling && s.emit("touchMoveOpposite", c), void 0 === i.startMoving && (n.currentX === n.startX && n.currentY === n.startY || (i.startMoving = !0)), i.isScrolling || s.zoom && s.params.zoom && s.params.zoom.enabled && i.evCache.length > 1) return void(i.isTouched = !1);
		if (!i.startMoving) return;
		s.allowClick = !1, !r.cssMode && c.cancelable && c.preventDefault(), r.touchMoveStopPropagation && !r.nested && c.stopPropagation();
		let v = s.isHorizontal() ? f : g,
			w = s.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
		r.oneWayMovement && (v = Math.abs(v) * (o ? 1 : -1), w = Math.abs(w) * (o ? 1 : -1)), n.diff = v, v *= r.touchRatio, o && (v = -v, w = -w);
		const b = s.touchesDirection;
		s.swipeDirection = v > 0 ? "prev" : "next", s.touchesDirection = w > 0 ? "prev" : "next";
		const y = s.params.loop && !r.cssMode;
		if (!i.isMoved) {
			if (y && s.loopFix({
					direction: s.swipeDirection
				}), i.startTranslate = s.getTranslate(), s.setTransition(0), s.animating) {
				const e = new window.CustomEvent("transitionend", {
					bubbles: !0,
					cancelable: !0
				});
				s.wrapperEl.dispatchEvent(e)
			}
			i.allowMomentumBounce = !1, !r.grabCursor || !0 !== s.allowSlideNext && !0 !== s.allowSlidePrev || s.setGrabCursor(!0), s.emit("sliderFirstMove", c)
		}
		let E;
		i.isMoved && b !== s.touchesDirection && y && Math.abs(v) >= 1 && (s.loopFix({
			direction: s.swipeDirection,
			setTranslate: !0
		}), E = !0), s.emit("sliderMove", c), i.isMoved = !0, i.currentTranslate = v + i.startTranslate;
		let x = !0,
			S = r.resistanceRatio;
		if (r.touchReleaseOnEdges && (S = 0), v > 0 ? (y && !E && i.currentTranslate > (r.centeredSlides ? s.minTranslate() - s.size / 2 : s.minTranslate()) && s.loopFix({
				direction: "prev",
				setTranslate: !0,
				activeSlideIndex: 0
			}), i.currentTranslate > s.minTranslate() && (x = !1, r.resistance && (i.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + i.startTranslate + v) ** S))) : v < 0 && (y && !E && i.currentTranslate < (r.centeredSlides ? s.maxTranslate() + s.size / 2 : s.maxTranslate()) && s.loopFix({
				direction: "next",
				setTranslate: !0,
				activeSlideIndex: s.slides.length - ("auto" === r.slidesPerView ? s.slidesPerViewDynamic() : Math.ceil(parseFloat(r.slidesPerView, 10)))
			}), i.currentTranslate < s.maxTranslate() && (x = !1, r.resistance && (i.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - i.startTranslate - v) ** S))), x && (c.preventedByNestedSwiper = !0), !s.allowSlideNext && "next" === s.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !s.allowSlidePrev && "prev" === s.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), s.allowSlidePrev || s.allowSlideNext || (i.currentTranslate = i.startTranslate), r.threshold > 0) {
			if (!(Math.abs(v) > r.threshold || i.allowThresholdMove)) return void(i.currentTranslate = i.startTranslate);
			if (!i.allowThresholdMove) return i.allowThresholdMove = !0, n.startX = n.currentX, n.startY = n.currentY, i.currentTranslate = i.startTranslate, void(n.diff = s.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY)
		}
		r.followFinger && !r.cssMode && ((r.freeMode && r.freeMode.enabled && s.freeMode || r.watchSlidesProgress) && (s.updateActiveIndex(), s.updateSlidesClasses()), s.params.freeMode && r.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(), s.updateProgress(i.currentTranslate), s.setTranslate(i.currentTranslate))
	}

	function H(e) {
		const t = this,
			s = t.touchEventsData,
			a = s.evCache.findIndex((t => t.pointerId === e.pointerId));
		if (a >= 0 && s.evCache.splice(a, 1), ["pointercancel", "pointerout", "pointerleave"].includes(e.type)) {
			if (!("pointercancel" === e.type && (t.browser.isSafari || t.browser.isWebView))) return
		}
		const {
			params: i,
			touches: r,
			rtlTranslate: o,
			slidesGrid: d,
			enabled: c
		} = t;
		if (!c) return;
		if (!i.simulateTouch && "mouse" === e.pointerType) return;
		let p = e;
		if (p.originalEvent && (p = p.originalEvent), s.allowTouchCallbacks && t.emit("touchEnd", p), s.allowTouchCallbacks = !1, !s.isTouched) return s.isMoved && i.grabCursor && t.setGrabCursor(!1), s.isMoved = !1, void(s.startMoving = !1);
		i.grabCursor && s.isMoved && s.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
		const u = l(),
			m = u - s.touchStartTime;
		if (t.allowClick) {
			const e = p.path || p.composedPath && p.composedPath();
			t.updateClickedSlide(e && e[0] || p.target), t.emit("tap click", p), m < 300 && u - s.lastClickTime < 300 && t.emit("doubleTap doubleClick", p)
		}
		if (s.lastClickTime = l(), n((() => {
				t.destroyed || (t.allowClick = !0)
			})), !s.isTouched || !s.isMoved || !t.swipeDirection || 0 === r.diff || s.currentTranslate === s.startTranslate) return s.isTouched = !1, s.isMoved = !1, void(s.startMoving = !1);
		let h;
		if (s.isTouched = !1, s.isMoved = !1, s.startMoving = !1, h = i.followFinger ? o ? t.translate : -t.translate : -s.currentTranslate, i.cssMode) return;
		if (t.params.freeMode && i.freeMode.enabled) return void t.freeMode.onTouchEnd({
			currentPos: h
		});
		let f = 0,
			g = t.slidesSizesGrid[0];
		for (let e = 0; e < d.length; e += e < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup) {
			const t = e < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
			void 0 !== d[e + t] ? h >= d[e] && h < d[e + t] && (f = e, g = d[e + t] - d[e]) : h >= d[e] && (f = e, g = d[d.length - 1] - d[d.length - 2])
		}
		let v = null,
			w = null;
		i.rewind && (t.isBeginning ? w = t.params.virtual && t.params.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (v = 0));
		const b = (h - d[f]) / g,
			y = f < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
		if (m > i.longSwipesMs) {
			if (!i.longSwipes) return void t.slideTo(t.activeIndex);
			"next" === t.swipeDirection && (b >= i.longSwipesRatio ? t.slideTo(i.rewind && t.isEnd ? v : f + y) : t.slideTo(f)), "prev" === t.swipeDirection && (b > 1 - i.longSwipesRatio ? t.slideTo(f + y) : null !== w && b < 0 && Math.abs(b) > i.longSwipesRatio ? t.slideTo(w) : t.slideTo(f))
		} else {
			if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
			t.navigation && (p.target === t.navigation.nextEl || p.target === t.navigation.prevEl) ? p.target === t.navigation.nextEl ? t.slideTo(f + y) : t.slideTo(f) : ("next" === t.swipeDirection && t.slideTo(null !== v ? v : f + y), "prev" === t.swipeDirection && t.slideTo(null !== w ? w : f))
		}
	}
	let B;

	function X() {
		const e = this,
			{
				params: t,
				el: s
			} = e;
		if (s && 0 === s.offsetWidth) return;
		t.breakpoints && e.setBreakpoint();
		const {
			allowSlideNext: a,
			allowSlidePrev: i,
			snapGrid: r
		} = e, n = e.virtual && e.params.virtual.enabled;
		e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses();
		const l = n && t.loop;
		!("auto" === t.slidesPerView || t.slidesPerView > 1) || !e.isEnd || e.isBeginning || e.params.centeredSlides || l ? e.params.loop && !n ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0) : e.slideTo(e.slides.length - 1, 0, !1, !0), e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(B), B = setTimeout((() => {
			e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume()
		}), 500)), e.allowSlidePrev = i, e.allowSlideNext = a, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
	}

	function Y(e) {
		const t = this;
		t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())))
	}

	function q() {
		const e = this,
			{
				wrapperEl: t,
				rtlTranslate: s,
				enabled: a
			} = e;
		if (!a) return;
		let i;
		e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, 0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
		const r = e.maxTranslate() - e.minTranslate();
		i = 0 === r ? 0 : (e.translate - e.minTranslate()) / r, i !== e.progress && e.updateProgress(s ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1)
	}
	const N = (e, t) => {
		if (!e || e.destroyed || !e.params) return;
		const s = t.closest(e.isElement ? "swiper-slide" : `.${e.params.slideClass}`);
		if (s) {
			const t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
			t && t.remove()
		}
	};

	function R(e) {
		N(this, e.target), this.update()
	}
	let _ = !1;

	function F() {}
	const V = (e, t) => {
		const s = a(),
			{
				params: i,
				el: r,
				wrapperEl: n,
				device: l
			} = e,
			o = !!i.nested,
			d = "on" === t ? "addEventListener" : "removeEventListener",
			c = t;
		r[d]("pointerdown", e.onTouchStart, {
			passive: !1
		}), s[d]("pointermove", e.onTouchMove, {
			passive: !1,
			capture: o
		}), s[d]("pointerup", e.onTouchEnd, {
			passive: !0
		}), s[d]("pointercancel", e.onTouchEnd, {
			passive: !0
		}), s[d]("pointerout", e.onTouchEnd, {
			passive: !0
		}), s[d]("pointerleave", e.onTouchEnd, {
			passive: !0
		}), (i.preventClicks || i.preventClicksPropagation) && r[d]("click", e.onClick, !0), i.cssMode && n[d]("scroll", e.onScroll), i.updateOnWindowResize ? e[c](l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", X, !0) : e[c]("observerUpdate", X, !0), r[d]("load", e.onLoad, {
			capture: !0
		})
	};
	const W = (e, t) => e.grid && t.grid && t.grid.rows > 1;
	var j = {
		init: !0,
		direction: "horizontal",
		oneWayMovement: !1,
		touchEventsTarget: "wrapper",
		initialSlide: 0,
		speed: 300,
		cssMode: !1,
		updateOnWindowResize: !0,
		resizeObserver: !0,
		nested: !1,
		createElements: !1,
		enabled: !0,
		focusableElements: "input, select, option, textarea, button, video, label",
		width: null,
		height: null,
		preventInteractionOnTransition: !1,
		userAgent: null,
		url: null,
		edgeSwipeDetection: !1,
		edgeSwipeThreshold: 20,
		autoHeight: !1,
		setWrapperSize: !1,
		virtualTranslate: !1,
		effect: "slide",
		breakpoints: void 0,
		breakpointsBase: "window",
		spaceBetween: 0,
		slidesPerView: 1,
		slidesPerGroup: 1,
		slidesPerGroupSkip: 0,
		slidesPerGroupAuto: !1,
		centeredSlides: !1,
		centeredSlidesBounds: !1,
		slidesOffsetBefore: 0,
		slidesOffsetAfter: 0,
		normalizeSlideIndex: !0,
		centerInsufficientSlides: !1,
		watchOverflow: !0,
		roundLengths: !1,
		touchRatio: 1,
		touchAngle: 45,
		simulateTouch: !0,
		shortSwipes: !0,
		longSwipes: !0,
		longSwipesRatio: .5,
		longSwipesMs: 300,
		followFinger: !0,
		allowTouchMove: !0,
		threshold: 5,
		touchMoveStopPropagation: !1,
		touchStartPreventDefault: !0,
		touchStartForcePreventDefault: !1,
		touchReleaseOnEdges: !1,
		uniqueNavElements: !0,
		resistance: !0,
		resistanceRatio: .85,
		watchSlidesProgress: !1,
		grabCursor: !1,
		preventClicks: !0,
		preventClicksPropagation: !0,
		slideToClickedSlide: !1,
		loop: !1,
		loopedSlides: null,
		loopPreventsSliding: !0,
		rewind: !1,
		allowSlidePrev: !0,
		allowSlideNext: !0,
		swipeHandler: null,
		noSwiping: !0,
		noSwipingClass: "swiper-no-swiping",
		noSwipingSelector: null,
		passiveListeners: !0,
		maxBackfaceHiddenSlides: 10,
		containerModifierClass: "swiper-",
		slideClass: "swiper-slide",
		slideActiveClass: "swiper-slide-active",
		slideVisibleClass: "swiper-slide-visible",
		slideNextClass: "swiper-slide-next",
		slidePrevClass: "swiper-slide-prev",
		wrapperClass: "swiper-wrapper",
		lazyPreloaderClass: "swiper-lazy-preloader",
		runCallbacksOnInit: !0,
		_emitClasses: !1
	};

	function U(e, t) {
		return function (s) {
			void 0 === s && (s = {});
			const a = Object.keys(s)[0],
				i = s[a];
			"object" == typeof i && null !== i ? (["navigation", "pagination", "scrollbar"].indexOf(a) >= 0 && !0 === e[a] && (e[a] = {
				auto: !0
			}), a in e && "enabled" in i ? (!0 === e[a] && (e[a] = {
				enabled: !0
			}), "object" != typeof e[a] || "enabled" in e[a] || (e[a].enabled = !0), e[a] || (e[a] = {
				enabled: !1
			}), p(t, s)) : p(t, s)) : p(t, s)
		}
	}
	const K = {
			eventsEmitter: A,
			update: $,
			translate: z,
			transition: {
				setTransition: function (e, t) {
					const s = this;
					s.params.cssMode || (s.wrapperEl.style.transitionDuration = `${e}ms`), s.emit("setTransition", e, t)
				},
				transitionStart: function (e, t) {
					void 0 === e && (e = !0);
					const s = this,
						{
							params: a
						} = s;
					a.cssMode || (a.autoHeight && s.updateAutoHeight(), k({
						swiper: s,
						runCallbacks: e,
						direction: t,
						step: "Start"
					}))
				},
				transitionEnd: function (e, t) {
					void 0 === e && (e = !0);
					const s = this,
						{
							params: a
						} = s;
					s.animating = !1, a.cssMode || (s.setTransition(0), k({
						swiper: s,
						runCallbacks: e,
						direction: t,
						step: "End"
					}))
				}
			},
			slide: I,
			loop: O,
			grabCursor: {
				setGrabCursor: function (e) {
					const t = this;
					if (!t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode) return;
					const s = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
					t.isElement && (t.__preventObserver__ = !0), s.style.cursor = "move", s.style.cursor = e ? "grabbing" : "grab", t.isElement && requestAnimationFrame((() => {
						t.__preventObserver__ = !1
					}))
				},
				unsetGrabCursor: function () {
					const e = this;
					e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0), e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "", e.isElement && requestAnimationFrame((() => {
						e.__preventObserver__ = !1
					})))
				}
			},
			events: {
				attachEvents: function () {
					const e = this,
						t = a(),
						{
							params: s
						} = e;
					e.onTouchStart = D.bind(e), e.onTouchMove = G.bind(e), e.onTouchEnd = H.bind(e), s.cssMode && (e.onScroll = q.bind(e)), e.onClick = Y.bind(e), e.onLoad = R.bind(e), _ || (t.addEventListener("touchstart", F), _ = !0), V(e, "on")
				},
				detachEvents: function () {
					V(this, "off")
				}
			},
			breakpoints: {
				setBreakpoint: function () {
					const e = this,
						{
							realIndex: t,
							initialized: s,
							params: a,
							el: i
						} = e,
						r = a.breakpoints;
					if (!r || r && 0 === Object.keys(r).length) return;
					const n = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
					if (!n || e.currentBreakpoint === n) return;
					const l = (n in r ? r[n] : void 0) || e.originalParams,
						o = W(e, a),
						d = W(e, l),
						c = a.enabled;
					o && !d ? (i.classList.remove(`${a.containerModifierClass}grid`, `${a.containerModifierClass}grid-column`), e.emitContainerClasses()) : !o && d && (i.classList.add(`${a.containerModifierClass}grid`), (l.grid.fill && "column" === l.grid.fill || !l.grid.fill && "column" === a.grid.fill) && i.classList.add(`${a.containerModifierClass}grid-column`), e.emitContainerClasses()), ["navigation", "pagination", "scrollbar"].forEach((t => {
						const s = a[t] && a[t].enabled,
							i = l[t] && l[t].enabled;
						s && !i && e[t].disable(), !s && i && e[t].enable()
					}));
					const u = l.direction && l.direction !== a.direction,
						m = a.loop && (l.slidesPerView !== a.slidesPerView || u);
					u && s && e.changeDirection(), p(e.params, l);
					const h = e.params.enabled;
					Object.assign(e, {
						allowTouchMove: e.params.allowTouchMove,
						allowSlideNext: e.params.allowSlideNext,
						allowSlidePrev: e.params.allowSlidePrev
					}), c && !h ? e.disable() : !c && h && e.enable(), e.currentBreakpoint = n, e.emit("_beforeBreakpoint", l), m && s && (e.loopDestroy(), e.loopCreate(t), e.updateSlides()), e.emit("breakpoint", l)
				},
				getBreakpoint: function (e, t, s) {
					if (void 0 === t && (t = "window"), !e || "container" === t && !s) return;
					let a = !1;
					const i = r(),
						n = "window" === t ? i.innerHeight : s.clientHeight,
						l = Object.keys(e).map((e => {
							if ("string" == typeof e && 0 === e.indexOf("@")) {
								const t = parseFloat(e.substr(1));
								return {
									value: n * t,
									point: e
								}
							}
							return {
								value: e,
								point: e
							}
						}));
					l.sort(((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10)));
					for (let e = 0; e < l.length; e += 1) {
						const {
							point: r,
							value: n
						} = l[e];
						"window" === t ? i.matchMedia(`(min-width: ${n}px)`).matches && (a = r) : n <= s.clientWidth && (a = r)
					}
					return a || "max"
				}
			},
			checkOverflow: {
				checkOverflow: function () {
					const e = this,
						{
							isLocked: t,
							params: s
						} = e,
						{
							slidesOffsetBefore: a
						} = s;
					if (a) {
						const t = e.slides.length - 1,
							s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * a;
						e.isLocked = e.size > s
					} else e.isLocked = 1 === e.snapGrid.length;
					!0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked), !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock")
				}
			},
			classes: {
				addClasses: function () {
					const e = this,
						{
							classNames: t,
							params: s,
							rtl: a,
							el: i,
							device: r
						} = e,
						n = function (e, t) {
							const s = [];
							return e.forEach((e => {
								"object" == typeof e ? Object.keys(e).forEach((a => {
									e[a] && s.push(t + a)
								})) : "string" == typeof e && s.push(t + e)
							})), s
						}(["initialized", s.direction, {
							"free-mode": e.params.freeMode && s.freeMode.enabled
						}, {
							autoheight: s.autoHeight
						}, {
							rtl: a
						}, {
							grid: s.grid && s.grid.rows > 1
						}, {
							"grid-column": s.grid && s.grid.rows > 1 && "column" === s.grid.fill
						}, {
							android: r.android
						}, {
							ios: r.ios
						}, {
							"css-mode": s.cssMode
						}, {
							centered: s.cssMode && s.centeredSlides
						}, {
							"watch-progress": s.watchSlidesProgress
						}], s.containerModifierClass);
					t.push(...n), i.classList.add(...t), e.emitContainerClasses()
				},
				removeClasses: function () {
					const {
						el: e,
						classNames: t
					} = this;
					e.classList.remove(...t), this.emitContainerClasses()
				}
			}
		},
		Z = {};
	class Q {
		constructor() {
			let e, t;
			for (var s = arguments.length, i = new Array(s), r = 0; r < s; r++) i[r] = arguments[r];
			1 === i.length && i[0].constructor && "Object" === Object.prototype.toString.call(i[0]).slice(8, -1) ? t = i[0] : [e, t] = i, t || (t = {}), t = p({}, t), e && !t.el && (t.el = e);
			const n = a();
			if (t.el && "string" == typeof t.el && n.querySelectorAll(t.el).length > 1) {
				const e = [];
				return n.querySelectorAll(t.el).forEach((s => {
					const a = p({}, t, {
						el: s
					});
					e.push(new Q(a))
				})), e
			}
			const o = this;
			o.__swiper__ = !0, o.support = C(), o.device = P({
				userAgent: t.userAgent
			}), o.browser = L(), o.eventsListeners = {}, o.eventsAnyListeners = [], o.modules = [...o.__modules__], t.modules && Array.isArray(t.modules) && o.modules.push(...t.modules);
			const d = {};
			o.modules.forEach((e => {
				e({
					params: t,
					swiper: o,
					extendParams: U(t, d),
					on: o.on.bind(o),
					once: o.once.bind(o),
					off: o.off.bind(o),
					emit: o.emit.bind(o)
				})
			}));
			const c = p({}, j, d);
			return o.params = p({}, c, Z, t), o.originalParams = p({}, o.params), o.passedParams = p({}, t), o.params && o.params.on && Object.keys(o.params.on).forEach((e => {
				o.on(e, o.params.on[e])
			})), o.params && o.params.onAny && o.onAny(o.params.onAny), Object.assign(o, {
				enabled: o.params.enabled,
				el: e,
				classNames: [],
				slides: [],
				slidesGrid: [],
				snapGrid: [],
				slidesSizesGrid: [],
				isHorizontal: () => "horizontal" === o.params.direction,
				isVertical: () => "vertical" === o.params.direction,
				activeIndex: 0,
				realIndex: 0,
				isBeginning: !0,
				isEnd: !1,
				translate: 0,
				previousTranslate: 0,
				progress: 0,
				velocity: 0,
				animating: !1,
				allowSlideNext: o.params.allowSlideNext,
				allowSlidePrev: o.params.allowSlidePrev,
				touchEventsData: {
					isTouched: void 0,
					isMoved: void 0,
					allowTouchCallbacks: void 0,
					touchStartTime: void 0,
					isScrolling: void 0,
					currentTranslate: void 0,
					startTranslate: void 0,
					allowThresholdMove: void 0,
					focusableElements: o.params.focusableElements,
					lastClickTime: l(),
					clickTimeout: void 0,
					velocities: [],
					allowMomentumBounce: void 0,
					startMoving: void 0,
					evCache: []
				},
				allowClick: !0,
				allowTouchMove: o.params.allowTouchMove,
				touches: {
					startX: 0,
					startY: 0,
					currentX: 0,
					currentY: 0,
					diff: 0
				},
				imagesToLoad: [],
				imagesLoaded: 0
			}), o.emit("_swiper"), o.params.init && o.init(), o
		}
		getSlideIndex(e) {
			const {
				slidesEl: t,
				params: s
			} = this, a = b(f(t, `.${s.slideClass}, swiper-slide`)[0]);
			return b(e) - a
		}
		recalcSlides() {
			const {
				slidesEl: e,
				params: t
			} = this;
			this.slides = f(e, `.${t.slideClass}, swiper-slide`)
		}
		enable() {
			const e = this;
			e.enabled || (e.enabled = !0, e.params.grabCursor && e.setGrabCursor(), e.emit("enable"))
		}
		disable() {
			const e = this;
			e.enabled && (e.enabled = !1, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"))
		}
		setProgress(e, t) {
			const s = this;
			e = Math.min(Math.max(e, 0), 1);
			const a = s.minTranslate(),
				i = (s.maxTranslate() - a) * e + a;
			s.translateTo(i, void 0 === t ? 0 : t), s.updateActiveIndex(), s.updateSlidesClasses()
		}
		emitContainerClasses() {
			const e = this;
			if (!e.params._emitClasses || !e.el) return;
			const t = e.el.className.split(" ").filter((t => 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass)));
			e.emit("_containerClasses", t.join(" "))
		}
		getSlideClasses(e) {
			const t = this;
			return t.destroyed ? "" : e.className.split(" ").filter((e => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass))).join(" ")
		}
		emitSlidesClasses() {
			const e = this;
			if (!e.params._emitClasses || !e.el) return;
			const t = [];
			e.slides.forEach((s => {
				const a = e.getSlideClasses(s);
				t.push({
					slideEl: s,
					classNames: a
				}), e.emit("_slideClass", s, a)
			})), e.emit("_slideClasses", t)
		}
		slidesPerViewDynamic(e, t) {
			void 0 === e && (e = "current"), void 0 === t && (t = !1);
			const {
				params: s,
				slides: a,
				slidesGrid: i,
				slidesSizesGrid: r,
				size: n,
				activeIndex: l
			} = this;
			let o = 1;
			if (s.centeredSlides) {
				let e, t = a[l].swiperSlideSize;
				for (let s = l + 1; s < a.length; s += 1) a[s] && !e && (t += a[s].swiperSlideSize, o += 1, t > n && (e = !0));
				for (let s = l - 1; s >= 0; s -= 1) a[s] && !e && (t += a[s].swiperSlideSize, o += 1, t > n && (e = !0))
			} else if ("current" === e)
				for (let e = l + 1; e < a.length; e += 1) {
					(t ? i[e] + r[e] - i[l] < n : i[e] - i[l] < n) && (o += 1)
				} else
					for (let e = l - 1; e >= 0; e -= 1) {
						i[l] - i[e] < n && (o += 1)
					}
			return o
		}
		update() {
			const e = this;
			if (!e || e.destroyed) return;
			const {
				snapGrid: t,
				params: s
			} = e;

			function a() {
				const t = e.rtlTranslate ? -1 * e.translate : e.translate,
					s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
				e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses()
			}
			let i;
			s.breakpoints && e.setBreakpoint(), [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t => {
				t.complete && N(e, t)
			})), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode && e.params.freeMode.enabled ? (a(), e.params.autoHeight && e.updateAutoHeight()) : (i = ("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), i || a()), s.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update")
		}
		changeDirection(e, t) {
			void 0 === t && (t = !0);
			const s = this,
				a = s.params.direction;
			return e || (e = "horizontal" === a ? "vertical" : "horizontal"), e === a || "horizontal" !== e && "vertical" !== e || (s.el.classList.remove(`${s.params.containerModifierClass}${a}`), s.el.classList.add(`${s.params.containerModifierClass}${e}`), s.emitContainerClasses(), s.params.direction = e, s.slides.forEach((t => {
				"vertical" === e ? t.style.width = "" : t.style.height = ""
			})), s.emit("changeDirection"), t && s.update()), s
		}
		changeLanguageDirection(e) {
			const t = this;
			t.rtl && "rtl" === e || !t.rtl && "ltr" === e || (t.rtl = "rtl" === e, t.rtlTranslate = "horizontal" === t.params.direction && t.rtl, t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`), t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`), t.el.dir = "ltr"), t.update())
		}
		mount(e) {
			const t = this;
			if (t.mounted) return !0;
			let s = e || t.params.el;
			if ("string" == typeof s && (s = document.querySelector(s)), !s) return !1;
			s.swiper = t, s.shadowEl && (t.isElement = !0);
			const a = () => `.${(t.params.wrapperClass||"").trim().split(" ").join(".")}`;
			let i = (() => {
				if (s && s.shadowRoot && s.shadowRoot.querySelector) {
					return s.shadowRoot.querySelector(a())
				}
				return f(s, a())[0]
			})();
			return !i && t.params.createElements && (i = g("div", t.params.wrapperClass), s.append(i), f(s, `.${t.params.slideClass}`).forEach((e => {
				i.append(e)
			}))), Object.assign(t, {
				el: s,
				wrapperEl: i,
				slidesEl: t.isElement ? s : i,
				mounted: !0,
				rtl: "rtl" === s.dir.toLowerCase() || "rtl" === w(s, "direction"),
				rtlTranslate: "horizontal" === t.params.direction && ("rtl" === s.dir.toLowerCase() || "rtl" === w(s, "direction")),
				wrongRTL: "-webkit-box" === w(i, "display")
			}), !0
		}
		init(e) {
			const t = this;
			if (t.initialized) return t;
			return !1 === t.mount(e) || (t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.params.loop && t.loopCreate(), t.attachEvents(), [...t.el.querySelectorAll('[loading="lazy"]')].forEach((e => {
				e.complete ? N(t, e) : e.addEventListener("load", (e => {
					N(t, e.target)
				}))
			})), t.initialized = !0, t.emit("init"), t.emit("afterInit")), t
		}
		destroy(e, t) {
			void 0 === e && (e = !0), void 0 === t && (t = !0);
			const s = this,
				{
					params: a,
					el: i,
					wrapperEl: r,
					slides: n
				} = s;
			return void 0 === s.params || s.destroyed || (s.emit("beforeDestroy"), s.initialized = !1, s.detachEvents(), a.loop && s.loopDestroy(), t && (s.removeClasses(), i.removeAttribute("style"), r.removeAttribute("style"), n && n.length && n.forEach((e => {
				e.classList.remove(a.slideVisibleClass, a.slideActiveClass, a.slideNextClass, a.slidePrevClass), e.removeAttribute("style"), e.removeAttribute("data-swiper-slide-index")
			}))), s.emit("destroy"), Object.keys(s.eventsListeners).forEach((e => {
				s.off(e)
			})), !1 !== e && (s.el.swiper = null, function (e) {
				const t = e;
				Object.keys(t).forEach((e => {
					try {
						t[e] = null
					} catch (e) {}
					try {
						delete t[e]
					} catch (e) {}
				}))
			}(s)), s.destroyed = !0), null
		}
		static extendDefaults(e) {
			p(Z, e)
		}
		static get extendedDefaults() {
			return Z
		}
		static get defaults() {
			return j
		}
		static installModule(e) {
			Q.prototype.__modules__ || (Q.prototype.__modules__ = []);
			const t = Q.prototype.__modules__;
			"function" == typeof e && t.indexOf(e) < 0 && t.push(e)
		}
		static use(e) {
			return Array.isArray(e) ? (e.forEach((e => Q.installModule(e))), Q) : (Q.installModule(e), Q)
		}
	}

	function J(e, t, s, a) {
		return e.params.createElements && Object.keys(a).forEach((i => {
			if (!s[i] && !0 === s.auto) {
				let r = f(e.el, `.${a[i]}`)[0];
				r || (r = g("div", a[i]), r.className = a[i], e.el.append(r)), s[i] = r, t[i] = r
			}
		})), s
	}

	function ee(e) {
		return void 0 === e && (e = ""), `.${e.trim().replace(/([\.:!\/])/g,"\\$1").replace(/ /g,".")}`
	}

	function te(e) {
		const t = this,
			{
				params: s,
				slidesEl: a
			} = t;
		s.loop && t.loopDestroy();
		const i = e => {
			if ("string" == typeof e) {
				const t = document.createElement("div");
				t.innerHTML = e, a.append(t.children[0]), t.innerHTML = ""
			} else a.append(e)
		};
		if ("object" == typeof e && "length" in e)
			for (let t = 0; t < e.length; t += 1) e[t] && i(e[t]);
		else i(e);
		t.recalcSlides(), s.loop && t.loopCreate(), s.observer && !t.isElement || t.update()
	}

	function se(e) {
		const t = this,
			{
				params: s,
				activeIndex: a,
				slidesEl: i
			} = t;
		s.loop && t.loopDestroy();
		let r = a + 1;
		const n = e => {
			if ("string" == typeof e) {
				const t = document.createElement("div");
				t.innerHTML = e, i.prepend(t.children[0]), t.innerHTML = ""
			} else i.prepend(e)
		};
		if ("object" == typeof e && "length" in e) {
			for (let t = 0; t < e.length; t += 1) e[t] && n(e[t]);
			r = a + e.length
		} else n(e);
		t.recalcSlides(), s.loop && t.loopCreate(), s.observer && !t.isElement || t.update(), t.slideTo(r, 0, !1)
	}

	function ae(e, t) {
		const s = this,
			{
				params: a,
				activeIndex: i,
				slidesEl: r
			} = s;
		let n = i;
		a.loop && (n -= s.loopedSlides, s.loopDestroy(), s.recalcSlides());
		const l = s.slides.length;
		if (e <= 0) return void s.prependSlide(t);
		if (e >= l) return void s.appendSlide(t);
		let o = n > e ? n + 1 : n;
		const d = [];
		for (let t = l - 1; t >= e; t -= 1) {
			const e = s.slides[t];
			e.remove(), d.unshift(e)
		}
		if ("object" == typeof t && "length" in t) {
			for (let e = 0; e < t.length; e += 1) t[e] && r.append(t[e]);
			o = n > e ? n + t.length : n
		} else r.append(t);
		for (let e = 0; e < d.length; e += 1) r.append(d[e]);
		s.recalcSlides(), a.loop && s.loopCreate(), a.observer && !s.isElement || s.update(), a.loop ? s.slideTo(o + s.loopedSlides, 0, !1) : s.slideTo(o, 0, !1)
	}

	function ie(e) {
		const t = this,
			{
				params: s,
				activeIndex: a
			} = t;
		let i = a;
		s.loop && (i -= t.loopedSlides, t.loopDestroy());
		let r, n = i;
		if ("object" == typeof e && "length" in e) {
			for (let s = 0; s < e.length; s += 1) r = e[s], t.slides[r] && t.slides[r].remove(), r < n && (n -= 1);
			n = Math.max(n, 0)
		} else r = e, t.slides[r] && t.slides[r].remove(), r < n && (n -= 1), n = Math.max(n, 0);
		t.recalcSlides(), s.loop && t.loopCreate(), s.observer && !t.isElement || t.update(), s.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1)
	}

	function re() {
		const e = this,
			t = [];
		for (let s = 0; s < e.slides.length; s += 1) t.push(s);
		e.removeSlide(t)
	}

	function ne(e) {
		const {
			effect: t,
			swiper: s,
			on: a,
			setTranslate: i,
			setTransition: r,
			overwriteParams: n,
			perspective: l,
			recreateShadows: o,
			getEffectParams: d
		} = e;
		let c;
		a("beforeInit", (() => {
			if (s.params.effect !== t) return;
			s.classNames.push(`${s.params.containerModifierClass}${t}`), l && l() && s.classNames.push(`${s.params.containerModifierClass}3d`);
			const e = n ? n() : {};
			Object.assign(s.params, e), Object.assign(s.originalParams, e)
		})), a("setTranslate", (() => {
			s.params.effect === t && i()
		})), a("setTransition", ((e, a) => {
			s.params.effect === t && r(a)
		})), a("transitionEnd", (() => {
			if (s.params.effect === t && o) {
				if (!d || !d().slideShadows) return;
				s.slides.forEach((e => {
					e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((e => e.remove()))
				})), o()
			}
		})), a("virtualUpdate", (() => {
			s.params.effect === t && (s.slides.length || (c = !0), requestAnimationFrame((() => {
				c && s.slides && s.slides.length && (i(), c = !1)
			})))
		}))
	}

	function le(e, t) {
		const s = h(t);
		return s !== t && (s.style.backfaceVisibility = "hidden", s.style["-webkit-backface-visibility"] = "hidden"), s
	}

	function oe(e) {
		let {
			swiper: t,
			duration: s,
			transformElements: a,
			allSlides: i
		} = e;
		const {
			activeIndex: r
		} = t;
		if (t.params.virtualTranslate && 0 !== s) {
			let e, s = !1;
			e = i ? a : a.filter((e => {
				const s = e.classList.contains("swiper-slide-transform") ? (e => {
					if (!e.parentElement) return t.slides.filter((t => t.shadowEl && t.shadowEl === e.parentNode))[0];
					return e.parentElement
				})(e) : e;
				return t.getSlideIndex(s) === r
			})), e.forEach((e => {
				E(e, (() => {
					if (s) return;
					if (!t || t.destroyed) return;
					s = !0, t.animating = !1;
					const e = new window.CustomEvent("transitionend", {
						bubbles: !0,
						cancelable: !0
					});
					t.wrapperEl.dispatchEvent(e)
				}))
			}))
		}
	}

	function de(e, t, s) {
		const a = "swiper-slide-shadow" + (s ? `-${s}` : ""),
			i = h(t);
		let r = i.querySelector(`.${a}`);
		return r || (r = g("div", "swiper-slide-shadow" + (s ? `-${s}` : "")), i.append(r)), r
	}
	Object.keys(K).forEach((e => {
		Object.keys(K[e]).forEach((t => {
			Q.prototype[t] = K[e][t]
		}))
	})), Q.use([function (e) {
		let {
			swiper: t,
			on: s,
			emit: a
		} = e;
		const i = r();
		let n = null,
			l = null;
		const o = () => {
				t && !t.destroyed && t.initialized && (a("beforeResize"), a("resize"))
			},
			d = () => {
				t && !t.destroyed && t.initialized && a("orientationchange")
			};
		s("init", (() => {
			t.params.resizeObserver && void 0 !== i.ResizeObserver ? t && !t.destroyed && t.initialized && (n = new ResizeObserver((e => {
				l = i.requestAnimationFrame((() => {
					const {
						width: s,
						height: a
					} = t;
					let i = s,
						r = a;
					e.forEach((e => {
						let {
							contentBoxSize: s,
							contentRect: a,
							target: n
						} = e;
						n && n !== t.el || (i = a ? a.width : (s[0] || s).inlineSize, r = a ? a.height : (s[0] || s).blockSize)
					})), i === s && r === a || o()
				}))
			})), n.observe(t.el)) : (i.addEventListener("resize", o), i.addEventListener("orientationchange", d))
		})), s("destroy", (() => {
			l && i.cancelAnimationFrame(l), n && n.unobserve && t.el && (n.unobserve(t.el), n = null), i.removeEventListener("resize", o), i.removeEventListener("orientationchange", d)
		}))
	}, function (e) {
		let {
			swiper: t,
			extendParams: s,
			on: a,
			emit: i
		} = e;
		const n = [],
			l = r(),
			o = function (e, s) {
				void 0 === s && (s = {});
				const a = new(l.MutationObserver || l.WebkitMutationObserver)((e => {
					if (t.__preventObserver__) return;
					if (1 === e.length) return void i("observerUpdate", e[0]);
					const s = function () {
						i("observerUpdate", e[0])
					};
					l.requestAnimationFrame ? l.requestAnimationFrame(s) : l.setTimeout(s, 0)
				}));
				a.observe(e, {
					attributes: void 0 === s.attributes || s.attributes,
					childList: void 0 === s.childList || s.childList,
					characterData: void 0 === s.characterData || s.characterData
				}), n.push(a)
			};
		s({
			observer: !1,
			observeParents: !1,
			observeSlideChildren: !1
		}), a("init", (() => {
			if (t.params.observer) {
				if (t.params.observeParents) {
					const e = y(t.el);
					for (let t = 0; t < e.length; t += 1) o(e[t])
				}
				o(t.el, {
					childList: t.params.observeSlideChildren
				}), o(t.wrapperEl, {
					attributes: !1
				})
			}
		})), a("destroy", (() => {
			n.forEach((e => {
				e.disconnect()
			})), n.splice(0, n.length)
		}))
	}]);
	const ce = [function (e) {
		let t, {
			swiper: s,
			extendParams: i,
			on: r,
			emit: n
		} = e;
		i({
			virtual: {
				enabled: !1,
				slides: [],
				cache: !0,
				renderSlide: null,
				renderExternal: null,
				renderExternalUpdate: !0,
				addSlidesBefore: 0,
				addSlidesAfter: 0
			}
		});
		const l = a();
		s.virtual = {
			cache: {},
			from: void 0,
			to: void 0,
			slides: [],
			offset: 0,
			slidesGrid: []
		};
		const o = l.createElement("div");

		function d(e, t) {
			const a = s.params.virtual;
			if (a.cache && s.virtual.cache[t]) return s.virtual.cache[t];
			let i;
			return a.renderSlide ? (i = a.renderSlide.call(s, e, t), "string" == typeof i && (o.innerHTML = i, i = o.children[0])) : i = s.isElement ? g("swiper-slide") : g("div", s.params.slideClass), i.setAttribute("data-swiper-slide-index", t), a.renderSlide || (i.innerHTML = e), a.cache && (s.virtual.cache[t] = i), i
		}

		function c(e) {
			const {
				slidesPerView: t,
				slidesPerGroup: a,
				centeredSlides: i,
				loop: r
			} = s.params, {
				addSlidesBefore: l,
				addSlidesAfter: o
			} = s.params.virtual, {
				from: c,
				to: p,
				slides: u,
				slidesGrid: m,
				offset: h
			} = s.virtual;
			s.params.cssMode || s.updateActiveIndex();
			const g = s.activeIndex || 0;
			let v, w, b;
			v = s.rtlTranslate ? "right" : s.isHorizontal() ? "left" : "top", i ? (w = Math.floor(t / 2) + a + o, b = Math.floor(t / 2) + a + l) : (w = t + (a - 1) + o, b = (r ? t : a) + l);
			let y = g - b,
				E = g + w;
			r || (y = Math.max(y, 0), E = Math.min(E, u.length - 1));
			let x = (s.slidesGrid[y] || 0) - (s.slidesGrid[0] || 0);

			function S() {
				s.updateSlides(), s.updateProgress(), s.updateSlidesClasses(), n("virtualUpdate")
			}
			if (r && g >= b ? (y -= b, i || (x += s.slidesGrid[0])) : r && g < b && (y = -b, i && (x += s.slidesGrid[0])), Object.assign(s.virtual, {
					from: y,
					to: E,
					offset: x,
					slidesGrid: s.slidesGrid,
					slidesBefore: b,
					slidesAfter: w
				}), c === y && p === E && !e) return s.slidesGrid !== m && x !== h && s.slides.forEach((e => {
				e.style[v] = `${x}px`
			})), s.updateProgress(), void n("virtualUpdate");
			if (s.params.virtual.renderExternal) return s.params.virtual.renderExternal.call(s, {
				offset: x,
				from: y,
				to: E,
				slides: function () {
					const e = [];
					for (let t = y; t <= E; t += 1) e.push(u[t]);
					return e
				}()
			}), void(s.params.virtual.renderExternalUpdate ? S() : n("virtualUpdate"));
			const T = [],
				M = [],
				C = e => {
					let t = e;
					return e < 0 ? t = u.length + e : t >= u.length && (t -= u.length), t
				};
			if (e) s.slidesEl.querySelectorAll(`.${s.params.slideClass}, swiper-slide`).forEach((e => {
				e.remove()
			}));
			else
				for (let e = c; e <= p; e += 1)
					if (e < y || e > E) {
						const t = C(e);
						s.slidesEl.querySelectorAll(`.${s.params.slideClass}[data-swiper-slide-index="${t}"], swiper-slide[data-swiper-slide-index="${t}"]`).forEach((e => {
							e.remove()
						}))
					} const P = r ? -u.length : 0,
				L = r ? 2 * u.length : u.length;
			for (let t = P; t < L; t += 1)
				if (t >= y && t <= E) {
					const s = C(t);
					void 0 === p || e ? M.push(s) : (t > p && M.push(s), t < c && T.push(s))
				} if (M.forEach((e => {
					s.slidesEl.append(d(u[e], e))
				})), r)
				for (let e = T.length - 1; e >= 0; e -= 1) {
					const t = T[e];
					s.slidesEl.prepend(d(u[t], t))
				} else T.sort(((e, t) => t - e)), T.forEach((e => {
					s.slidesEl.prepend(d(u[e], e))
				}));
			f(s.slidesEl, ".swiper-slide, swiper-slide").forEach((e => {
				e.style[v] = `${x}px`
			})), S()
		}
		r("beforeInit", (() => {
			if (!s.params.virtual.enabled) return;
			let e;
			if (void 0 === s.passedParams.virtual.slides) {
				const t = [...s.slidesEl.children].filter((e => e.matches(`.${s.params.slideClass}, swiper-slide`)));
				t && t.length && (s.virtual.slides = [...t], e = !0, t.forEach(((e, t) => {
					e.setAttribute("data-swiper-slide-index", t), s.virtual.cache[t] = e, e.remove()
				})))
			}
			e || (s.virtual.slides = s.params.virtual.slides), s.classNames.push(`${s.params.containerModifierClass}virtual`), s.params.watchSlidesProgress = !0, s.originalParams.watchSlidesProgress = !0, s.params.initialSlide || c()
		})), r("setTranslate", (() => {
			s.params.virtual.enabled && (s.params.cssMode && !s._immediateVirtual ? (clearTimeout(t), t = setTimeout((() => {
				c()
			}), 100)) : c())
		})), r("init update resize", (() => {
			s.params.virtual.enabled && s.params.cssMode && u(s.wrapperEl, "--swiper-virtual-size", `${s.virtualSize}px`)
		})), Object.assign(s.virtual, {
			appendSlide: function (e) {
				if ("object" == typeof e && "length" in e)
					for (let t = 0; t < e.length; t += 1) e[t] && s.virtual.slides.push(e[t]);
				else s.virtual.slides.push(e);
				c(!0)
			},
			prependSlide: function (e) {
				const t = s.activeIndex;
				let a = t + 1,
					i = 1;
				if (Array.isArray(e)) {
					for (let t = 0; t < e.length; t += 1) e[t] && s.virtual.slides.unshift(e[t]);
					a = t + e.length, i = e.length
				} else s.virtual.slides.unshift(e);
				if (s.params.virtual.cache) {
					const e = s.virtual.cache,
						t = {};
					Object.keys(e).forEach((s => {
						const a = e[s],
							r = a.getAttribute("data-swiper-slide-index");
						r && a.setAttribute("data-swiper-slide-index", parseInt(r, 10) + i), t[parseInt(s, 10) + i] = a
					})), s.virtual.cache = t
				}
				c(!0), s.slideTo(a, 0)
			},
			removeSlide: function (e) {
				if (null == e) return;
				let t = s.activeIndex;
				if (Array.isArray(e))
					for (let a = e.length - 1; a >= 0; a -= 1) s.virtual.slides.splice(e[a], 1), s.params.virtual.cache && delete s.virtual.cache[e[a]], e[a] < t && (t -= 1), t = Math.max(t, 0);
				else s.virtual.slides.splice(e, 1), s.params.virtual.cache && delete s.virtual.cache[e], e < t && (t -= 1), t = Math.max(t, 0);
				c(!0), s.slideTo(t, 0)
			},
			removeAllSlides: function () {
				s.virtual.slides = [], s.params.virtual.cache && (s.virtual.cache = {}), c(!0), s.slideTo(0, 0)
			},
			update: c
		})
	}, function (e) {
		let {
			swiper: t,
			extendParams: s,
			on: i,
			emit: n
		} = e;
		const l = a(),
			o = r();

		function d(e) {
			if (!t.enabled) return;
			const {
				rtlTranslate: s
			} = t;
			let a = e;
			a.originalEvent && (a = a.originalEvent);
			const i = a.keyCode || a.charCode,
				r = t.params.keyboard.pageUpDown,
				d = r && 33 === i,
				c = r && 34 === i,
				p = 37 === i,
				u = 39 === i,
				m = 38 === i,
				h = 40 === i;
			if (!t.allowSlideNext && (t.isHorizontal() && u || t.isVertical() && h || c)) return !1;
			if (!t.allowSlidePrev && (t.isHorizontal() && p || t.isVertical() && m || d)) return !1;
			if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || l.activeElement && l.activeElement.nodeName && ("input" === l.activeElement.nodeName.toLowerCase() || "textarea" === l.activeElement.nodeName.toLowerCase()))) {
				if (t.params.keyboard.onlyInViewport && (d || c || p || u || m || h)) {
					let e = !1;
					if (y(t.el, `.${t.params.slideClass}, swiper-slide`).length > 0 && 0 === y(t.el, `.${t.params.slideActiveClass}`).length) return;
					const a = t.el,
						i = a.clientWidth,
						r = a.clientHeight,
						n = o.innerWidth,
						l = o.innerHeight,
						d = v(a);
					s && (d.left -= a.scrollLeft);
					const c = [
						[d.left, d.top],
						[d.left + i, d.top],
						[d.left, d.top + r],
						[d.left + i, d.top + r]
					];
					for (let t = 0; t < c.length; t += 1) {
						const s = c[t];
						if (s[0] >= 0 && s[0] <= n && s[1] >= 0 && s[1] <= l) {
							if (0 === s[0] && 0 === s[1]) continue;
							e = !0
						}
					}
					if (!e) return
				}
				t.isHorizontal() ? ((d || c || p || u) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), ((c || u) && !s || (d || p) && s) && t.slideNext(), ((d || p) && !s || (c || u) && s) && t.slidePrev()) : ((d || c || m || h) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), (c || h) && t.slideNext(), (d || m) && t.slidePrev()), n("keyPress", i)
			}
		}

		function c() {
			t.keyboard.enabled || (l.addEventListener("keydown", d), t.keyboard.enabled = !0)
		}

		function p() {
			t.keyboard.enabled && (l.removeEventListener("keydown", d), t.keyboard.enabled = !1)
		}
		t.keyboard = {
			enabled: !1
		}, s({
			keyboard: {
				enabled: !1,
				onlyInViewport: !0,
				pageUpDown: !0
			}
		}), i("init", (() => {
			t.params.keyboard.enabled && c()
		})), i("destroy", (() => {
			t.keyboard.enabled && p()
		})), Object.assign(t.keyboard, {
			enable: c,
			disable: p
		})
	}, function (e) {
		let {
			swiper: t,
			extendParams: s,
			on: a,
			emit: i
		} = e;
		const o = r();
		let d;
		s({
			mousewheel: {
				enabled: !1,
				releaseOnEdges: !1,
				invert: !1,
				forceToAxis: !1,
				sensitivity: 1,
				eventsTarget: "container",
				thresholdDelta: null,
				thresholdTime: null
			}
		}), t.mousewheel = {
			enabled: !1
		};
		let c, p = l();
		const u = [];

		function m() {
			t.enabled && (t.mouseEntered = !0)
		}

		function h() {
			t.enabled && (t.mouseEntered = !1)
		}

		function f(e) {
			return !(t.params.mousewheel.thresholdDelta && e.delta < t.params.mousewheel.thresholdDelta) && (!(t.params.mousewheel.thresholdTime && l() - p < t.params.mousewheel.thresholdTime) && (e.delta >= 6 && l() - p < 60 || (e.direction < 0 ? t.isEnd && !t.params.loop || t.animating || (t.slideNext(), i("scroll", e.raw)) : t.isBeginning && !t.params.loop || t.animating || (t.slidePrev(), i("scroll", e.raw)), p = (new o.Date).getTime(), !1)))
		}

		function g(e) {
			let s = e,
				a = !0;
			if (!t.enabled) return;
			const r = t.params.mousewheel;
			t.params.cssMode && s.preventDefault();
			let o = t.el;
			"container" !== t.params.mousewheel.eventsTarget && (o = document.querySelector(t.params.mousewheel.eventsTarget));
			const p = o && o.contains(s.target);
			if (!t.mouseEntered && !p && !r.releaseOnEdges) return !0;
			s.originalEvent && (s = s.originalEvent);
			let m = 0;
			const h = t.rtlTranslate ? -1 : 1,
				g = function (e) {
					let t = 0,
						s = 0,
						a = 0,
						i = 0;
					return "detail" in e && (s = e.detail), "wheelDelta" in e && (s = -e.wheelDelta / 120), "wheelDeltaY" in e && (s = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = s, s = 0), a = 10 * t, i = 10 * s, "deltaY" in e && (i = e.deltaY), "deltaX" in e && (a = e.deltaX), e.shiftKey && !a && (a = i, i = 0), (a || i) && e.deltaMode && (1 === e.deltaMode ? (a *= 40, i *= 40) : (a *= 800, i *= 800)), a && !t && (t = a < 1 ? -1 : 1), i && !s && (s = i < 1 ? -1 : 1), {
						spinX: t,
						spinY: s,
						pixelX: a,
						pixelY: i
					}
				}(s);
			if (r.forceToAxis)
				if (t.isHorizontal()) {
					if (!(Math.abs(g.pixelX) > Math.abs(g.pixelY))) return !0;
					m = -g.pixelX * h
				} else {
					if (!(Math.abs(g.pixelY) > Math.abs(g.pixelX))) return !0;
					m = -g.pixelY
				}
			else m = Math.abs(g.pixelX) > Math.abs(g.pixelY) ? -g.pixelX * h : -g.pixelY;
			if (0 === m) return !0;
			r.invert && (m = -m);
			let v = t.getTranslate() + m * r.sensitivity;
			if (v >= t.minTranslate() && (v = t.minTranslate()), v <= t.maxTranslate() && (v = t.maxTranslate()), a = !!t.params.loop || !(v === t.minTranslate() || v === t.maxTranslate()), a && t.params.nested && s.stopPropagation(), t.params.freeMode && t.params.freeMode.enabled) {
				const e = {
						time: l(),
						delta: Math.abs(m),
						direction: Math.sign(m)
					},
					a = c && e.time < c.time + 500 && e.delta <= c.delta && e.direction === c.direction;
				if (!a) {
					c = void 0;
					let l = t.getTranslate() + m * r.sensitivity;
					const o = t.isBeginning,
						p = t.isEnd;
					if (l >= t.minTranslate() && (l = t.minTranslate()), l <= t.maxTranslate() && (l = t.maxTranslate()), t.setTransition(0), t.setTranslate(l), t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses(), (!o && t.isBeginning || !p && t.isEnd) && t.updateSlidesClasses(), t.params.loop && t.loopFix({
							direction: e.direction < 0 ? "next" : "prev",
							byMousewheel: !0
						}), t.params.freeMode.sticky) {
						clearTimeout(d), d = void 0, u.length >= 15 && u.shift();
						const s = u.length ? u[u.length - 1] : void 0,
							a = u[0];
						if (u.push(e), s && (e.delta > s.delta || e.direction !== s.direction)) u.splice(0);
						else if (u.length >= 15 && e.time - a.time < 500 && a.delta - e.delta >= 1 && e.delta <= 6) {
							const s = m > 0 ? .8 : .2;
							c = e, u.splice(0), d = n((() => {
								t.slideToClosest(t.params.speed, !0, void 0, s)
							}), 0)
						}
						d || (d = n((() => {
							c = e, u.splice(0), t.slideToClosest(t.params.speed, !0, void 0, .5)
						}), 500))
					}
					if (a || i("scroll", s), t.params.autoplay && t.params.autoplayDisableOnInteraction && t.autoplay.stop(), l === t.minTranslate() || l === t.maxTranslate()) return !0
				}
			} else {
				const s = {
					time: l(),
					delta: Math.abs(m),
					direction: Math.sign(m),
					raw: e
				};
				u.length >= 2 && u.shift();
				const a = u.length ? u[u.length - 1] : void 0;
				if (u.push(s), a ? (s.direction !== a.direction || s.delta > a.delta || s.time > a.time + 150) && f(s) : f(s), function (e) {
						const s = t.params.mousewheel;
						if (e.direction < 0) {
							if (t.isEnd && !t.params.loop && s.releaseOnEdges) return !0
						} else if (t.isBeginning && !t.params.loop && s.releaseOnEdges) return !0;
						return !1
					}(s)) return !0
			}
			return s.preventDefault ? s.preventDefault() : s.returnValue = !1, !1
		}

		function v(e) {
			let s = t.el;
			"container" !== t.params.mousewheel.eventsTarget && (s = document.querySelector(t.params.mousewheel.eventsTarget)), s[e]("mouseenter", m), s[e]("mouseleave", h), s[e]("wheel", g)
		}

		function w() {
			return t.params.cssMode ? (t.wrapperEl.removeEventListener("wheel", g), !0) : !t.mousewheel.enabled && (v("addEventListener"), t.mousewheel.enabled = !0, !0)
		}

		function b() {
			return t.params.cssMode ? (t.wrapperEl.addEventListener(event, g), !0) : !!t.mousewheel.enabled && (v("removeEventListener"), t.mousewheel.enabled = !1, !0)
		}
		a("init", (() => {
			!t.params.mousewheel.enabled && t.params.cssMode && b(), t.params.mousewheel.enabled && w()
		})), a("destroy", (() => {
			t.params.cssMode && w(), t.mousewheel.enabled && b()
		})), Object.assign(t.mousewheel, {
			enable: w,
			disable: b
		})
	}, function (e) {
		let {
			swiper: t,
			extendParams: s,
			on: a,
			emit: i
		} = e;
		s({
			navigation: {
				nextEl: null,
				prevEl: null,
				hideOnClick: !1,
				disabledClass: "swiper-button-disabled",
				hiddenClass: "swiper-button-hidden",
				lockClass: "swiper-button-lock",
				navigationDisabledClass: "swiper-navigation-disabled"
			}
		}), t.navigation = {
			nextEl: null,
			prevEl: null
		};
		const r = e => (Array.isArray(e) || (e = [e].filter((e => !!e))), e);

		function n(e) {
			let s;
			return e && "string" == typeof e && t.isElement && (s = t.el.shadowRoot.querySelector(e), s) ? s : (e && ("string" == typeof e && (s = [...document.querySelectorAll(e)]), t.params.uniqueNavElements && "string" == typeof e && s.length > 1 && 1 === t.el.querySelectorAll(e).length && (s = t.el.querySelector(e))), e && !s ? e : s)
		}

		function l(e, s) {
			const a = t.params.navigation;
			(e = r(e)).forEach((e => {
				e && (e.classList[s ? "add" : "remove"](...a.disabledClass.split(" ")), "BUTTON" === e.tagName && (e.disabled = s), t.params.watchOverflow && t.enabled && e.classList[t.isLocked ? "add" : "remove"](a.lockClass))
			}))
		}

		function o() {
			const {
				nextEl: e,
				prevEl: s
			} = t.navigation;
			if (t.params.loop) return l(s, !1), void l(e, !1);
			l(s, t.isBeginning && !t.params.rewind), l(e, t.isEnd && !t.params.rewind)
		}

		function d(e) {
			e.preventDefault(), (!t.isBeginning || t.params.loop || t.params.rewind) && (t.slidePrev(), i("navigationPrev"))
		}

		function c(e) {
			e.preventDefault(), (!t.isEnd || t.params.loop || t.params.rewind) && (t.slideNext(), i("navigationNext"))
		}

		function p() {
			const e = t.params.navigation;
			if (t.params.navigation = J(t, t.originalParams.navigation, t.params.navigation, {
					nextEl: "swiper-button-next",
					prevEl: "swiper-button-prev"
				}), !e.nextEl && !e.prevEl) return;
			let s = n(e.nextEl),
				a = n(e.prevEl);
			Object.assign(t.navigation, {
				nextEl: s,
				prevEl: a
			}), s = r(s), a = r(a);
			const i = (s, a) => {
				s && s.addEventListener("click", "next" === a ? c : d), !t.enabled && s && s.classList.add(...e.lockClass.split(" "))
			};
			s.forEach((e => i(e, "next"))), a.forEach((e => i(e, "prev")))
		}

		function u() {
			let {
				nextEl: e,
				prevEl: s
			} = t.navigation;
			e = r(e), s = r(s);
			const a = (e, s) => {
				e.removeEventListener("click", "next" === s ? c : d), e.classList.remove(...t.params.navigation.disabledClass.split(" "))
			};
			e.forEach((e => a(e, "next"))), s.forEach((e => a(e, "prev")))
		}
		a("init", (() => {
			!1 === t.params.navigation.enabled ? m() : (p(), o())
		})), a("toEdge fromEdge lock unlock", (() => {
			o()
		})), a("destroy", (() => {
			u()
		})), a("enable disable", (() => {
			let {
				nextEl: e,
				prevEl: s
			} = t.navigation;
			e = r(e), s = r(s), [...e, ...s].filter((e => !!e)).forEach((e => e.classList[t.enabled ? "remove" : "add"](t.params.navigation.lockClass)))
		})), a("click", ((e, s) => {
			let {
				nextEl: a,
				prevEl: n
			} = t.navigation;
			a = r(a), n = r(n);
			const l = s.target;
			if (t.params.navigation.hideOnClick && !n.includes(l) && !a.includes(l)) {
				if (t.pagination && t.params.pagination && t.params.pagination.clickable && (t.pagination.el === l || t.pagination.el.contains(l))) return;
				let e;
				a.length ? e = a[0].classList.contains(t.params.navigation.hiddenClass) : n.length && (e = n[0].classList.contains(t.params.navigation.hiddenClass)), i(!0 === e ? "navigationShow" : "navigationHide"), [...a, ...n].filter((e => !!e)).forEach((e => e.classList.toggle(t.params.navigation.hiddenClass)))
			}
		}));
		const m = () => {
			t.el.classList.add(...t.params.navigation.navigationDisabledClass.split(" ")), u()
		};
		Object.assign(t.navigation, {
			enable: () => {
				t.el.classList.remove(...t.params.navigation.navigationDisabledClass.split(" ")), p(), o()
			},
			disable: m,
			update: o,
			init: p,
			destroy: u
		})
	}, function (e) {
		let {
			swiper: t,
			extendParams: s,
			on: a,
			emit: i
		} = e;
		const r = "swiper-pagination";
		let n;
		s({
			pagination: {
				el: null,
				bulletElement: "span",
				clickable: !1,
				hideOnClick: !1,
				renderBullet: null,
				renderProgressbar: null,
				renderFraction: null,
				renderCustom: null,
				progressbarOpposite: !1,
				type: "bullets",
				dynamicBullets: !1,
				dynamicMainBullets: 1,
				formatFractionCurrent: e => e,
				formatFractionTotal: e => e,
				bulletClass: `${r}-bullet`,
				bulletActiveClass: `${r}-bullet-active`,
				modifierClass: `${r}-`,
				currentClass: `${r}-current`,
				totalClass: `${r}-total`,
				hiddenClass: `${r}-hidden`,
				progressbarFillClass: `${r}-progressbar-fill`,
				progressbarOppositeClass: `${r}-progressbar-opposite`,
				clickableClass: `${r}-clickable`,
				lockClass: `${r}-lock`,
				horizontalClass: `${r}-horizontal`,
				verticalClass: `${r}-vertical`,
				paginationDisabledClass: `${r}-disabled`
			}
		}), t.pagination = {
			el: null,
			bullets: []
		};
		let l = 0;
		const o = e => (Array.isArray(e) || (e = [e].filter((e => !!e))), e);

		function d() {
			return !t.params.pagination.el || !t.pagination.el || Array.isArray(t.pagination.el) && 0 === t.pagination.el.length
		}

		function c(e, s) {
			const {
				bulletActiveClass: a
			} = t.params.pagination;
			e && (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) && (e.classList.add(`${a}-${s}`), (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) && e.classList.add(`${a}-${s}-${s}`))
		}

		function p(e) {
			const s = e.target.closest(ee(t.params.pagination.bulletClass));
			if (!s) return;
			e.preventDefault();
			const a = b(s) * t.params.slidesPerGroup;
			if (t.params.loop) {
				if (t.realIndex === a) return;
				(a < t.loopedSlides || a > t.slides.length - t.loopedSlides) && t.loopFix({
					direction: a < t.loopedSlides ? "prev" : "next",
					activeSlideIndex: a,
					slideTo: !1
				}), t.slideToLoop(a)
			} else t.slideTo(a)
		}

		function u() {
			const e = t.rtl,
				s = t.params.pagination;
			if (d()) return;
			let a, r = t.pagination.el;
			r = o(r);
			const p = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length,
				u = t.params.loop ? Math.ceil(p / t.params.slidesPerGroup) : t.snapGrid.length;
			if (a = t.params.loop ? t.params.slidesPerGroup > 1 ? Math.floor(t.realIndex / t.params.slidesPerGroup) : t.realIndex : void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0, "bullets" === s.type && t.pagination.bullets && t.pagination.bullets.length > 0) {
				const i = t.pagination.bullets;
				let o, d, p;
				if (s.dynamicBullets && (n = x(i[0], t.isHorizontal() ? "width" : "height", !0), r.forEach((e => {
						e.style[t.isHorizontal() ? "width" : "height"] = n * (s.dynamicMainBullets + 4) + "px"
					})), s.dynamicMainBullets > 1 && void 0 !== t.previousIndex && (l += a - (t.previousIndex || 0), l > s.dynamicMainBullets - 1 ? l = s.dynamicMainBullets - 1 : l < 0 && (l = 0)), o = Math.max(a - l, 0), d = o + (Math.min(i.length, s.dynamicMainBullets) - 1), p = (d + o) / 2), i.forEach((e => {
						e.classList.remove(...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((e => `${s.bulletActiveClass}${e}`)))
					})), r.length > 1) i.forEach((e => {
					const t = b(e);
					t === a && e.classList.add(s.bulletActiveClass), s.dynamicBullets && (t >= o && t <= d && e.classList.add(`${s.bulletActiveClass}-main`), t === o && c(e, "prev"), t === d && c(e, "next"))
				}));
				else {
					const e = i[a];
					if (e && e.classList.add(s.bulletActiveClass), s.dynamicBullets) {
						const e = i[o],
							t = i[d];
						for (let e = o; e <= d; e += 1) i[e] && i[e].classList.add(`${s.bulletActiveClass}-main`);
						c(e, "prev"), c(t, "next")
					}
				}
				if (s.dynamicBullets) {
					const a = Math.min(i.length, s.dynamicMainBullets + 4),
						r = (n * a - n) / 2 - p * n,
						l = e ? "right" : "left";
					i.forEach((e => {
						e.style[t.isHorizontal() ? l : "top"] = `${r}px`
					}))
				}
			}
			r.forEach(((e, r) => {
				if ("fraction" === s.type && (e.querySelectorAll(ee(s.currentClass)).forEach((e => {
						e.textContent = s.formatFractionCurrent(a + 1)
					})), e.querySelectorAll(ee(s.totalClass)).forEach((e => {
						e.textContent = s.formatFractionTotal(u)
					}))), "progressbar" === s.type) {
					let i;
					i = s.progressbarOpposite ? t.isHorizontal() ? "vertical" : "horizontal" : t.isHorizontal() ? "horizontal" : "vertical";
					const r = (a + 1) / u;
					let n = 1,
						l = 1;
					"horizontal" === i ? n = r : l = r, e.querySelectorAll(ee(s.progressbarFillClass)).forEach((e => {
						e.style.transform = `translate3d(0,0,0) scaleX(${n}) scaleY(${l})`, e.style.transitionDuration = `${t.params.speed}ms`
					}))
				}
				"custom" === s.type && s.renderCustom ? (e.innerHTML = s.renderCustom(t, a + 1, u), 0 === r && i("paginationRender", e)) : (0 === r && i("paginationRender", e), i("paginationUpdate", e)), t.params.watchOverflow && t.enabled && e.classList[t.isLocked ? "add" : "remove"](s.lockClass)
			}))
		}

		function m() {
			const e = t.params.pagination;
			if (d()) return;
			const s = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length;
			let a = t.pagination.el;
			a = o(a);
			let r = "";
			if ("bullets" === e.type) {
				let a = t.params.loop ? Math.ceil(s / t.params.slidesPerGroup) : t.snapGrid.length;
				t.params.freeMode && t.params.freeMode.enabled && a > s && (a = s);
				for (let s = 0; s < a; s += 1) e.renderBullet ? r += e.renderBullet.call(t, s, e.bulletClass) : r += `<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`
			}
			"fraction" === e.type && (r = e.renderFraction ? e.renderFraction.call(t, e.currentClass, e.totalClass) : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`), "progressbar" === e.type && (r = e.renderProgressbar ? e.renderProgressbar.call(t, e.progressbarFillClass) : `<span class="${e.progressbarFillClass}"></span>`), a.forEach((s => {
				"custom" !== e.type && (s.innerHTML = r || ""), "bullets" === e.type && (t.pagination.bullets = [...s.querySelectorAll(ee(e.bulletClass))])
			})), "custom" !== e.type && i("paginationRender", a[0])
		}

		function h() {
			t.params.pagination = J(t, t.originalParams.pagination, t.params.pagination, {
				el: "swiper-pagination"
			});
			const e = t.params.pagination;
			if (!e.el) return;
			let s;
			"string" == typeof e.el && t.isElement && (s = t.el.shadowRoot.querySelector(e.el)), s || "string" != typeof e.el || (s = [...document.querySelectorAll(e.el)]), s || (s = e.el), s && 0 !== s.length && (t.params.uniqueNavElements && "string" == typeof e.el && Array.isArray(s) && s.length > 1 && (s = [...t.el.querySelectorAll(e.el)], s.length > 1 && (s = s.filter((e => y(e, ".swiper")[0] === t.el))[0])), Array.isArray(s) && 1 === s.length && (s = s[0]), Object.assign(t.pagination, {
				el: s
			}), s = o(s), s.forEach((s => {
				"bullets" === e.type && e.clickable && s.classList.add(e.clickableClass), s.classList.add(e.modifierClass + e.type), s.classList.add(t.isHorizontal() ? e.horizontalClass : e.verticalClass), "bullets" === e.type && e.dynamicBullets && (s.classList.add(`${e.modifierClass}${e.type}-dynamic`), l = 0, e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)), "progressbar" === e.type && e.progressbarOpposite && s.classList.add(e.progressbarOppositeClass), e.clickable && s.addEventListener("click", p), t.enabled || s.classList.add(e.lockClass)
			})))
		}

		function f() {
			const e = t.params.pagination;
			if (d()) return;
			let s = t.pagination.el;
			s && (s = o(s), s.forEach((s => {
				s.classList.remove(e.hiddenClass), s.classList.remove(e.modifierClass + e.type), s.classList.remove(t.isHorizontal() ? e.horizontalClass : e.verticalClass), e.clickable && s.removeEventListener("click", p)
			}))), t.pagination.bullets && t.pagination.bullets.forEach((t => t.classList.remove(e.bulletActiveClass)))
		}
		a("init", (() => {
			!1 === t.params.pagination.enabled ? g() : (h(), m(), u())
		})), a("activeIndexChange", (() => {
			void 0 === t.snapIndex && u()
		})), a("snapIndexChange", (() => {
			u()
		})), a("snapGridLengthChange", (() => {
			m(), u()
		})), a("destroy", (() => {
			f()
		})), a("enable disable", (() => {
			let {
				el: e
			} = t.pagination;
			e && (e = o(e), e.forEach((e => e.classList[t.enabled ? "remove" : "add"](t.params.pagination.lockClass))))
		})), a("lock unlock", (() => {
			u()
		})), a("click", ((e, s) => {
			const a = s.target;
			let {
				el: r
			} = t.pagination;
			if (Array.isArray(r) || (r = [r].filter((e => !!e))), t.params.pagination.el && t.params.pagination.hideOnClick && r && r.length > 0 && !a.classList.contains(t.params.pagination.bulletClass)) {
				if (t.navigation && (t.navigation.nextEl && a === t.navigation.nextEl || t.navigation.prevEl && a === t.navigation.prevEl)) return;
				const e = r[0].classList.contains(t.params.pagination.hiddenClass);
				i(!0 === e ? "paginationShow" : "paginationHide"), r.forEach((e => e.classList.toggle(t.params.pagination.hiddenClass)))
			}
		}));
		const g = () => {
			t.el.classList.add(t.params.pagination.paginationDisabledClass);
			let {
				el: e
			} = t.pagination;
			e && (e = o(e), e.forEach((e => e.classList.add(t.params.pagination.paginationDisabledClass)))), f()
		};
		Object.assign(t.pagination, {
			enable: () => {
				t.el.classList.remove(t.params.pagination.paginationDisabledClass);
				let {
					el: e
				} = t.pagination;
				e && (e = o(e), e.forEach((e => e.classList.remove(t.params.pagination.paginationDisabledClass)))), h(), m(), u()
			},
			disable: g,
			render: m,
			update: u,
			init: h,
			destroy: f
		})
	}, function (e) {
		let {
			swiper: t,
			extendParams: s,
			on: i,
			emit: r
		} = e;
		const l = a();
		let o, d, c, p, u = !1,
			m = null,
			h = null;

		function f() {
			if (!t.params.scrollbar.el || !t.scrollbar.el) return;
			const {
				scrollbar: e,
				rtlTranslate: s
			} = t, {
				dragEl: a,
				el: i
			} = e, r = t.params.scrollbar, n = t.params.loop ? t.progressLoop : t.progress;
			let l = d,
				o = (c - d) * n;
			s ? (o = -o, o > 0 ? (l = d - o, o = 0) : -o + d > c && (l = c + o)) : o < 0 ? (l = d + o, o = 0) : o + d > c && (l = c - o), t.isHorizontal() ? (a.style.transform = `translate3d(${o}px, 0, 0)`, a.style.width = `${l}px`) : (a.style.transform = `translate3d(0px, ${o}px, 0)`, a.style.height = `${l}px`), r.hide && (clearTimeout(m), i.style.opacity = 1, m = setTimeout((() => {
				i.style.opacity = 0, i.style.transitionDuration = "400ms"
			}), 1e3))
		}

		function w() {
			if (!t.params.scrollbar.el || !t.scrollbar.el) return;
			const {
				scrollbar: e
			} = t, {
				dragEl: s,
				el: a
			} = e;
			s.style.width = "", s.style.height = "", c = t.isHorizontal() ? a.offsetWidth : a.offsetHeight, p = t.size / (t.virtualSize + t.params.slidesOffsetBefore - (t.params.centeredSlides ? t.snapGrid[0] : 0)), d = "auto" === t.params.scrollbar.dragSize ? c * p : parseInt(t.params.scrollbar.dragSize, 10), t.isHorizontal() ? s.style.width = `${d}px` : s.style.height = `${d}px`, a.style.display = p >= 1 ? "none" : "", t.params.scrollbar.hide && (a.style.opacity = 0), t.params.watchOverflow && t.enabled && e.el.classList[t.isLocked ? "add" : "remove"](t.params.scrollbar.lockClass)
		}

		function b(e) {
			return t.isHorizontal() ? e.clientX : e.clientY
		}

		function y(e) {
			const {
				scrollbar: s,
				rtlTranslate: a
			} = t, {
				el: i
			} = s;
			let r;
			r = (b(e) - v(i)[t.isHorizontal() ? "left" : "top"] - (null !== o ? o : d / 2)) / (c - d), r = Math.max(Math.min(r, 1), 0), a && (r = 1 - r);
			const n = t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * r;
			t.updateProgress(n), t.setTranslate(n), t.updateActiveIndex(), t.updateSlidesClasses()
		}

		function E(e) {
			const s = t.params.scrollbar,
				{
					scrollbar: a,
					wrapperEl: i
				} = t,
				{
					el: n,
					dragEl: l
				} = a;
			u = !0, o = e.target === l ? b(e) - e.target.getBoundingClientRect()[t.isHorizontal() ? "left" : "top"] : null, e.preventDefault(), e.stopPropagation(), i.style.transitionDuration = "100ms", l.style.transitionDuration = "100ms", y(e), clearTimeout(h), n.style.transitionDuration = "0ms", s.hide && (n.style.opacity = 1), t.params.cssMode && (t.wrapperEl.style["scroll-snap-type"] = "none"), r("scrollbarDragStart", e)
		}

		function x(e) {
			const {
				scrollbar: s,
				wrapperEl: a
			} = t, {
				el: i,
				dragEl: n
			} = s;
			u && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, y(e), a.style.transitionDuration = "0ms", i.style.transitionDuration = "0ms", n.style.transitionDuration = "0ms", r("scrollbarDragMove", e))
		}

		function S(e) {
			const s = t.params.scrollbar,
				{
					scrollbar: a,
					wrapperEl: i
				} = t,
				{
					el: l
				} = a;
			u && (u = !1, t.params.cssMode && (t.wrapperEl.style["scroll-snap-type"] = "", i.style.transitionDuration = ""), s.hide && (clearTimeout(h), h = n((() => {
				l.style.opacity = 0, l.style.transitionDuration = "400ms"
			}), 1e3)), r("scrollbarDragEnd", e), s.snapOnRelease && t.slideToClosest())
		}

		function T(e) {
			const {
				scrollbar: s,
				params: a
			} = t, i = s.el;
			if (!i) return;
			const r = i,
				n = !!a.passiveListeners && {
					passive: !1,
					capture: !1
				},
				o = !!a.passiveListeners && {
					passive: !0,
					capture: !1
				};
			if (!r) return;
			const d = "on" === e ? "addEventListener" : "removeEventListener";
			r[d]("pointerdown", E, n), l[d]("pointermove", x, n), l[d]("pointerup", S, o)
		}

		function M() {
			const {
				scrollbar: e,
				el: s
			} = t;
			t.params.scrollbar = J(t, t.originalParams.scrollbar, t.params.scrollbar, {
				el: "swiper-scrollbar"
			});
			const a = t.params.scrollbar;
			if (!a.el) return;
			let i, r;
			"string" == typeof a.el && t.isElement && (i = t.el.shadowRoot.querySelector(a.el)), i || "string" != typeof a.el ? i || (i = a.el) : i = l.querySelectorAll(a.el), t.params.uniqueNavElements && "string" == typeof a.el && i.length > 1 && 1 === s.querySelectorAll(a.el).length && (i = s.querySelector(a.el)), i.length > 0 && (i = i[0]), i.classList.add(t.isHorizontal() ? a.horizontalClass : a.verticalClass), i && (r = i.querySelector(`.${t.params.scrollbar.dragClass}`), r || (r = g("div", t.params.scrollbar.dragClass), i.append(r))), Object.assign(e, {
				el: i,
				dragEl: r
			}), a.draggable && t.params.scrollbar.el && t.scrollbar.el && T("on"), i && i.classList[t.enabled ? "remove" : "add"](t.params.scrollbar.lockClass)
		}

		function C() {
			const e = t.params.scrollbar,
				s = t.scrollbar.el;
			s && s.classList.remove(t.isHorizontal() ? e.horizontalClass : e.verticalClass), t.params.scrollbar.el && t.scrollbar.el && T("off")
		}
		s({
			scrollbar: {
				el: null,
				dragSize: "auto",
				hide: !1,
				draggable: !1,
				snapOnRelease: !0,
				lockClass: "swiper-scrollbar-lock",
				dragClass: "swiper-scrollbar-drag",
				scrollbarDisabledClass: "swiper-scrollbar-disabled",
				horizontalClass: "swiper-scrollbar-horizontal",
				verticalClass: "swiper-scrollbar-vertical"
			}
		}), t.scrollbar = {
			el: null,
			dragEl: null
		}, i("init", (() => {
			!1 === t.params.scrollbar.enabled ? P() : (M(), w(), f())
		})), i("update resize observerUpdate lock unlock", (() => {
			w()
		})), i("setTranslate", (() => {
			f()
		})), i("setTransition", ((e, s) => {
			! function (e) {
				t.params.scrollbar.el && t.scrollbar.el && (t.scrollbar.dragEl.style.transitionDuration = `${e}ms`)
			}(s)
		})), i("enable disable", (() => {
			const {
				el: e
			} = t.scrollbar;
			e && e.classList[t.enabled ? "remove" : "add"](t.params.scrollbar.lockClass)
		})), i("destroy", (() => {
			C()
		}));
		const P = () => {
			t.el.classList.add(t.params.scrollbar.scrollbarDisabledClass), t.scrollbar.el && t.scrollbar.el.classList.add(t.params.scrollbar.scrollbarDisabledClass), C()
		};
		Object.assign(t.scrollbar, {
			enable: () => {
				t.el.classList.remove(t.params.scrollbar.scrollbarDisabledClass), t.scrollbar.el && t.scrollbar.el.classList.remove(t.params.scrollbar.scrollbarDisabledClass), M(), w(), f()
			},
			disable: P,
			updateSize: w,
			setTranslate: f,
			init: M,
			destroy: C
		})
	}, function (e) {
		let {
			swiper: t,
			extendParams: s,
			on: a
		} = e;
		s({
			parallax: {
				enabled: !1
			}
		});
		const i = (e, s) => {
				const {
					rtl: a
				} = t, i = a ? -1 : 1, r = e.getAttribute("data-swiper-parallax") || "0";
				let n = e.getAttribute("data-swiper-parallax-x"),
					l = e.getAttribute("data-swiper-parallax-y");
				const o = e.getAttribute("data-swiper-parallax-scale"),
					d = e.getAttribute("data-swiper-parallax-opacity"),
					c = e.getAttribute("data-swiper-parallax-rotate");
				if (n || l ? (n = n || "0", l = l || "0") : t.isHorizontal() ? (n = r, l = "0") : (l = r, n = "0"), n = n.indexOf("%") >= 0 ? parseInt(n, 10) * s * i + "%" : n * s * i + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * s + "%" : l * s + "px", null != d) {
					const t = d - (d - 1) * (1 - Math.abs(s));
					e.style.opacity = t
				}
				let p = `translate3d(${n}, ${l}, 0px)`;
				if (null != o) {
					p += ` scale(${o-(o-1)*(1-Math.abs(s))})`
				}
				if (c && null != c) {
					p += ` rotate(${c*s*-1}deg)`
				}
				e.style.transform = p
			},
			r = () => {
				const {
					el: e,
					slides: s,
					progress: a,
					snapGrid: r
				} = t;
				f(e, "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").forEach((e => {
					i(e, a)
				})), s.forEach(((e, s) => {
					let n = e.progress;
					t.params.slidesPerGroup > 1 && "auto" !== t.params.slidesPerView && (n += Math.ceil(s / 2) - a * (r.length - 1)), n = Math.min(Math.max(n, -1), 1), e.querySelectorAll("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale], [data-swiper-parallax-rotate]").forEach((e => {
						i(e, n)
					}))
				}))
			};
		a("beforeInit", (() => {
			t.params.parallax.enabled && (t.params.watchSlidesProgress = !0, t.originalParams.watchSlidesProgress = !0)
		})), a("init", (() => {
			t.params.parallax.enabled && r()
		})), a("setTranslate", (() => {
			t.params.parallax.enabled && r()
		})), a("setTransition", ((e, s) => {
			t.params.parallax.enabled && function (e) {
				void 0 === e && (e = t.params.speed);
				const {
					el: s
				} = t;
				s.querySelectorAll("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").forEach((t => {
					let s = parseInt(t.getAttribute("data-swiper-parallax-duration"), 10) || e;
					0 === e && (s = 0), t.style.transitionDuration = `${s}ms`
				}))
			}(s)
		}))
	}, function (e) {
		let {
			swiper: t,
			extendParams: s,
			on: a,
			emit: i
		} = e;
		const n = r();
		s({
			zoom: {
				enabled: !1,
				maxRatio: 3,
				minRatio: 1,
				toggle: !0,
				containerClass: "swiper-zoom-container",
				zoomedSlideClass: "swiper-slide-zoomed"
			}
		}), t.zoom = {
			enabled: !1
		};
		let l, d, c = 1,
			p = !1;
		const u = [],
			m = {
				slideEl: void 0,
				slideWidth: void 0,
				slideHeight: void 0,
				imageEl: void 0,
				imageWrapEl: void 0,
				maxRatio: 3
			},
			h = {
				isTouched: void 0,
				isMoved: void 0,
				currentX: void 0,
				currentY: void 0,
				minX: void 0,
				minY: void 0,
				maxX: void 0,
				maxY: void 0,
				width: void 0,
				height: void 0,
				startX: void 0,
				startY: void 0,
				touchesStart: {},
				touchesCurrent: {}
			},
			g = {
				x: void 0,
				y: void 0,
				prevPositionX: void 0,
				prevPositionY: void 0,
				prevTime: void 0
			};
		let w = 1;

		function b() {
			if (u.length < 2) return 1;
			const e = u[0].pageX,
				t = u[0].pageY,
				s = u[1].pageX,
				a = u[1].pageY;
			return Math.sqrt((s - e) ** 2 + (a - t) ** 2)
		}

		function E(e) {
			const s = t.isElement ? "swiper-slide" : `.${t.params.slideClass}`;
			return !!e.target.matches(s) || t.slides.filter((t => t.contains(e.target))).length > 0
		}

		function x(e) {
			if ("mouse" === e.pointerType && u.splice(0, u.length), !E(e)) return;
			const s = t.params.zoom;
			if (l = !1, d = !1, u.push(e), !(u.length < 2)) {
				if (l = !0, m.scaleStart = b(), !m.slideEl) {
					m.slideEl = e.target.closest(`.${t.params.slideClass}, swiper-slide`), m.slideEl || (m.slideEl = t.slides[t.activeIndex]);
					let a = m.slideEl.querySelector(`.${s.containerClass}`);
					if (a && (a = a.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]), m.imageEl = a, m.imageWrapEl = a ? y(m.imageEl, `.${s.containerClass}`)[0] : void 0, !m.imageWrapEl) return void(m.imageEl = void 0);
					m.maxRatio = m.imageWrapEl.getAttribute("data-swiper-zoom") || s.maxRatio
				}
				if (m.imageEl) {
					const [e, t] = function () {
						if (u.length < 2) return {
							x: null,
							y: null
						};
						const e = m.imageEl.getBoundingClientRect();
						return [(u[0].pageX + (u[1].pageX - u[0].pageX) / 2 - e.x) / c, (u[0].pageY + (u[1].pageY - u[0].pageY) / 2 - e.y) / c]
					}();
					m.imageEl.style.transformOrigin = `${e}px ${t}px`, m.imageEl.style.transitionDuration = "0ms"
				}
				p = !0
			}
		}

		function S(e) {
			if (!E(e)) return;
			const s = t.params.zoom,
				a = t.zoom,
				i = u.findIndex((t => t.pointerId === e.pointerId));
			i >= 0 && (u[i] = e), u.length < 2 || (d = !0, m.scaleMove = b(), m.imageEl && (a.scale = m.scaleMove / m.scaleStart * c, a.scale > m.maxRatio && (a.scale = m.maxRatio - 1 + (a.scale - m.maxRatio + 1) ** .5), a.scale < s.minRatio && (a.scale = s.minRatio + 1 - (s.minRatio - a.scale + 1) ** .5), m.imageEl.style.transform = `translate3d(0,0,0) scale(${a.scale})`))
		}

		function T(e) {
			if (!E(e)) return;
			if ("mouse" === e.pointerType && "pointerout" === e.type) return;
			const s = t.params.zoom,
				a = t.zoom,
				i = u.findIndex((t => t.pointerId === e.pointerId));
			i >= 0 && u.splice(i, 1), l && d && (l = !1, d = !1, m.imageEl && (a.scale = Math.max(Math.min(a.scale, m.maxRatio), s.minRatio), m.imageEl.style.transitionDuration = `${t.params.speed}ms`, m.imageEl.style.transform = `translate3d(0,0,0) scale(${a.scale})`, c = a.scale, p = !1, 1 === a.scale && (m.slideEl = void 0)))
		}

		function M(e) {
			if (!E(e) || ! function (e) {
					const s = `.${t.params.zoom.containerClass}`;
					return !!e.target.matches(s) || [...t.el.querySelectorAll(s)].filter((t => t.contains(e.target))).length > 0
				}(e)) return;
			const s = t.zoom;
			if (!m.imageEl) return;
			if (t.allowClick = !1, !h.isTouched || !m.slideEl) return;
			h.isMoved || (h.width = m.imageEl.offsetWidth, h.height = m.imageEl.offsetHeight, h.startX = o(m.imageWrapEl, "x") || 0, h.startY = o(m.imageWrapEl, "y") || 0, m.slideWidth = m.slideEl.offsetWidth, m.slideHeight = m.slideEl.offsetHeight, m.imageWrapEl.style.transitionDuration = "0ms");
			const a = h.width * s.scale,
				i = h.height * s.scale;
			if (!(a < m.slideWidth && i < m.slideHeight)) {
				if (h.minX = Math.min(m.slideWidth / 2 - a / 2, 0), h.maxX = -h.minX, h.minY = Math.min(m.slideHeight / 2 - i / 2, 0), h.maxY = -h.minY, h.touchesCurrent.x = u.length > 0 ? u[0].pageX : e.pageX, h.touchesCurrent.y = u.length > 0 ? u[0].pageY : e.pageY, !h.isMoved && !p) {
					if (t.isHorizontal() && (Math.floor(h.minX) === Math.floor(h.startX) && h.touchesCurrent.x < h.touchesStart.x || Math.floor(h.maxX) === Math.floor(h.startX) && h.touchesCurrent.x > h.touchesStart.x)) return void(h.isTouched = !1);
					if (!t.isHorizontal() && (Math.floor(h.minY) === Math.floor(h.startY) && h.touchesCurrent.y < h.touchesStart.y || Math.floor(h.maxY) === Math.floor(h.startY) && h.touchesCurrent.y > h.touchesStart.y)) return void(h.isTouched = !1)
				}
				e.cancelable && e.preventDefault(), e.stopPropagation(), h.isMoved = !0, h.currentX = h.touchesCurrent.x - h.touchesStart.x + h.startX, h.currentY = h.touchesCurrent.y - h.touchesStart.y + h.startY, h.currentX < h.minX && (h.currentX = h.minX + 1 - (h.minX - h.currentX + 1) ** .8), h.currentX > h.maxX && (h.currentX = h.maxX - 1 + (h.currentX - h.maxX + 1) ** .8), h.currentY < h.minY && (h.currentY = h.minY + 1 - (h.minY - h.currentY + 1) ** .8), h.currentY > h.maxY && (h.currentY = h.maxY - 1 + (h.currentY - h.maxY + 1) ** .8), g.prevPositionX || (g.prevPositionX = h.touchesCurrent.x), g.prevPositionY || (g.prevPositionY = h.touchesCurrent.y), g.prevTime || (g.prevTime = Date.now()), g.x = (h.touchesCurrent.x - g.prevPositionX) / (Date.now() - g.prevTime) / 2, g.y = (h.touchesCurrent.y - g.prevPositionY) / (Date.now() - g.prevTime) / 2, Math.abs(h.touchesCurrent.x - g.prevPositionX) < 2 && (g.x = 0), Math.abs(h.touchesCurrent.y - g.prevPositionY) < 2 && (g.y = 0), g.prevPositionX = h.touchesCurrent.x, g.prevPositionY = h.touchesCurrent.y, g.prevTime = Date.now(), m.imageWrapEl.style.transform = `translate3d(${h.currentX}px, ${h.currentY}px,0)`
			}
		}

		function C() {
			const e = t.zoom;
			m.slideEl && t.previousIndex !== t.activeIndex && (m.imageEl && (m.imageEl.style.transform = "translate3d(0,0,0) scale(1)"), m.imageWrapEl && (m.imageWrapEl.style.transform = "translate3d(0,0,0)"), e.scale = 1, c = 1, m.slideEl = void 0, m.imageEl = void 0, m.imageWrapEl = void 0)
		}

		function P(e) {
			const s = t.zoom,
				a = t.params.zoom;
			if (!m.slideEl) {
				e && e.target && (m.slideEl = e.target.closest(`.${t.params.slideClass}, swiper-slide`)), m.slideEl || (t.params.virtual && t.params.virtual.enabled && t.virtual ? m.slideEl = f(t.slidesEl, `.${t.params.slideActiveClass}`)[0] : m.slideEl = t.slides[t.activeIndex]);
				let s = m.slideEl.querySelector(`.${a.containerClass}`);
				s && (s = s.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]), m.imageEl = s, m.imageWrapEl = s ? y(m.imageEl, `.${a.containerClass}`)[0] : void 0
			}
			if (!m.imageEl || !m.imageWrapEl) return;
			let i, r, l, o, d, p, u, g, w, b, E, x, S, T, M, C, P, L;
			t.params.cssMode && (t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.touchAction = "none"), m.slideEl.classList.add(`${a.zoomedSlideClass}`), void 0 === h.touchesStart.x && e ? (i = e.pageX, r = e.pageY) : (i = h.touchesStart.x, r = h.touchesStart.y);
			const A = "number" == typeof e ? e : null;
			1 === c && A && (i = void 0, r = void 0), s.scale = A || m.imageWrapEl.getAttribute("data-swiper-zoom") || a.maxRatio, c = A || m.imageWrapEl.getAttribute("data-swiper-zoom") || a.maxRatio, !e || 1 === c && A ? (u = 0, g = 0) : (P = m.slideEl.offsetWidth, L = m.slideEl.offsetHeight, l = v(m.slideEl).left + n.scrollX, o = v(m.slideEl).top + n.scrollY, d = l + P / 2 - i, p = o + L / 2 - r, w = m.imageEl.offsetWidth, b = m.imageEl.offsetHeight, E = w * s.scale, x = b * s.scale, S = Math.min(P / 2 - E / 2, 0), T = Math.min(L / 2 - x / 2, 0), M = -S, C = -T, u = d * s.scale, g = p * s.scale, u < S && (u = S), u > M && (u = M), g < T && (g = T), g > C && (g = C)), m.imageWrapEl.style.transitionDuration = "300ms", m.imageWrapEl.style.transform = `translate3d(${u}px, ${g}px,0)`, m.imageEl.style.transitionDuration = "300ms", m.imageEl.style.transform = `translate3d(0,0,0) scale(${s.scale})`
		}

		function L() {
			const e = t.zoom,
				s = t.params.zoom;
			if (!m.slideEl) {
				t.params.virtual && t.params.virtual.enabled && t.virtual ? m.slideEl = f(t.slidesEl, `.${t.params.slideActiveClass}`)[0] : m.slideEl = t.slides[t.activeIndex];
				let e = m.slideEl.querySelector(`.${s.containerClass}`);
				e && (e = e.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]), m.imageEl = e, m.imageWrapEl = e ? y(m.imageEl, `.${s.containerClass}`)[0] : void 0
			}
			m.imageEl && m.imageWrapEl && (t.params.cssMode && (t.wrapperEl.style.overflow = "", t.wrapperEl.style.touchAction = ""), e.scale = 1, c = 1, m.imageWrapEl.style.transitionDuration = "300ms", m.imageWrapEl.style.transform = "translate3d(0,0,0)", m.imageEl.style.transitionDuration = "300ms", m.imageEl.style.transform = "translate3d(0,0,0) scale(1)", m.slideEl.classList.remove(`${s.zoomedSlideClass}`), m.slideEl = void 0)
		}

		function A(e) {
			const s = t.zoom;
			s.scale && 1 !== s.scale ? L() : P(e)
		}

		function $() {
			return {
				passiveListener: !!t.params.passiveListeners && {
					passive: !0,
					capture: !1
				},
				activeListenerWithCapture: !t.params.passiveListeners || {
					passive: !1,
					capture: !0
				}
			}
		}

		function z() {
			const e = t.zoom;
			if (e.enabled) return;
			e.enabled = !0;
			const {
				passiveListener: s,
				activeListenerWithCapture: a
			} = $();
			t.wrapperEl.addEventListener("pointerdown", x, s), t.wrapperEl.addEventListener("pointermove", S, a), ["pointerup", "pointercancel", "pointerout"].forEach((e => {
				t.wrapperEl.addEventListener(e, T, s)
			})), t.wrapperEl.addEventListener("pointermove", M, a)
		}

		function k() {
			const e = t.zoom;
			if (!e.enabled) return;
			e.enabled = !1;
			const {
				passiveListener: s,
				activeListenerWithCapture: a
			} = $();
			t.wrapperEl.removeEventListener("pointerdown", x, s), t.wrapperEl.removeEventListener("pointermove", S, a), ["pointerup", "pointercancel", "pointerout"].forEach((e => {
				t.wrapperEl.removeEventListener(e, T, s)
			})), t.wrapperEl.removeEventListener("pointermove", M, a)
		}
		Object.defineProperty(t.zoom, "scale", {
			get: () => w,
			set(e) {
				if (w !== e) {
					const t = m.imageEl,
						s = m.slideEl;
					i("zoomChange", e, t, s)
				}
				w = e
			}
		}), a("init", (() => {
			t.params.zoom.enabled && z()
		})), a("destroy", (() => {
			k()
		})), a("touchStart", ((e, s) => {
			t.zoom.enabled && function (e) {
				const s = t.device;
				m.imageEl && (h.isTouched || (s.android && e.cancelable && e.preventDefault(), h.isTouched = !0, h.touchesStart.x = e.pageX, h.touchesStart.y = e.pageY))
			}(s)
		})), a("touchEnd", ((e, s) => {
			t.zoom.enabled && function () {
				const e = t.zoom;
				if (!m.imageEl) return;
				if (!h.isTouched || !h.isMoved) return h.isTouched = !1, void(h.isMoved = !1);
				h.isTouched = !1, h.isMoved = !1;
				let s = 300,
					a = 300;
				const i = g.x * s,
					r = h.currentX + i,
					n = g.y * a,
					l = h.currentY + n;
				0 !== g.x && (s = Math.abs((r - h.currentX) / g.x)), 0 !== g.y && (a = Math.abs((l - h.currentY) / g.y));
				const o = Math.max(s, a);
				h.currentX = r, h.currentY = l;
				const d = h.width * e.scale,
					c = h.height * e.scale;
				h.minX = Math.min(m.slideWidth / 2 - d / 2, 0), h.maxX = -h.minX, h.minY = Math.min(m.slideHeight / 2 - c / 2, 0), h.maxY = -h.minY, h.currentX = Math.max(Math.min(h.currentX, h.maxX), h.minX), h.currentY = Math.max(Math.min(h.currentY, h.maxY), h.minY), m.imageWrapEl.style.transitionDuration = `${o}ms`, m.imageWrapEl.style.transform = `translate3d(${h.currentX}px, ${h.currentY}px,0)`
			}()
		})), a("doubleTap", ((e, s) => {
			!t.animating && t.params.zoom.enabled && t.zoom.enabled && t.params.zoom.toggle && A(s)
		})), a("transitionEnd", (() => {
			t.zoom.enabled && t.params.zoom.enabled && C()
		})), a("slideChange", (() => {
			t.zoom.enabled && t.params.zoom.enabled && t.params.cssMode && C()
		})), Object.assign(t.zoom, {
			enable: z,
			disable: k,
			in: P,
			out: L,
			toggle: A
		})
	}, function (e) {
		let {
			swiper: t,
			extendParams: s,
			on: a
		} = e;

		function i(e, t) {
			const s = function () {
				let e, t, s;
				return (a, i) => {
					for (t = -1, e = a.length; e - t > 1;) s = e + t >> 1, a[s] <= i ? t = s : e = s;
					return e
				}
			}();
			let a, i;
			return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function (e) {
				return e ? (i = s(this.x, e), a = i - 1, (e - this.x[a]) * (this.y[i] - this.y[a]) / (this.x[i] - this.x[a]) + this.y[a]) : 0
			}, this
		}

		function r() {
			t.controller.control && t.controller.spline && (t.controller.spline = void 0, delete t.controller.spline)
		}
		s({
			controller: {
				control: void 0,
				inverse: !1,
				by: "slide"
			}
		}), t.controller = {
			control: void 0
		}, a("beforeInit", (() => {
			if ("undefined" != typeof window && ("string" == typeof t.params.controller.control || t.params.controller.control instanceof HTMLElement)) {
				const e = document.querySelector(t.params.controller.control);
				if (e && e.swiper) t.controller.control = e.swiper;
				else if (e) {
					const s = a => {
						t.controller.control = a.detail[0], t.update(), e.removeEventListener("init", s)
					};
					e.addEventListener("init", s)
				}
			} else t.controller.control = t.params.controller.control
		})), a("update", (() => {
			r()
		})), a("resize", (() => {
			r()
		})), a("observerUpdate", (() => {
			r()
		})), a("setTranslate", ((e, s, a) => {
			t.controller.control && t.controller.setTranslate(s, a)
		})), a("setTransition", ((e, s, a) => {
			t.controller.control && t.controller.setTransition(s, a)
		})), Object.assign(t.controller, {
			setTranslate: function (e, s) {
				const a = t.controller.control;
				let r, n;
				const l = t.constructor;

				function o(e) {
					const s = t.rtlTranslate ? -t.translate : t.translate;
					"slide" === t.params.controller.by && (! function (e) {
						t.controller.spline || (t.controller.spline = t.params.loop ? new i(t.slidesGrid, e.slidesGrid) : new i(t.snapGrid, e.snapGrid))
					}(e), n = -t.controller.spline.interpolate(-s)), n && "container" !== t.params.controller.by || (r = (e.maxTranslate() - e.minTranslate()) / (t.maxTranslate() - t.minTranslate()), n = (s - t.minTranslate()) * r + e.minTranslate()), t.params.controller.inverse && (n = e.maxTranslate() - n), e.updateProgress(n), e.setTranslate(n, t), e.updateActiveIndex(), e.updateSlidesClasses()
				}
				if (Array.isArray(a))
					for (let e = 0; e < a.length; e += 1) a[e] !== s && a[e] instanceof l && o(a[e]);
				else a instanceof l && s !== a && o(a)
			},
			setTransition: function (e, s) {
				const a = t.constructor,
					i = t.controller.control;
				let r;

				function l(s) {
					s.setTransition(e, t), 0 !== e && (s.transitionStart(), s.params.autoHeight && n((() => {
						s.updateAutoHeight()
					})), E(s.wrapperEl, (() => {
						i && s.transitionEnd()
					})))
				}
				if (Array.isArray(i))
					for (r = 0; r < i.length; r += 1) i[r] !== s && i[r] instanceof a && l(i[r]);
				else i instanceof a && s !== i && l(i)
			}
		})
	}, function (e) {
		let {
			swiper: t,
			extendParams: s,
			on: a
		} = e;
		s({
			a11y: {
				enabled: !0,
				notificationClass: "swiper-notification",
				prevSlideMessage: "Previous slide",
				nextSlideMessage: "Next slide",
				firstSlideMessage: "This is the first slide",
				lastSlideMessage: "This is the last slide",
				paginationBulletMessage: "Go to slide {{index}}",
				slideLabelMessage: "{{index}} / {{slidesLength}}",
				containerMessage: null,
				containerRoleDescriptionMessage: null,
				itemRoleDescriptionMessage: null,
				slideRole: "group",
				id: null
			}
		}), t.a11y = {
			clicked: !1
		};
		let i = null;

		function r(e) {
			const t = i;
			0 !== t.length && (t.innerHTML = "", t.innerHTML = e)
		}
		const n = e => (Array.isArray(e) || (e = [e].filter((e => !!e))), e);

		function l(e) {
			(e = n(e)).forEach((e => {
				e.setAttribute("tabIndex", "0")
			}))
		}

		function o(e) {
			(e = n(e)).forEach((e => {
				e.setAttribute("tabIndex", "-1")
			}))
		}

		function d(e, t) {
			(e = n(e)).forEach((e => {
				e.setAttribute("role", t)
			}))
		}

		function c(e, t) {
			(e = n(e)).forEach((e => {
				e.setAttribute("aria-roledescription", t)
			}))
		}

		function p(e, t) {
			(e = n(e)).forEach((e => {
				e.setAttribute("aria-label", t)
			}))
		}

		function u(e) {
			(e = n(e)).forEach((e => {
				e.setAttribute("aria-disabled", !0)
			}))
		}

		function m(e) {
			(e = n(e)).forEach((e => {
				e.setAttribute("aria-disabled", !1)
			}))
		}

		function h(e) {
			if (13 !== e.keyCode && 32 !== e.keyCode) return;
			const s = t.params.a11y,
				a = e.target;
			t.pagination && t.pagination.el && (a === t.pagination.el || t.pagination.el.contains(e.target)) && !e.target.matches(ee(t.params.pagination.bulletClass)) || (t.navigation && t.navigation.nextEl && a === t.navigation.nextEl && (t.isEnd && !t.params.loop || t.slideNext(), t.isEnd ? r(s.lastSlideMessage) : r(s.nextSlideMessage)), t.navigation && t.navigation.prevEl && a === t.navigation.prevEl && (t.isBeginning && !t.params.loop || t.slidePrev(), t.isBeginning ? r(s.firstSlideMessage) : r(s.prevSlideMessage)), t.pagination && a.matches(ee(t.params.pagination.bulletClass)) && a.click())
		}

		function f() {
			return t.pagination && t.pagination.bullets && t.pagination.bullets.length
		}

		function v() {
			return f() && t.params.pagination.clickable
		}
		const w = (e, t, s) => {
				l(e), "BUTTON" !== e.tagName && (d(e, "button"), e.addEventListener("keydown", h)), p(e, s),
					function (e, t) {
						(e = n(e)).forEach((e => {
							e.setAttribute("aria-controls", t)
						}))
					}(e, t)
			},
			y = () => {
				t.a11y.clicked = !0
			},
			E = () => {
				requestAnimationFrame((() => {
					requestAnimationFrame((() => {
						t.destroyed || (t.a11y.clicked = !1)
					}))
				}))
			},
			x = e => {
				if (t.a11y.clicked) return;
				const s = e.target.closest(`.${t.params.slideClass}, swiper-slide`);
				if (!s || !t.slides.includes(s)) return;
				const a = t.slides.indexOf(s) === t.activeIndex,
					i = t.params.watchSlidesProgress && t.visibleSlides && t.visibleSlides.includes(s);
				a || i || e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents || (t.isHorizontal() ? t.el.scrollLeft = 0 : t.el.scrollTop = 0, t.slideTo(t.slides.indexOf(s), 0))
			},
			S = () => {
				const e = t.params.a11y;
				e.itemRoleDescriptionMessage && c(t.slides, e.itemRoleDescriptionMessage), e.slideRole && d(t.slides, e.slideRole);
				const s = t.slides.length;
				e.slideLabelMessage && t.slides.forEach(((a, i) => {
					const r = t.params.loop ? parseInt(a.getAttribute("data-swiper-slide-index"), 10) : i;
					p(a, e.slideLabelMessage.replace(/\{\{index\}\}/, r + 1).replace(/\{\{slidesLength\}\}/, s))
				}))
			},
			T = () => {
				const e = t.params.a11y;
				t.el.append(i);
				const s = t.el;
				e.containerRoleDescriptionMessage && c(s, e.containerRoleDescriptionMessage), e.containerMessage && p(s, e.containerMessage);
				const a = t.wrapperEl,
					r = e.id || a.getAttribute("id") || `swiper-wrapper-${l=16,void 0===l&&(l=16),"x".repeat(l).replace(/x/g,(()=>Math.round(16*Math.random()).toString(16)))}`;
				var l;
				const o = t.params.autoplay && t.params.autoplay.enabled ? "off" : "polite";
				var d;
				d = r, n(a).forEach((e => {
						e.setAttribute("id", d)
					})),
					function (e, t) {
						(e = n(e)).forEach((e => {
							e.setAttribute("aria-live", t)
						}))
					}(a, o), S();
				let {
					nextEl: u,
					prevEl: m
				} = t.navigation ? t.navigation : {};
				if (u = n(u), m = n(m), u && u.forEach((t => w(t, r, e.nextSlideMessage))), m && m.forEach((t => w(t, r, e.prevSlideMessage))), v()) {
					(Array.isArray(t.pagination.el) ? t.pagination.el : [t.pagination.el]).forEach((e => {
						e.addEventListener("keydown", h)
					}))
				}
				t.el.addEventListener("focus", x, !0), t.el.addEventListener("pointerdown", y, !0), t.el.addEventListener("pointerup", E, !0)
			};
		a("beforeInit", (() => {
			i = g("span", t.params.a11y.notificationClass), i.setAttribute("aria-live", "assertive"), i.setAttribute("aria-atomic", "true"), t.isElement && i.setAttribute("slot", "container-end")
		})), a("afterInit", (() => {
			t.params.a11y.enabled && T()
		})), a("slidesLengthChange snapGridLengthChange slidesGridLengthChange", (() => {
			t.params.a11y.enabled && S()
		})), a("fromEdge toEdge afterInit lock unlock", (() => {
			t.params.a11y.enabled && function () {
				if (t.params.loop || t.params.rewind || !t.navigation) return;
				const {
					nextEl: e,
					prevEl: s
				} = t.navigation;
				s && (t.isBeginning ? (u(s), o(s)) : (m(s), l(s))), e && (t.isEnd ? (u(e), o(e)) : (m(e), l(e)))
			}()
		})), a("paginationUpdate", (() => {
			t.params.a11y.enabled && function () {
				const e = t.params.a11y;
				f() && t.pagination.bullets.forEach((s => {
					t.params.pagination.clickable && (l(s), t.params.pagination.renderBullet || (d(s, "button"), p(s, e.paginationBulletMessage.replace(/\{\{index\}\}/, b(s) + 1)))), s.matches(`.${t.params.pagination.bulletActiveClass}`) ? s.setAttribute("aria-current", "true") : s.removeAttribute("aria-current")
				}))
			}()
		})), a("destroy", (() => {
			t.params.a11y.enabled && function () {
				i && i.length > 0 && i.remove();
				let {
					nextEl: e,
					prevEl: s
				} = t.navigation ? t.navigation : {};
				e = n(e), s = n(s), e && e.forEach((e => e.removeEventListener("keydown", h))), s && s.forEach((e => e.removeEventListener("keydown", h))), v() && (Array.isArray(t.pagination.el) ? t.pagination.el : [t.pagination.el]).forEach((e => {
					e.removeEventListener("keydown", h)
				}));
				t.el.removeEventListener("focus", x, !0), t.el.removeEventListener("pointerdown", y, !0), t.el.removeEventListener("pointerup", E, !0)
			}()
		}))
	}, function (e) {
		let {
			swiper: t,
			extendParams: s,
			on: a
		} = e;
		s({
			history: {
				enabled: !1,
				root: "",
				replaceState: !1,
				key: "slides",
				keepQuery: !1
			}
		});
		let i = !1,
			n = {};
		const l = e => e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, ""),
			o = e => {
				const t = r();
				let s;
				s = e ? new URL(e) : t.location;
				const a = s.pathname.slice(1).split("/").filter((e => "" !== e)),
					i = a.length;
				return {
					key: a[i - 2],
					value: a[i - 1]
				}
			},
			d = (e, s) => {
				const a = r();
				if (!i || !t.params.history.enabled) return;
				let n;
				n = t.params.url ? new URL(t.params.url) : a.location;
				const o = t.slides[s];
				let d = l(o.getAttribute("data-history"));
				if (t.params.history.root.length > 0) {
					let s = t.params.history.root;
					"/" === s[s.length - 1] && (s = s.slice(0, s.length - 1)), d = `${s}/${e?`${e}/`:""}${d}`
				} else n.pathname.includes(e) || (d = `${e?`${e}/`:""}${d}`);
				t.params.history.keepQuery && (d += n.search);
				const c = a.history.state;
				c && c.value === d || (t.params.history.replaceState ? a.history.replaceState({
					value: d
				}, null, d) : a.history.pushState({
					value: d
				}, null, d))
			},
			c = (e, s, a) => {
				if (s)
					for (let i = 0, r = t.slides.length; i < r; i += 1) {
						const r = t.slides[i];
						if (l(r.getAttribute("data-history")) === s) {
							const s = t.getSlideIndex(r);
							t.slideTo(s, e, a)
						}
					} else t.slideTo(0, e, a)
			},
			p = () => {
				n = o(t.params.url), c(t.params.speed, n.value, !1)
			};
		a("init", (() => {
			t.params.history.enabled && (() => {
				const e = r();
				if (t.params.history) {
					if (!e.history || !e.history.pushState) return t.params.history.enabled = !1, void(t.params.hashNavigation.enabled = !0);
					i = !0, n = o(t.params.url), n.key || n.value ? (c(0, n.value, t.params.runCallbacksOnInit), t.params.history.replaceState || e.addEventListener("popstate", p)) : t.params.history.replaceState || e.addEventListener("popstate", p)
				}
			})()
		})), a("destroy", (() => {
			t.params.history.enabled && (() => {
				const e = r();
				t.params.history.replaceState || e.removeEventListener("popstate", p)
			})()
		})), a("transitionEnd _freeModeNoMomentumRelease", (() => {
			i && d(t.params.history.key, t.activeIndex)
		})), a("slideChange", (() => {
			i && t.params.cssMode && d(t.params.history.key, t.activeIndex)
		}))
	}, function (e) {
		let {
			swiper: t,
			extendParams: s,
			emit: i,
			on: n
		} = e, l = !1;
		const o = a(),
			d = r();
		s({
			hashNavigation: {
				enabled: !1,
				replaceState: !1,
				watchState: !1
			}
		});
		const c = () => {
				i("hashChange");
				const e = o.location.hash.replace("#", "");
				if (e !== t.slides[t.activeIndex].getAttribute("data-hash")) {
					const s = t.getSlideIndex(f(t.slidesEl, `.${t.params.slideClass}[data-hash="${e}"], swiper-slide[data-hash="${e}"]`)[0]);
					if (void 0 === s) return;
					t.slideTo(s)
				}
			},
			p = () => {
				if (l && t.params.hashNavigation.enabled)
					if (t.params.hashNavigation.replaceState && d.history && d.history.replaceState) d.history.replaceState(null, null, `#${t.slides[t.activeIndex].getAttribute("data-hash")}` || ""), i("hashSet");
					else {
						const e = t.slides[t.activeIndex],
							s = e.getAttribute("data-hash") || e.getAttribute("data-history");
						o.location.hash = s || "", i("hashSet")
					}
			};
		n("init", (() => {
			t.params.hashNavigation.enabled && (() => {
				if (!t.params.hashNavigation.enabled || t.params.history && t.params.history.enabled) return;
				l = !0;
				const e = o.location.hash.replace("#", "");
				if (e) {
					const s = 0;
					for (let a = 0, i = t.slides.length; a < i; a += 1) {
						const i = t.slides[a];
						if ((i.getAttribute("data-hash") || i.getAttribute("data-history")) === e) {
							const e = t.getSlideIndex(i);
							t.slideTo(e, s, t.params.runCallbacksOnInit, !0)
						}
					}
				}
				t.params.hashNavigation.watchState && d.addEventListener("hashchange", c)
			})()
		})), n("destroy", (() => {
			t.params.hashNavigation.enabled && t.params.hashNavigation.watchState && d.removeEventListener("hashchange", c)
		})), n("transitionEnd _freeModeNoMomentumRelease", (() => {
			l && p()
		})), n("slideChange", (() => {
			l && t.params.cssMode && p()
		}))
	}, function (e) {
		let t, s, {
			swiper: i,
			extendParams: r,
			on: n,
			emit: l,
			params: o
		} = e;
		i.autoplay = {
			running: !1,
			paused: !1,
			timeLeft: 0
		}, r({
			autoplay: {
				enabled: !1,
				delay: 3e3,
				waitForTransition: !0,
				disableOnInteraction: !0,
				stopOnLastSlide: !1,
				reverseDirection: !1,
				pauseOnMouseEnter: !1
			}
		});
		let d, c, p, u, m, h, f, g = o && o.autoplay ? o.autoplay.delay : 3e3,
			v = o && o.autoplay ? o.autoplay.delay : 3e3,
			w = (new Date).getTime;

		function b(e) {
			i && !i.destroyed && i.wrapperEl && e.target === i.wrapperEl && (i.wrapperEl.removeEventListener("transitionend", b), M())
		}
		const y = () => {
				if (i.destroyed || !i.autoplay.running) return;
				i.autoplay.paused ? c = !0 : c && (v = d, c = !1);
				const e = i.autoplay.paused ? d : w + v - (new Date).getTime();
				i.autoplay.timeLeft = e, l("autoplayTimeLeft", e, e / g), s = requestAnimationFrame((() => {
					y()
				}))
			},
			E = e => {
				if (i.destroyed || !i.autoplay.running) return;
				cancelAnimationFrame(s), y();
				let a = void 0 === e ? i.params.autoplay.delay : e;
				g = i.params.autoplay.delay, v = i.params.autoplay.delay;
				const r = (() => {
					let e;
					if (e = i.virtual && i.params.virtual.enabled ? i.slides.filter((e => e.classList.contains("swiper-slide-active")))[0] : i.slides[i.activeIndex], !e) return;
					return parseInt(e.getAttribute("data-swiper-autoplay"), 10)
				})();
				!Number.isNaN(r) && r > 0 && void 0 === e && (a = r, g = r, v = r), d = a;
				const n = i.params.speed,
					o = () => {
						i && !i.destroyed && (i.params.autoplay.reverseDirection ? !i.isBeginning || i.params.loop || i.params.rewind ? (i.slidePrev(n, !0, !0), l("autoplay")) : i.params.autoplay.stopOnLastSlide || (i.slideTo(i.slides.length - 1, n, !0, !0), l("autoplay")) : !i.isEnd || i.params.loop || i.params.rewind ? (i.slideNext(n, !0, !0), l("autoplay")) : i.params.autoplay.stopOnLastSlide || (i.slideTo(0, n, !0, !0), l("autoplay")), i.params.cssMode && (w = (new Date).getTime(), requestAnimationFrame((() => {
							E()
						}))))
					};
				return a > 0 ? (clearTimeout(t), t = setTimeout((() => {
					o()
				}), a)) : requestAnimationFrame((() => {
					o()
				})), a
			},
			x = () => {
				i.autoplay.running = !0, E(), l("autoplayStart")
			},
			S = () => {
				i.autoplay.running = !1, clearTimeout(t), cancelAnimationFrame(s), l("autoplayStop")
			},
			T = (e, s) => {
				if (i.destroyed || !i.autoplay.running) return;
				clearTimeout(t), e || (f = !0);
				const a = () => {
					l("autoplayPause"), i.params.autoplay.waitForTransition ? i.wrapperEl.addEventListener("transitionend", b) : M()
				};
				if (i.autoplay.paused = !0, s) return h && (d = i.params.autoplay.delay), h = !1, void a();
				const r = d || i.params.autoplay.delay;
				d = r - ((new Date).getTime() - w), i.isEnd && d < 0 && !i.params.loop || (d < 0 && (d = 0), a())
			},
			M = () => {
				i.isEnd && d < 0 && !i.params.loop || i.destroyed || !i.autoplay.running || (w = (new Date).getTime(), f ? (f = !1, E(d)) : E(), i.autoplay.paused = !1, l("autoplayResume"))
			},
			C = () => {
				if (i.destroyed || !i.autoplay.running) return;
				const e = a();
				"hidden" === e.visibilityState && (f = !0, T(!0)), "visible" === e.visibilityState && M()
			},
			P = e => {
				"mouse" === e.pointerType && (f = !0, T(!0))
			},
			L = e => {
				"mouse" === e.pointerType && i.autoplay.paused && M()
			};
		n("init", (() => {
			i.params.autoplay.enabled && (i.params.autoplay.pauseOnMouseEnter && (i.el.addEventListener("pointerenter", P), i.el.addEventListener("pointerleave", L)), a().addEventListener("visibilitychange", C), w = (new Date).getTime(), x())
		})), n("destroy", (() => {
			i.el.removeEventListener("pointerenter", P), i.el.removeEventListener("pointerleave", L), a().removeEventListener("visibilitychange", C), i.autoplay.running && S()
		})), n("beforeTransitionStart", ((e, t, s) => {
			!i.destroyed && i.autoplay.running && (s || !i.params.autoplay.disableOnInteraction ? T(!0, !0) : S())
		})), n("sliderFirstMove", (() => {
			!i.destroyed && i.autoplay.running && (i.params.autoplay.disableOnInteraction ? S() : (p = !0, u = !1, f = !1, m = setTimeout((() => {
				f = !0, u = !0, T(!0)
			}), 200)))
		})), n("touchEnd", (() => {
			if (!i.destroyed && i.autoplay.running && p) {
				if (clearTimeout(m), clearTimeout(t), i.params.autoplay.disableOnInteraction) return u = !1, void(p = !1);
				u && i.params.cssMode && M(), u = !1, p = !1
			}
		})), n("slideChange", (() => {
			!i.destroyed && i.autoplay.running && (h = !0)
		})), Object.assign(i.autoplay, {
			start: x,
			stop: S,
			pause: T,
			resume: M
		})
	}, function (e) {
		let {
			swiper: t,
			extendParams: s,
			on: i
		} = e;
		s({
			thumbs: {
				swiper: null,
				multipleActiveThumbs: !0,
				autoScrollOffset: 0,
				slideThumbActiveClass: "swiper-slide-thumb-active",
				thumbsContainerClass: "swiper-thumbs"
			}
		});
		let r = !1,
			n = !1;

		function l() {
			const e = t.thumbs.swiper;
			if (!e || e.destroyed) return;
			const s = e.clickedIndex,
				a = e.clickedSlide;
			if (a && a.classList.contains(t.params.thumbs.slideThumbActiveClass)) return;
			if (null == s) return;
			let i;
			i = e.params.loop ? parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10) : s, t.params.loop ? t.slideToLoop(i) : t.slideTo(i)
		}

		function o() {
			const {
				thumbs: e
			} = t.params;
			if (r) return !1;
			r = !0;
			const s = t.constructor;
			if (e.swiper instanceof s) t.thumbs.swiper = e.swiper, Object.assign(t.thumbs.swiper.originalParams, {
				watchSlidesProgress: !0,
				slideToClickedSlide: !1
			}), Object.assign(t.thumbs.swiper.params, {
				watchSlidesProgress: !0,
				slideToClickedSlide: !1
			}), t.thumbs.swiper.update();
			else if (d(e.swiper)) {
				const a = Object.assign({}, e.swiper);
				Object.assign(a, {
					watchSlidesProgress: !0,
					slideToClickedSlide: !1
				}), t.thumbs.swiper = new s(a), n = !0
			}
			return t.thumbs.swiper.el.classList.add(t.params.thumbs.thumbsContainerClass), t.thumbs.swiper.on("tap", l), !0
		}

		function c(e) {
			const s = t.thumbs.swiper;
			if (!s || s.destroyed) return;
			const a = "auto" === s.params.slidesPerView ? s.slidesPerViewDynamic() : s.params.slidesPerView;
			let i = 1;
			const r = t.params.thumbs.slideThumbActiveClass;
			if (t.params.slidesPerView > 1 && !t.params.centeredSlides && (i = t.params.slidesPerView), t.params.thumbs.multipleActiveThumbs || (i = 1), i = Math.floor(i), s.slides.forEach((e => e.classList.remove(r))), s.params.loop || s.params.virtual && s.params.virtual.enabled)
				for (let e = 0; e < i; e += 1) f(s.slidesEl, `[data-swiper-slide-index="${t.realIndex+e}"]`).forEach((e => {
					e.classList.add(r)
				}));
			else
				for (let e = 0; e < i; e += 1) s.slides[t.realIndex + e] && s.slides[t.realIndex + e].classList.add(r);
			const n = t.params.thumbs.autoScrollOffset,
				l = n && !s.params.loop;
			if (t.realIndex !== s.realIndex || l) {
				const i = s.activeIndex;
				let r, o;
				if (s.params.loop) {
					const e = s.slides.filter((e => e.getAttribute("data-swiper-slide-index") === `${t.realIndex}`))[0];
					r = s.slides.indexOf(e), o = t.activeIndex > t.previousIndex ? "next" : "prev"
				} else r = t.realIndex, o = r > t.previousIndex ? "next" : "prev";
				l && (r += "next" === o ? n : -1 * n), s.visibleSlidesIndexes && s.visibleSlidesIndexes.indexOf(r) < 0 && (s.params.centeredSlides ? r = r > i ? r - Math.floor(a / 2) + 1 : r + Math.floor(a / 2) - 1 : r > i && s.params.slidesPerGroup, s.slideTo(r, e ? 0 : void 0))
			}
		}
		t.thumbs = {
			swiper: null
		}, i("beforeInit", (() => {
			const {
				thumbs: e
			} = t.params;
			if (e && e.swiper)
				if ("string" == typeof e.swiper || e.swiper instanceof HTMLElement) {
					const s = a(),
						i = () => {
							const a = "string" == typeof e.swiper ? s.querySelector(e.swiper) : e.swiper;
							if (a && a.swiper) e.swiper = a.swiper, o(), c(!0);
							else if (a) {
								const s = i => {
									e.swiper = i.detail[0], a.removeEventListener("init", s), o(), c(!0), e.swiper.update(), t.update()
								};
								a.addEventListener("init", s)
							}
							return a
						},
						r = () => {
							if (t.destroyed) return;
							i() || requestAnimationFrame(r)
						};
					requestAnimationFrame(r)
				} else o(), c(!0)
		})), i("slideChange update resize observerUpdate", (() => {
			c()
		})), i("setTransition", ((e, s) => {
			const a = t.thumbs.swiper;
			a && !a.destroyed && a.setTransition(s)
		})), i("beforeDestroy", (() => {
			const e = t.thumbs.swiper;
			e && !e.destroyed && n && e.destroy()
		})), Object.assign(t.thumbs, {
			init: o,
			update: c
		})
	}, function (e) {
		let {
			swiper: t,
			extendParams: s,
			emit: a,
			once: i
		} = e;
		s({
			freeMode: {
				enabled: !1,
				momentum: !0,
				momentumRatio: 1,
				momentumBounce: !0,
				momentumBounceRatio: 1,
				momentumVelocityRatio: 1,
				sticky: !1,
				minimumVelocity: .02
			}
		}), Object.assign(t, {
			freeMode: {
				onTouchStart: function () {
					const e = t.getTranslate();
					t.setTranslate(e), t.setTransition(0), t.touchEventsData.velocities.length = 0, t.freeMode.onTouchEnd({
						currentPos: t.rtl ? t.translate : -t.translate
					})
				},
				onTouchMove: function () {
					const {
						touchEventsData: e,
						touches: s
					} = t;
					0 === e.velocities.length && e.velocities.push({
						position: s[t.isHorizontal() ? "startX" : "startY"],
						time: e.touchStartTime
					}), e.velocities.push({
						position: s[t.isHorizontal() ? "currentX" : "currentY"],
						time: l()
					})
				},
				onTouchEnd: function (e) {
					let {
						currentPos: s
					} = e;
					const {
						params: r,
						wrapperEl: n,
						rtlTranslate: o,
						snapGrid: d,
						touchEventsData: c
					} = t, p = l() - c.touchStartTime;
					if (s < -t.minTranslate()) t.slideTo(t.activeIndex);
					else if (s > -t.maxTranslate()) t.slides.length < d.length ? t.slideTo(d.length - 1) : t.slideTo(t.slides.length - 1);
					else {
						if (r.freeMode.momentum) {
							if (c.velocities.length > 1) {
								const e = c.velocities.pop(),
									s = c.velocities.pop(),
									a = e.position - s.position,
									i = e.time - s.time;
								t.velocity = a / i, t.velocity /= 2, Math.abs(t.velocity) < r.freeMode.minimumVelocity && (t.velocity = 0), (i > 150 || l() - e.time > 300) && (t.velocity = 0)
							} else t.velocity = 0;
							t.velocity *= r.freeMode.momentumVelocityRatio, c.velocities.length = 0;
							let e = 1e3 * r.freeMode.momentumRatio;
							const s = t.velocity * e;
							let p = t.translate + s;
							o && (p = -p);
							let u, m = !1;
							const h = 20 * Math.abs(t.velocity) * r.freeMode.momentumBounceRatio;
							let f;
							if (p < t.maxTranslate()) r.freeMode.momentumBounce ? (p + t.maxTranslate() < -h && (p = t.maxTranslate() - h), u = t.maxTranslate(), m = !0, c.allowMomentumBounce = !0) : p = t.maxTranslate(), r.loop && r.centeredSlides && (f = !0);
							else if (p > t.minTranslate()) r.freeMode.momentumBounce ? (p - t.minTranslate() > h && (p = t.minTranslate() + h), u = t.minTranslate(), m = !0, c.allowMomentumBounce = !0) : p = t.minTranslate(), r.loop && r.centeredSlides && (f = !0);
							else if (r.freeMode.sticky) {
								let e;
								for (let t = 0; t < d.length; t += 1)
									if (d[t] > -p) {
										e = t;
										break
									} p = Math.abs(d[e] - p) < Math.abs(d[e - 1] - p) || "next" === t.swipeDirection ? d[e] : d[e - 1], p = -p
							}
							if (f && i("transitionEnd", (() => {
									t.loopFix()
								})), 0 !== t.velocity) {
								if (e = o ? Math.abs((-p - t.translate) / t.velocity) : Math.abs((p - t.translate) / t.velocity), r.freeMode.sticky) {
									const s = Math.abs((o ? -p : p) - t.translate),
										a = t.slidesSizesGrid[t.activeIndex];
									e = s < a ? r.speed : s < 2 * a ? 1.5 * r.speed : 2.5 * r.speed
								}
							} else if (r.freeMode.sticky) return void t.slideToClosest();
							r.freeMode.momentumBounce && m ? (t.updateProgress(u), t.setTransition(e), t.setTranslate(p), t.transitionStart(!0, t.swipeDirection), t.animating = !0, E(n, (() => {
								t && !t.destroyed && c.allowMomentumBounce && (a("momentumBounce"), t.setTransition(r.speed), setTimeout((() => {
									t.setTranslate(u), E(n, (() => {
										t && !t.destroyed && t.transitionEnd()
									}))
								}), 0))
							}))) : t.velocity ? (a("_freeModeNoMomentumRelease"), t.updateProgress(p), t.setTransition(e), t.setTranslate(p), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, E(n, (() => {
								t && !t.destroyed && t.transitionEnd()
							})))) : t.updateProgress(p), t.updateActiveIndex(), t.updateSlidesClasses()
						} else {
							if (r.freeMode.sticky) return void t.slideToClosest();
							r.freeMode && a("_freeModeNoMomentumRelease")
						}(!r.freeMode.momentum || p >= r.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
					}
				}
			}
		})
	}, function (e) {
		let t, s, a, {
			swiper: i,
			extendParams: r
		} = e;
		r({
			grid: {
				rows: 1,
				fill: "column"
			}
		}), i.grid = {
			initSlides: e => {
				const {
					slidesPerView: r
				} = i.params, {
					rows: n,
					fill: l
				} = i.params.grid;
				s = t / n, a = Math.floor(e / n), t = Math.floor(e / n) === e / n ? e : Math.ceil(e / n) * n, "auto" !== r && "row" === l && (t = Math.max(t, r * n))
			},
			updateSlide: (e, r, n, l) => {
				const {
					slidesPerGroup: o,
					spaceBetween: d
				} = i.params, {
					rows: c,
					fill: p
				} = i.params.grid;
				let u, m, h;
				if ("row" === p && o > 1) {
					const s = Math.floor(e / (o * c)),
						a = e - c * o * s,
						i = 0 === s ? o : Math.min(Math.ceil((n - s * c * o) / c), o);
					h = Math.floor(a / i), m = a - h * i + s * o, u = m + h * t / c, r.style.order = u
				} else "column" === p ? (m = Math.floor(e / c), h = e - m * c, (m > a || m === a && h === c - 1) && (h += 1, h >= c && (h = 0, m += 1))) : (h = Math.floor(e / s), m = e - h * s);
				r.style[l("margin-top")] = 0 !== h ? d && `${d}px` : ""
			},
			updateWrapperSize: (e, s, a) => {
				const {
					spaceBetween: r,
					centeredSlides: n,
					roundLengths: l
				} = i.params, {
					rows: o
				} = i.params.grid;
				if (i.virtualSize = (e + r) * t, i.virtualSize = Math.ceil(i.virtualSize / o) - r, i.wrapperEl.style[a("width")] = `${i.virtualSize+r}px`, n) {
					const e = [];
					for (let t = 0; t < s.length; t += 1) {
						let a = s[t];
						l && (a = Math.floor(a)), s[t] < i.virtualSize + s[0] && e.push(a)
					}
					s.splice(0, s.length), s.push(...e)
				}
			}
		}
	}, function (e) {
		let {
			swiper: t
		} = e;
		Object.assign(t, {
			appendSlide: te.bind(t),
			prependSlide: se.bind(t),
			addSlide: ae.bind(t),
			removeSlide: ie.bind(t),
			removeAllSlides: re.bind(t)
		})
	}, function (e) {
		let {
			swiper: t,
			extendParams: s,
			on: a
		} = e;
		s({
			fadeEffect: {
				crossFade: !1
			}
		}), ne({
			effect: "fade",
			swiper: t,
			on: a,
			setTranslate: () => {
				const {
					slides: e
				} = t;
				t.params.fadeEffect;
				for (let s = 0; s < e.length; s += 1) {
					const e = t.slides[s];
					let a = -e.swiperSlideOffset;
					t.params.virtualTranslate || (a -= t.translate);
					let i = 0;
					t.isHorizontal() || (i = a, a = 0);
					const r = t.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(e.progress), 0) : 1 + Math.min(Math.max(e.progress, -1), 0),
						n = le(0, e);
					n.style.opacity = r, n.style.transform = `translate3d(${a}px, ${i}px, 0px)`
				}
			},
			setTransition: e => {
				const s = t.slides.map((e => h(e)));
				s.forEach((t => {
					t.style.transitionDuration = `${e}ms`
				})), oe({
					swiper: t,
					duration: e,
					transformElements: s,
					allSlides: !0
				})
			},
			overwriteParams: () => ({
				slidesPerView: 1,
				slidesPerGroup: 1,
				watchSlidesProgress: !0,
				spaceBetween: 0,
				virtualTranslate: !t.params.cssMode
			})
		})
	}, function (e) {
		let {
			swiper: t,
			extendParams: s,
			on: a
		} = e;
		s({
			cubeEffect: {
				slideShadows: !0,
				shadow: !0,
				shadowOffset: 20,
				shadowScale: .94
			}
		});
		const i = (e, t, s) => {
			let a = s ? e.querySelector(".swiper-slide-shadow-left") : e.querySelector(".swiper-slide-shadow-top"),
				i = s ? e.querySelector(".swiper-slide-shadow-right") : e.querySelector(".swiper-slide-shadow-bottom");
			a || (a = g("div", "swiper-slide-shadow-" + (s ? "left" : "top")), e.append(a)), i || (i = g("div", "swiper-slide-shadow-" + (s ? "right" : "bottom")), e.append(i)), a && (a.style.opacity = Math.max(-t, 0)), i && (i.style.opacity = Math.max(t, 0))
		};
		ne({
			effect: "cube",
			swiper: t,
			on: a,
			setTranslate: () => {
				const {
					el: e,
					wrapperEl: s,
					slides: a,
					width: r,
					height: n,
					rtlTranslate: l,
					size: o,
					browser: d
				} = t, c = t.params.cubeEffect, p = t.isHorizontal(), u = t.virtual && t.params.virtual.enabled;
				let m, h = 0;
				c.shadow && (p ? (m = t.slidesEl.querySelector(".swiper-cube-shadow"), m || (m = g("div", "swiper-cube-shadow"), t.slidesEl.append(m)), m.style.height = `${r}px`) : (m = e.querySelector(".swiper-cube-shadow"), m || (m = g("div", "swiper-cube-shadow"), e.append(m))));
				for (let e = 0; e < a.length; e += 1) {
					const t = a[e];
					let s = e;
					u && (s = parseInt(t.getAttribute("data-swiper-slide-index"), 10));
					let r = 90 * s,
						n = Math.floor(r / 360);
					l && (r = -r, n = Math.floor(-r / 360));
					const d = Math.max(Math.min(t.progress, 1), -1);
					let m = 0,
						f = 0,
						g = 0;
					s % 4 == 0 ? (m = 4 * -n * o, g = 0) : (s - 1) % 4 == 0 ? (m = 0, g = 4 * -n * o) : (s - 2) % 4 == 0 ? (m = o + 4 * n * o, g = o) : (s - 3) % 4 == 0 && (m = -o, g = 3 * o + 4 * o * n), l && (m = -m), p || (f = m, m = 0);
					const v = `rotateX(${p?0:-r}deg) rotateY(${p?r:0}deg) translate3d(${m}px, ${f}px, ${g}px)`;
					d <= 1 && d > -1 && (h = 90 * s + 90 * d, l && (h = 90 * -s - 90 * d)), t.style.transform = v, c.slideShadows && i(t, d, p)
				}
				if (s.style.transformOrigin = `50% 50% -${o/2}px`, s.style["-webkit-transform-origin"] = `50% 50% -${o/2}px`, c.shadow)
					if (p) m.style.transform = `translate3d(0px, ${r/2+c.shadowOffset}px, ${-r/2}px) rotateX(90deg) rotateZ(0deg) scale(${c.shadowScale})`;
					else {
						const e = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90),
							t = 1.5 - (Math.sin(2 * e * Math.PI / 360) / 2 + Math.cos(2 * e * Math.PI / 360) / 2),
							s = c.shadowScale,
							a = c.shadowScale / t,
							i = c.shadowOffset;
						m.style.transform = `scale3d(${s}, 1, ${a}) translate3d(0px, ${n/2+i}px, ${-n/2/a}px) rotateX(-90deg)`
					} const f = (d.isSafari || d.isWebView) && d.needPerspectiveFix ? -o / 2 : 0;
				s.style.transform = `translate3d(0px,0,${f}px) rotateX(${t.isHorizontal()?0:h}deg) rotateY(${t.isHorizontal()?-h:0}deg)`, s.style.setProperty("--swiper-cube-translate-z", `${f}px`)
			},
			setTransition: e => {
				const {
					el: s,
					slides: a
				} = t;
				if (a.forEach((t => {
						t.style.transitionDuration = `${e}ms`, t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t => {
							t.style.transitionDuration = `${e}ms`
						}))
					})), t.params.cubeEffect.shadow && !t.isHorizontal()) {
					const t = s.querySelector(".swiper-cube-shadow");
					t && (t.style.transitionDuration = `${e}ms`)
				}
			},
			recreateShadows: () => {
				const e = t.isHorizontal();
				t.slides.forEach((t => {
					const s = Math.max(Math.min(t.progress, 1), -1);
					i(t, s, e)
				}))
			},
			getEffectParams: () => t.params.cubeEffect,
			perspective: () => !0,
			overwriteParams: () => ({
				slidesPerView: 1,
				slidesPerGroup: 1,
				watchSlidesProgress: !0,
				resistanceRatio: 0,
				spaceBetween: 0,
				centeredSlides: !1,
				virtualTranslate: !0
			})
		})
	}, function (e) {
		let {
			swiper: t,
			extendParams: s,
			on: a
		} = e;
		s({
			flipEffect: {
				slideShadows: !0,
				limitRotation: !0
			}
		});
		const i = (e, s, a) => {
			let i = t.isHorizontal() ? e.querySelector(".swiper-slide-shadow-left") : e.querySelector(".swiper-slide-shadow-top"),
				r = t.isHorizontal() ? e.querySelector(".swiper-slide-shadow-right") : e.querySelector(".swiper-slide-shadow-bottom");
			i || (i = de(0, e, t.isHorizontal() ? "left" : "top")), r || (r = de(0, e, t.isHorizontal() ? "right" : "bottom")), i && (i.style.opacity = Math.max(-s, 0)), r && (r.style.opacity = Math.max(s, 0))
		};
		ne({
			effect: "flip",
			swiper: t,
			on: a,
			setTranslate: () => {
				const {
					slides: e,
					rtlTranslate: s
				} = t, a = t.params.flipEffect;
				for (let r = 0; r < e.length; r += 1) {
					const n = e[r];
					let l = n.progress;
					t.params.flipEffect.limitRotation && (l = Math.max(Math.min(n.progress, 1), -1));
					const o = n.swiperSlideOffset;
					let d = -180 * l,
						c = 0,
						p = t.params.cssMode ? -o - t.translate : -o,
						u = 0;
					t.isHorizontal() ? s && (d = -d) : (u = p, p = 0, c = -d, d = 0), n.style.zIndex = -Math.abs(Math.round(l)) + e.length, a.slideShadows && i(n, l);
					const m = `translate3d(${p}px, ${u}px, 0px) rotateX(${c}deg) rotateY(${d}deg)`;
					le(0, n).style.transform = m
				}
			},
			setTransition: e => {
				const s = t.slides.map((e => h(e)));
				s.forEach((t => {
					t.style.transitionDuration = `${e}ms`, t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t => {
						t.style.transitionDuration = `${e}ms`
					}))
				})), oe({
					swiper: t,
					duration: e,
					transformElements: s
				})
			},
			recreateShadows: () => {
				t.params.flipEffect;
				t.slides.forEach((e => {
					let s = e.progress;
					t.params.flipEffect.limitRotation && (s = Math.max(Math.min(e.progress, 1), -1)), i(e, s)
				}))
			},
			getEffectParams: () => t.params.flipEffect,
			perspective: () => !0,
			overwriteParams: () => ({
				slidesPerView: 1,
				slidesPerGroup: 1,
				watchSlidesProgress: !0,
				spaceBetween: 0,
				virtualTranslate: !t.params.cssMode
			})
		})
	}, function (e) {
		let {
			swiper: t,
			extendParams: s,
			on: a
		} = e;
		s({
			coverflowEffect: {
				rotate: 50,
				stretch: 0,
				depth: 100,
				scale: 1,
				modifier: 1,
				slideShadows: !0
			}
		}), ne({
			effect: "coverflow",
			swiper: t,
			on: a,
			setTranslate: () => {
				const {
					width: e,
					height: s,
					slides: a,
					slidesSizesGrid: i
				} = t, r = t.params.coverflowEffect, n = t.isHorizontal(), l = t.translate, o = n ? e / 2 - l : s / 2 - l, d = n ? r.rotate : -r.rotate, c = r.depth;
				for (let e = 0, t = a.length; e < t; e += 1) {
					const t = a[e],
						s = i[e],
						l = (o - t.swiperSlideOffset - s / 2) / s,
						p = "function" == typeof r.modifier ? r.modifier(l) : l * r.modifier;
					let u = n ? d * p : 0,
						m = n ? 0 : d * p,
						h = -c * Math.abs(p),
						f = r.stretch;
					"string" == typeof f && -1 !== f.indexOf("%") && (f = parseFloat(r.stretch) / 100 * s);
					let g = n ? 0 : f * p,
						v = n ? f * p : 0,
						w = 1 - (1 - r.scale) * Math.abs(p);
					Math.abs(v) < .001 && (v = 0), Math.abs(g) < .001 && (g = 0), Math.abs(h) < .001 && (h = 0), Math.abs(u) < .001 && (u = 0), Math.abs(m) < .001 && (m = 0), Math.abs(w) < .001 && (w = 0);
					const b = `translate3d(${v}px,${g}px,${h}px)  rotateX(${m}deg) rotateY(${u}deg) scale(${w})`;
					if (le(0, t).style.transform = b, t.style.zIndex = 1 - Math.abs(Math.round(p)), r.slideShadows) {
						let e = n ? t.querySelector(".swiper-slide-shadow-left") : t.querySelector(".swiper-slide-shadow-top"),
							s = n ? t.querySelector(".swiper-slide-shadow-right") : t.querySelector(".swiper-slide-shadow-bottom");
						e || (e = de(0, t, n ? "left" : "top")), s || (s = de(0, t, n ? "right" : "bottom")), e && (e.style.opacity = p > 0 ? p : 0), s && (s.style.opacity = -p > 0 ? -p : 0)
					}
				}
			},
			setTransition: e => {
				t.slides.map((e => h(e))).forEach((t => {
					t.style.transitionDuration = `${e}ms`, t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t => {
						t.style.transitionDuration = `${e}ms`
					}))
				}))
			},
			perspective: () => !0,
			overwriteParams: () => ({
				watchSlidesProgress: !0
			})
		})
	}, function (e) {
		let {
			swiper: t,
			extendParams: s,
			on: a
		} = e;
		s({
			creativeEffect: {
				limitProgress: 1,
				shadowPerProgress: !1,
				progressMultiplier: 1,
				perspective: !0,
				prev: {
					translate: [0, 0, 0],
					rotate: [0, 0, 0],
					opacity: 1,
					scale: 1
				},
				next: {
					translate: [0, 0, 0],
					rotate: [0, 0, 0],
					opacity: 1,
					scale: 1
				}
			}
		});
		const i = e => "string" == typeof e ? e : `${e}px`;
		ne({
			effect: "creative",
			swiper: t,
			on: a,
			setTranslate: () => {
				const {
					slides: e,
					wrapperEl: s,
					slidesSizesGrid: a
				} = t, r = t.params.creativeEffect, {
					progressMultiplier: n
				} = r, l = t.params.centeredSlides;
				if (l) {
					const e = a[0] / 2 - t.params.slidesOffsetBefore || 0;
					s.style.transform = `translateX(calc(50% - ${e}px))`
				}
				for (let s = 0; s < e.length; s += 1) {
					const a = e[s],
						o = a.progress,
						d = Math.min(Math.max(a.progress, -r.limitProgress), r.limitProgress);
					let c = d;
					l || (c = Math.min(Math.max(a.originalProgress, -r.limitProgress), r.limitProgress));
					const p = a.swiperSlideOffset,
						u = [t.params.cssMode ? -p - t.translate : -p, 0, 0],
						m = [0, 0, 0];
					let h = !1;
					t.isHorizontal() || (u[1] = u[0], u[0] = 0);
					let f = {
						translate: [0, 0, 0],
						rotate: [0, 0, 0],
						scale: 1,
						opacity: 1
					};
					d < 0 ? (f = r.next, h = !0) : d > 0 && (f = r.prev, h = !0), u.forEach(((e, t) => {
						u[t] = `calc(${e}px + (${i(f.translate[t])} * ${Math.abs(d*n)}))`
					})), m.forEach(((e, t) => {
						m[t] = f.rotate[t] * Math.abs(d * n)
					})), a.style.zIndex = -Math.abs(Math.round(o)) + e.length;
					const g = u.join(", "),
						v = `rotateX(${m[0]}deg) rotateY(${m[1]}deg) rotateZ(${m[2]}deg)`,
						w = c < 0 ? `scale(${1+(1-f.scale)*c*n})` : `scale(${1-(1-f.scale)*c*n})`,
						b = c < 0 ? 1 + (1 - f.opacity) * c * n : 1 - (1 - f.opacity) * c * n,
						y = `translate3d(${g}) ${v} ${w}`;
					if (h && f.shadow || !h) {
						let e = a.querySelector(".swiper-slide-shadow");
						if (!e && f.shadow && (e = de(0, a)), e) {
							const t = r.shadowPerProgress ? d * (1 / r.limitProgress) : d;
							e.style.opacity = Math.min(Math.max(Math.abs(t), 0), 1)
						}
					}
					const E = le(0, a);
					E.style.transform = y, E.style.opacity = b, f.origin && (E.style.transformOrigin = f.origin)
				}
			},
			setTransition: e => {
				const s = t.slides.map((e => h(e)));
				s.forEach((t => {
					t.style.transitionDuration = `${e}ms`, t.querySelectorAll(".swiper-slide-shadow").forEach((t => {
						t.style.transitionDuration = `${e}ms`
					}))
				})), oe({
					swiper: t,
					duration: e,
					transformElements: s,
					allSlides: !0
				})
			},
			perspective: () => t.params.creativeEffect.perspective,
			overwriteParams: () => ({
				watchSlidesProgress: !0,
				virtualTranslate: !t.params.cssMode
			})
		})
	}, function (e) {
		let {
			swiper: t,
			extendParams: s,
			on: a
		} = e;
		s({
			cardsEffect: {
				slideShadows: !0,
				rotate: !0,
				perSlideRotate: 2,
				perSlideOffset: 8
			}
		}), ne({
			effect: "cards",
			swiper: t,
			on: a,
			setTranslate: () => {
				const {
					slides: e,
					activeIndex: s
				} = t, a = t.params.cardsEffect, {
					startTranslate: i,
					isTouched: r
				} = t.touchEventsData, n = t.translate;
				for (let l = 0; l < e.length; l += 1) {
					const o = e[l],
						d = o.progress,
						c = Math.min(Math.max(d, -4), 4);
					let p = o.swiperSlideOffset;
					t.params.centeredSlides && !t.params.cssMode && (t.wrapperEl.style.transform = `translateX(${t.minTranslate()}px)`), t.params.centeredSlides && t.params.cssMode && (p -= e[0].swiperSlideOffset);
					let u = t.params.cssMode ? -p - t.translate : -p,
						m = 0;
					const h = -100 * Math.abs(c);
					let f = 1,
						g = -a.perSlideRotate * c,
						v = a.perSlideOffset - .75 * Math.abs(c);
					const w = t.virtual && t.params.virtual.enabled ? t.virtual.from + l : l,
						b = (w === s || w === s - 1) && c > 0 && c < 1 && (r || t.params.cssMode) && n < i,
						y = (w === s || w === s + 1) && c < 0 && c > -1 && (r || t.params.cssMode) && n > i;
					if (b || y) {
						const e = (1 - Math.abs((Math.abs(c) - .5) / .5)) ** .5;
						g += -28 * c * e, f += -.5 * e, v += 96 * e, m = -25 * e * Math.abs(c) + "%"
					}
					if (u = c < 0 ? `calc(${u}px + (${v*Math.abs(c)}%))` : c > 0 ? `calc(${u}px + (-${v*Math.abs(c)}%))` : `${u}px`, !t.isHorizontal()) {
						const e = m;
						m = u, u = e
					}
					const E = c < 0 ? "" + (1 + (1 - f) * c) : "" + (1 - (1 - f) * c),
						x = `\n        translate3d(${u}, ${m}, ${h}px)\n        rotateZ(${a.rotate?g:0}deg)\n        scale(${E})\n      `;
					if (a.slideShadows) {
						let e = o.querySelector(".swiper-slide-shadow");
						e || (e = de(0, o)), e && (e.style.opacity = Math.min(Math.max((Math.abs(c) - .5) / .5, 0), 1))
					}
					o.style.zIndex = -Math.abs(Math.round(d)) + e.length;
					le(0, o).style.transform = x
				}
			},
			setTransition: e => {
				const s = t.slides.map((e => h(e)));
				s.forEach((t => {
					t.style.transitionDuration = `${e}ms`, t.querySelectorAll(".swiper-slide-shadow").forEach((t => {
						t.style.transitionDuration = `${e}ms`
					}))
				})), oe({
					swiper: t,
					duration: e,
					transformElements: s
				})
			},
			perspective: () => !0,
			overwriteParams: () => ({
				watchSlidesProgress: !0,
				virtualTranslate: !t.params.cssMode
			})
		})
	}];
	return Q.use(ce), Q
}));
//# sourceMappingURL=swiper-bundle.min.js.map