"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Configuration = require("./Configuration");

var _FacetSearchResponseAdapter = require("./FacetSearchResponseAdapter");

var axios = require("axios");

var AnvereInstantsearchAdapter = /*#__PURE__*/function () {
  function AnvereInstantsearchAdapter(options) {
    var _this = this;

    (0, _classCallCheck2["default"])(this, AnvereInstantsearchAdapter);
    this.configuration = new _Configuration.Configuration(options);
    this.configuration.validate();
    this.searchClient = {
      search: function search(instantsearchRequests) {
        return _this.searchAnvereAndAdapt(instantsearchRequests);
      },
      searchForFacetValues: function searchForFacetValues(instantsearchRequests) {
        return _this.searchAnvereForFacetValuesAndAdapt(instantsearchRequests);
      }
    };
  }

  (0, _createClass2["default"])(AnvereInstantsearchAdapter, [{
    key: "adaptAndPerformAnvereRequest",
    value: function () {
      var _adaptAndPerformAnvereRequest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(instantsearchRequests) {
        var server, nodes, applicationId, anvereUrlWithParams, anvereResponse;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                server = this.configuration.server;
                nodes = server.nodes;
                applicationId = nodes[0].applicationId;
                anvereUrlWithParams = new URL("".concat(nodes[0].protocol, "://").concat(nodes[0].host, "/docs"));
                anvereUrlWithParams.searchParams.set("app_id", applicationId);
                anvereUrlWithParams.searchParams.set("index_id", instantsearchRequests[0].indexName);
                anvereUrlWithParams.searchParams.set("input", instantsearchRequests[0].params.query);
                anvereUrlWithParams.searchParams.set("highlight", "true");
                anvereUrlWithParams.searchParams.set("page", instantsearchRequests[0].params.page);
                anvereUrlWithParams.searchParams.set("page_size", instantsearchRequests[0].params.hitsPerPage);
                _context.next = 12;
                return axios.get(anvereUrlWithParams.href);

              case 12:
                anvereResponse = _context.sent;
                return _context.abrupt("return", anvereResponse.data);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function adaptAndPerformAnvereRequest(_x) {
        return _adaptAndPerformAnvereRequest.apply(this, arguments);
      }

      return adaptAndPerformAnvereRequest;
    }()
  }, {
    key: "searchAnvereAndAdapt",
    value: function () {
      var _searchAnvereAndAdapt = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(instantsearchRequests) {
        var anvereResponse;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.adaptAndPerformAnvereRequest(instantsearchRequests);

              case 3:
                anvereResponse = _context2.sent;
                return _context2.abrupt("return", {
                  results: [anvereResponse]
                });

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function searchAnvereAndAdapt(_x2) {
        return _searchAnvereAndAdapt.apply(this, arguments);
      }

      return searchAnvereAndAdapt;
    }()
  }, {
    key: "searchAnvereForFacetValuesAndAdapt",
    value: function () {
      var _searchAnvereForFacetValuesAndAdapt = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(instantsearchRequests) {
        var _this2 = this;

        var typesenseResponse, adaptedResponses;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this._adaptAndPerformTypesenseRequest(instantsearchRequests);

              case 3:
                typesenseResponse = _context3.sent;
                adaptedResponses = typesenseResponse.results.map(function (typesenseResult, index) {
                  _this2._validateTypesenseResult(typesenseResult);

                  var responseAdapter = new _FacetSearchResponseAdapter.FacetSearchResponseAdapter(typesenseResult, instantsearchRequests[index], _this2.configuration);
                  return responseAdapter.adapt();
                });
                return _context3.abrupt("return", adaptedResponses);

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);
                console.error(_context3.t0);
                throw _context3.t0;

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 8]]);
      }));

      function searchAnvereForFacetValuesAndAdapt(_x3) {
        return _searchAnvereForFacetValuesAndAdapt.apply(this, arguments);
      }

      return searchAnvereForFacetValuesAndAdapt;
    }()
  }, {
    key: "_validateTypesenseResult",
    value: function _validateTypesenseResult(typesenseResult) {
      if (typesenseResult.error) {
        throw new Error("".concat(typesenseResult.code, " - ").concat(typesenseResult.error));
      }

      if (!typesenseResult.hits && !typesenseResult.grouped_hits) {
        throw new Error("Did not find any hits. ".concat(typesenseResult.code, " - ").concat(typesenseResult.error));
      }
    }
  }]);
  return AnvereInstantsearchAdapter;
}();

exports["default"] = AnvereInstantsearchAdapter;
//# sourceMappingURL=AnvereInstantsearchAdapter.js.map