function RGBToHEX(r, g, b) {
    const padZero = num => ("00" + num.toString(16)).substr(-2, 2)
    return `#${padZero(r)}${padZero(g)}${padZero(b)}`
}

function HEXToRGB(hex) {
    const sliced = hex.slice(1)
    return [
        parseInt(sliced.slice(0, 2), 16),
        parseInt(sliced.slice(2, 4), 16),
        parseInt(sliced.slice(4, 6), 16)
    ]
}

function RGBToHSL(r, g, b) {
    r /= 255
    g /= 255
    b /= 255

    const cmin = Math.min(r, g, b)
    const cmax = Math.max(r, g, b)
    const delta = cmax - cmin

    let h = 0, s = 0, l = 0

    if (delta === 0)
        h = 0
    else if (cmax === r)
        h = ((g - b) / delta) % 6
    else if (cmax === g)
        h = (b - r) / delta + 2
    else
        h = (r - g) / delta + 4

    h = Math.round(h * 60)

    if (h < 0)
        h += 360

    l = (cmax + cmin) / 2
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

    s = +(s * 100).toFixed(1)
    l = +(l * 100).toFixed(1)

    return [h, s, l]
}

function HSLToRGB(h, s, l) {
    s /= 100
    l /= 100

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return [r, g, b]
}

function complement(r, g, b) {
    let [h, s, l] = RGBToHSL(r, g, b)
    return HSLToRGB((h + 180) % 360, s, l)
}

function dist(c1, c2) {
    return Math.sqrt(Math.pow((c1[0] - c2[0]), 2) + Math.pow((c1[1] - c2[1]), 2), Math.pow((c1[2] - c2[2]), 2))
}

function compScore(rgb1, rgb2) {
    const comp = complement(...rgb1)
    const maxDist = dist(comp, [0, 0, 0])

    return Math.round((1 - dist(comp, rgb2) / maxDist) * 100)
}

function monoScore(rgb1, rgb2) {
    const hsl1 = RGBToHSL(...rgb1)
    const hsl2 = RGBToHSL(...rgb2)
    const maxDist = dist([hsl1[0], 0, hsl1[2]], [0, 0, 0])

    return Math.round((1 - dist([hsl1[0], 0, hsl1[2]], [hsl2[0], 0, hsl2[2]]) / maxDist) * 100)
}

/**
 * Returns the color match score of two rgb colors
 * @param {string|Number[]} rgb1 hex representation of color(containing pound sign) OR an array containing integer values of R, G, B respectively
 * @param {string|Number[]} rgb2 hex representation of color(containing pound sign) OR an array containing integer values of R, G, B respectively
 */
export default function colorMatchScore(rgb1, rgb2) {
    if (!Array.isArray(rgb1) && typeof rgb1 === 'string')
        rgb1 = HEXToRGB(rgb1)

    if (!Array.isArray(rgb2) && typeof rgb2 === 'string')
        rgb2 = HEXToRGB(rgb2)

    const comp = compScore(rgb1, rgb2)
    const mono = monoScore(rgb1, rgb2)
    return Math.max(comp, mono)
}
