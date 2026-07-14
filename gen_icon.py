import struct, zlib

def make_png(w, h, r, g, b):
    raw = b''
    for y in range(h):
        raw += b'\x00'
        raw += bytes([r, g, b] * w)
    ihdr = struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0)
    compressed = zlib.compress(raw)
    def chunk(ctype, data):
        c = ctype + data
        return struct.pack('>I', len(data)) + c + struct.pack('>I', zlib.crc32(c) & 0xffffffff)
    return b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', ihdr) + chunk(b'IDAT', compressed) + chunk(b'IEND', b'')

with open('E:/code/myAiPro/pinyin/www/img/icon.png', 'wb') as f:
    f.write(make_png(192, 192, 102, 126, 234))
print('ok')
