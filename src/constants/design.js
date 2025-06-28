const COLORS = {
    DARK: 0x1A1F22,
    LIGHT: 0xDCD3CC,
    EMPH1: 0x00FFFF,
    EMPH2: 0xFFFF00,
    EMPH3: 0xFF00FF,
};

const LAYOUT = {
    OFFSET_Y: -20,
    HEADER_OFFSET: 285,
    STANDALONE_FOOTER_OFFSET: -100,
};

const FONT_STYLE = {
    BASE: new PIXI.TextStyle({
        fontFamily: 'Inter',
        fontSize: 100,
        fontWeight: '100',
        fill: COLORS.LIGHT,
    })
};

const createFilters = () => {
    const light = new PIXI.ColorMatrixFilter();
    light.tint(COLORS.LIGHT);

    const dark = new PIXI.ColorMatrixFilter();
    dark.tint(COLORS.DARK);

    const emph1 = new PIXI.ColorMatrixFilter();
    emph1.tint(COLORS.EMPH1);

    const emph2 = new PIXI.ColorMatrixFilter();
    emph2.tint(COLORS.EMPH2);

    const emph3 = new PIXI.ColorMatrixFilter();
    emph3.tint(COLORS.EMPH3);

    return {
        light,
        dark,
        emph: [emph1, emph2, emph3]
    };
};

const FILTERS = createFilters();

export const design = {
    colors: COLORS,
    layout: LAYOUT,
    fontStyle: FONT_STYLE,
    filters: FILTERS,
    baseStyle: FONT_STYLE.BASE,
};
