/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import { ConfigurableFactory, ConstraintFactory, DefaultAppearance, Rect2, RenderContext, ShapePlugin, Vec2 } from '@app/wireframes/interface';
import { CommonTheme } from './_theme';

const STATE_KEY = 'STATE';
const STATE_NORMAL = 'Normal';
const STATE_CHECKED = 'Checked';
const CIRCLE_MARGIN = 4;
const CIRCLE_RADIUS = 9;
const CIRCLE_POSITION_X = CIRCLE_MARGIN + CIRCLE_RADIUS;
const CIRCLE_CHECK_RADIUS = CIRCLE_RADIUS - 4;
const TEXT_POSITION_X = 2 * CIRCLE_MARGIN + 2 * CIRCLE_RADIUS;

const DEFAULT_APPEARANCE = {};
DEFAULT_APPEARANCE[DefaultAppearance.FOREGROUND_COLOR] = CommonTheme.CONTROL_TEXT_COLOR;
DEFAULT_APPEARANCE[DefaultAppearance.BACKGROUND_COLOR] = CommonTheme.CONTROL_BACKGROUND_COLOR;
DEFAULT_APPEARANCE[DefaultAppearance.TEXT] = 'RadioButton';
DEFAULT_APPEARANCE[DefaultAppearance.TEXT_ALIGNMENT] = 'left';
DEFAULT_APPEARANCE[DefaultAppearance.FONT_SIZE] = CommonTheme.CONTROL_FONT_SIZE;
DEFAULT_APPEARANCE[DefaultAppearance.STROKE_COLOR] = CommonTheme.CONTROL_BORDER_COLOR;
DEFAULT_APPEARANCE[DefaultAppearance.STROKE_THICKNESS] = CommonTheme.CONTROL_BORDER_THICKNESS;
DEFAULT_APPEARANCE[STATE_KEY] = STATE_NORMAL;

export class RadioButton implements ShapePlugin {
    public identifier(): string {
        return 'RadioButton';
    }

    public defaultAppearance() {
        return DEFAULT_APPEARANCE;
    }

    public defaultSize() {
        return { x: 130, y: 36 };
    }

    public constraint(factory: ConstraintFactory) {
        return factory.textSize(8);
    }

    public configurables(factory: ConfigurableFactory) {
        return [
            factory.selection(STATE_KEY, 'State', [
                STATE_NORMAL,
                STATE_CHECKED,
            ]),
        ];
    }

    public render(ctx: RenderContext) {
        this.createCircle(ctx);
        this.createText(ctx);
    }

    private createCircle(ctx: RenderContext) {
        const y = 0.5 * ctx.rect.h;

        // Circle
        ctx.renderer2.ellipse(ctx.shape, Rect2.fromCenter(new Vec2(CIRCLE_POSITION_X, y), CIRCLE_RADIUS), p => {
            p.setStrokeColor(ctx.shape);
            p.setBackgroundColor(ctx.shape);
        });

        const state = ctx.shape.getAppearance(STATE_KEY);

        if (state === STATE_CHECKED) {
            // Checked circle
            ctx.renderer2.ellipse(0, Rect2.fromCenter(new Vec2(CIRCLE_POSITION_X, y), CIRCLE_CHECK_RADIUS), p => {
                p.setBackgroundColor(ctx.shape.strokeColor);
            });
        }
    }

    private createText(ctx: RenderContext) {
        const w = ctx.rect.width - TEXT_POSITION_X;
        const h = ctx.rect.height;

        const textRect = new Rect2(TEXT_POSITION_X, 0, w, h);

        ctx.renderer2.text(ctx.shape, textRect);
    }
}
