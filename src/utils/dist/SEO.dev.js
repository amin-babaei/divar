"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SEO = void 0;

var _react = require("react");

var SEO = function SEO(_ref) {
  var title = _ref.title,
      description = _ref.description,
      ogUrl = _ref.ogUrl,
      _ref$ogType = _ref.ogType,
      ogType = _ref$ogType === void 0 ? "website" : _ref$ogType,
      ogTitle = _ref.ogTitle,
      ogDescription = _ref.ogDescription,
      ogImage = _ref.ogImage,
      _ref$twitterCard = _ref.twitterCard,
      twitterCard = _ref$twitterCard === void 0 ? "summary_large_image" : _ref$twitterCard,
      _ref$pageType = _ref.pageType,
      pageType = _ref$pageType === void 0 ? "public" : _ref$pageType;
  (0, _react.useEffect)(function () {
    if (title) document.title = title;

    var setMeta = function setMeta(name, content) {
      var attr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "name";
      if (!content) return;
      var element = document.querySelector("meta[".concat(attr, "=\"").concat(name, "\"]"));

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:url", ogUrl, "property");
    setMeta("og:type", ogType, "property");
    setMeta("og:title", ogTitle || title, "property");
    setMeta("og:description", ogDescription || description, "property");
    setMeta("og:image", ogImage, "property");
    setMeta("twitter:card", twitterCard);
    setMeta("twitter:title", ogTitle || title);
    setMeta("twitter:description", ogDescription || description);
    setMeta("twitter:image", ogImage);

    if (pageType === "public") {
      setMeta("robots", "index, follow");
    } else {
      setMeta("robots", "noindex, nofollow");
    }
  }, [title, description, ogUrl, ogType, ogTitle, ogDescription, ogImage, twitterCard, pageType]);
  return null;
};

exports.SEO = SEO;