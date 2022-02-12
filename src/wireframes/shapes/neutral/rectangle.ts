/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

// import { ConfigurableFactory, DefaultAppearance, Rect2, RenderContext, ShapePlugin, Vec2 } from '@app/wireframes/interface';
// import { CommonTheme } from './_theme';

// const BORDER_RADIUS = 'BORDER_RADIUS';

// const DEFAULT_APPEARANCE = {};
// DEFAULT_APPEARANCE[DefaultAppearance.FOREGROUND_COLOR] = 0;
// DEFAULT_APPEARANCE[DefaultAppearance.BACKGROUND_COLOR] = 0xFFFFFF;
// DEFAULT_APPEARANCE[DefaultAppearance.TEXT] = 'SearchBar';
// DEFAULT_APPEARANCE[DefaultAppearance.TEXT_ALIGNMENT] = 'center';
// DEFAULT_APPEARANCE[DefaultAppearance.FONT_SIZE] = CommonTheme.CONTROL_FONT_SIZE;
// DEFAULT_APPEARANCE[DefaultAppearance.STROKE_COLOR] = CommonTheme.CONTROL_BORDER_COLOR;
// DEFAULT_APPEARANCE[DefaultAppearance.STROKE_THICKNESS] = CommonTheme.CONTROL_BORDER_THICKNESS;
// DEFAULT_APPEARANCE[BORDER_RADIUS] = 0;

// export class Rectangle implements ShapePlugin {
//     public identifier(): string {
//         return 'SearchBar';
//     }

//     public defaultAppearance() {
//         return DEFAULT_APPEARANCE;
//     }

//     public defaultSize() {
//         return { x: 100, y: 60 };
//     }

//     public configurables(factory: ConfigurableFactory) {
//         return [
//             factory.slider(BORDER_RADIUS, 'Border Radius', 0, 40),
//         ];
//     }

//     public render(ctx: RenderContext) {
//         this.createShape(ctx);
//         // this.createText(ctx);
//     }

//     private createShape(ctx: RenderContext) {
//         const searchRect = new Rect2(0, 0, ctx.rect.width, ctx.rect.height);

//         ctx.renderer2.rectangle(0, 15, searchRect, p => {
//             p.setBackgroundColor(0xffffff);
//             p.setStrokeColor(0x222222);
//         });
//     }

//     // private createText(ctx: RenderContext) {
//     //     ctx.renderer2.text(ctx.shape, ctx.rect.deflate(10), p => {
//     //         p.setForegroundColor(ctx.shape);
//     //     });
//     // }
// }


import { ConfigurableFactory, DefaultAppearance, Rect2, RenderContext, ShapePlugin, Vec2 } from '@app/wireframes/interface';
// import { CommonTheme } from './_theme';

const STATE = 'STATE';
const STATE_NORMAL = 'Normal';
const STATE_CHECKED = 'Checked';

const DEFAULT_APPEARANCE = {};
DEFAULT_APPEARANCE[DefaultAppearance.FOREGROUND_COLOR] = 0xdddddd;
DEFAULT_APPEARANCE[DefaultAppearance.BACKGROUND_COLOR] = 0xffffff;
DEFAULT_APPEARANCE[DefaultAppearance.TEXT_DISABLED] = true;
DEFAULT_APPEARANCE[DefaultAppearance.STROKE_COLOR] = 0xffffff;
DEFAULT_APPEARANCE[DefaultAppearance.STROKE_THICKNESS] = 4;
DEFAULT_APPEARANCE[STATE] = STATE_CHECKED;
const REFRESH_CODE = String.fromCharCode(0xf002);

export class Rectangle implements ShapePlugin {
    public identifier(): string {
        return 'SearchBar';
    }

    public defaultAppearance() {
        return DEFAULT_APPEARANCE;
    }

    public defaultSize() {
        return { x: 300, y: 60 };
    }

    public configurables(factory: ConfigurableFactory) {
        return [
            factory.selection(STATE, 'State', [
                STATE_NORMAL,
                STATE_CHECKED,
            ]),
        ];
    }

    public render(ctx: RenderContext) {
        // this.createIcon(ctx);
        const border = ctx.shape.strokeThickness;

        const radius = Math.min(ctx.rect.width, ctx.rect.height) * 0.4;

        const isUnchecked = ctx.shape.getAppearance(STATE) === STATE_NORMAL;

        const circleY = ctx.rect.height * 0.5;
        const circleX = isUnchecked ? radius : ctx.rect.width - radius;

        const circleCenter = new Vec2(circleX, circleY);
        const circleSize = radius - border;

        // const barColor = isUnchecked ? ctx.shape : ctx.shape.foregroundColor;
        // const secondBarColor = 0xffffff;

        // Pill
        console.log(ctx.rect);
        ctx.renderer2.rectangle(0, radius, ctx.rect, p => {
            p.setBackgroundColor(0x000000);
        });
       
        console.log(ctx.shape);
        ctx.renderer2.rectangle(0, radius, new Rect2(5, 5, ctx.rect.width - 10, ctx.rect.height - 10), p => {
            p.setBackgroundColor(0xffffff);
        });

        ctx.renderer2.text({ fontSize: circleSize, text: REFRESH_CODE, alignment: 'center' }, Rect2.fromCenter(circleCenter, circleSize), p => {
            p.setForegroundColor(0x555555);
            p.setFontFamily('FontAwesome');
        });
    }

}
