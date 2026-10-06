import { isValidURL } from "./isValidURL"

interface Test {
  name: string
  input: string
  expected: boolean
}

const tests: Test[] = [
  {
    name: "Return true for valid URL string",
    input: "https://touch-grass.tech/",
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
    input: "67://example.com",
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
    expected: true
  },
  {
    name: "Extra slash",
    input: "https:////////////////example.com",
    expected: true
  },
  {
    name: "Non-numeric port",
    input: "https://exam[ple].com",
    expected: false
  },
  {
    name: "Unencoded spaces in path",
    input: "https://tungtungtung.com/path with spaces",
    expected: true
  }
]

describe("TS function IsValidURL", () => {
  tests.forEach((config) => {
    it(config.name, () => {
      expect(isValidURL(config.input)).toBe(config.expected)
    })
  })
})
