import { isValidURL } from "./isValidURL"

const tests = [
  {
    name: "Return true for valid URL string",
    input: "https://www.google.com/?zx=1770258603081&no_sw_cr=1",
    expected: true
  },
  {
    name: "File Transfer Protocol",
    input: "ftp://example.com",
    expected: true
  },
  {
    name: "WebSocket Secure Protocol",
    input: "wss://example.com",
    expected: true
  },
  {
    name: "Email Protocol",
    input: "mailto://johnpork@yahoo.com",
    expected: true
  },
  {
    name: "Torrent Protocol",
    input:
      "magnet:?xt=urn:btih:6D5B5F0E8E6E4F5D8B7A9C1E2D3F4A5B6C7D8E9F&dn=example-file.zip&tr=udp://tracker.example.com:6969/announce",
    expected: true
  },
  {
    name: "Missing protocol",
    input: "example.com",
    expected: false
  },
  {
    name: "Fake protocol",
    input: "htp://example.com",
    expected: false
  },
  {
    name: "Space in domain name",
    input: "https://example .com",
    expected: false
  },
  {
    name: "Space in domain",
    input: "https://exam ple.com/path",
    expected: false
  },
  {
    name: "No colon after protocol",
    input: "ftp//example.com",
    expected: false
  },
  {
    name: "Missing one slash",
    input: "https:/example.com",
    expected: false
  },
  {
    name: "Extra slash",
    input: "https:///example.com",
    expected: false
  },
  {
    name: "Non-numeric port",
    input: "https://exam[ple].com",
    expected: false
  },
  {
    name: "Unencoded spaces in path",
    input: "https://example.com/path with spaces",
    expected: false
  }
]

describe("Is Valid URL", () => {
  tests.forEach((config) => {
    it(config.name, () => {
      expect(isValidURL(config.input)).toBe(config.expected)
    })
  })
})
