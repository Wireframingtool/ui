/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
// import { ConstraintFactory, DefaultAppearance, Rect2, RenderContext, ShapePlugin, Vec2 } from '@app/wireframes/interface';
// import { CommonTheme } from './_theme';

// const DEFAULT_APPEARANCE = {};
// DEFAULT_APPEARANCE[DefaultAppearance.FOREGROUND_COLOR] = 0x08519c;
// DEFAULT_APPEARANCE[DefaultAppearance.TEXT] = 'Home';
// DEFAULT_APPEARANCE[DefaultAppearance.FONT_SIZE] = CommonTheme.CONTROL_FONT_SIZE;
// const REFRESH_CODE = String.fromCharCode(0xf054);



// export class Label implements ShapePlugin {
//     public identifier(): string {
//         return 'BreadCrumbs';
//     }

//     public defaultAppearance() {
//         return DEFAULT_APPEARANCE;
//     }

//     public defaultSize() {
//         return { x: 200, y: 30 };
//     }

//     public constraint(factory: ConstraintFactory) {
//         return factory.textSize(5);
//     }

//     public render(ctx: RenderContext) {
//         const radius = Math.min(ctx.rect.width, ctx.rect.height) * 0.4;
//         ctx.renderer2.rectangle(0, radius, ctx.rect, p => {
//             p.setBackgroundColor(0x000000);
//         });
//         // ctx.renderer2.rectangle(0, radius, ctx.rect, p => {
//         //     p.setBackgroundColor(0xffffff);
//         // });
//         // ctx.renderer2.text(ctx.shape, ctx.rect, p => {
//         //     p.setForegroundColor(0x08519c);
//         // });
//         ctx.renderer2.text({ fontSize: 15, text: REFRESH_CODE, alignment: 'center' }, Rect2.fromCenter(new Vec2(60, 18), 50), p => {
//             p.setForegroundColor(0x555555);
//             p.setFontFamily('FontAwesome');
//         });
       
//         ctx.renderer2.text({ fontSize: 20, text: 'Products', alignment: 'center' }, Rect2.fromCenter(new Vec2(115, 14), 50), p => {
//             p.setForegroundColor(0x08519c);
//             p.setFontFamily('FontAwesome');
//         });
//     }
// }

import { ConfigurableFactory, DefaultAppearance, Rect2, RenderContext, ShapePlugin, Vec2 } from '@app/wireframes/interface';
import { CommonTheme } from './_theme';

const BORDER_RADIUS = 'BORDER_RADIUS';

const DEFAULT_APPEARANCE = {};
DEFAULT_APPEARANCE[DefaultAppearance.FOREGROUND_COLOR] = 0;
DEFAULT_APPEARANCE[DefaultAppearance.BACKGROUND_COLOR] = 0xFFFFFF;
DEFAULT_APPEARANCE[DefaultAppearance.TEXT] = 'BreadCrumbs';
DEFAULT_APPEARANCE[DefaultAppearance.TEXT_ALIGNMENT] = 'center';
DEFAULT_APPEARANCE[DefaultAppearance.FONT_SIZE] = CommonTheme.CONTROL_FONT_SIZE;
DEFAULT_APPEARANCE[DefaultAppearance.STROKE_COLOR] = CommonTheme.CONTROL_BORDER_COLOR;
DEFAULT_APPEARANCE[DefaultAppearance.STROKE_THICKNESS] = CommonTheme.CONTROL_BORDER_THICKNESS;
DEFAULT_APPEARANCE[BORDER_RADIUS] = 0;
const REFRESH_CODE = String.fromCharCode(0xf054);
const LINK_COLOR = 0x08519c;

export class Label implements ShapePlugin {
    public identifier(): string {
        return 'BreadCrumbs';
    }

    public defaultAppearance() {
        return DEFAULT_APPEARANCE;
    }

    public defaultSize() {
        return { x: 328, y: 50 };
    }

    public configurables(factory: ConfigurableFactory) {
        return [
            factory.slider(BORDER_RADIUS, 'Border Radius', 0, 40),
        ];
    }

    public render(ctx: RenderContext) {
        this.createShape(ctx);
        // this.createText(ctx);
    }

    private createShape(ctx: RenderContext) {
        const mainRect = new Rect2(0, 0, ctx.rect.width, ctx.rect.height);
        const fontSize = 20;
        const arrowFontSize = 15;

        ctx.renderer2.rectangle(0, 15, mainRect, p => {
            p.setBackgroundColor(0xffffff);
            p.setStrokeColor(0x222222);
        });
        ctx.renderer2.text({ fontSize, text: 'Home', alignment: 'center' }, Rect2.fromCenter(new Vec2(fontSize * 1.4, mainRect.height / 3), mainRect.width / 4), p => {
            p.setForegroundColor(LINK_COLOR);
            p.setStrokeColor(LINK_COLOR);
        });
        ctx.renderer2.text({ fontSize: arrowFontSize, text: REFRESH_CODE, alignment: 'center' }, Rect2.fromCenter(new Vec2(fontSize * 3.3, mainRect.height / 2.8), mainRect.width / 5), p => {
            p.setForegroundColor(0xf000000);
            p.setFontFamily('FontAwesome');
        });
        ctx.renderer2.text({ fontSize, text: 'Products', alignment: 'center' }, Rect2.fromCenter(new Vec2(fontSize * 6, mainRect.height / 3), mainRect.width / 4), p => {
            p.setForegroundColor(LINK_COLOR);
        });
        ctx.renderer2.text({ fontSize: arrowFontSize, text: REFRESH_CODE, alignment: 'center' }, Rect2.fromCenter(new Vec2(fontSize * 8.4, mainRect.height / 2.8), mainRect.width / 5), p => {
            p.setForegroundColor(0xf000000);
            p.setFontFamily('FontAwesome');
        });
        ctx.renderer2.text({ fontSize, text: 'XYZ', alignment: 'center' }, Rect2.fromCenter(new Vec2(fontSize * 10, mainRect.height / 3), mainRect.width / 4), p => {
            p.setForegroundColor(LINK_COLOR);
        });
        ctx.renderer2.text({ fontSize: arrowFontSize, text: REFRESH_CODE, alignment: 'center' }, Rect2.fromCenter(new Vec2(fontSize * 11.4, mainRect.height / 2.8), mainRect.width / 5), p => {
            p.setForegroundColor(0xf000000);
            p.setFontFamily('FontAwesome');
        });
        ctx.renderer2.text({ fontSize, text: 'Features', alignment: 'center' }, Rect2.fromCenter(new Vec2(fontSize * 13.8, mainRect.height / 3), mainRect.width / 4), p => {
            p.setForegroundColor(0xf000000);
        });
    }

}

