"use client";

import type { CustomField, CustomFieldRender } from "@puckeditor/core";

type NumberFieldOptions = {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
};

// Puck's built-in `type: "number"` field rejects every keystroke that would
// produce an intermediate value outside min/max (see AutoField/DefaultField
// in @puckeditor/core's source) — so clearing e.g. "960" to type "1400"
// gets stuck forever, since every partial digit typed from scratch (1, 14,
// 140...) is below a min like 320. This custom field commits every
// keystroke unconditionally and only clamps to min/max on blur, so typing
// always works regardless of where the value currently sits.
function makeRender(opts: NumberFieldOptions): CustomFieldRender<number> {
  return function NumberFieldRender({ field, value, onChange, id, name, readOnly }) {
    const label = field.label || name;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label
          htmlFor={id}
          style={{ fontSize: 13, color: "var(--puck-color-text-muted, #767676)" }}
        >
          {label}
        </label>
        <input
          id={id}
          type="number"
          disabled={readOnly}
          value={Number.isFinite(value) ? value : ""}
          min={opts.min}
          max={opts.max}
          step={opts.step ?? 1}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "8px 10px",
            borderRadius: 4,
            border: "1px solid var(--puck-color-border, #dcdcdc)",
            font: "inherit",
          }}
          onChange={(e) => {
            const raw = e.currentTarget.value;
            if (raw === "" || raw === "-") return;
            const n = Number(raw);
            if (!Number.isNaN(n)) onChange(n);
          }}
          onBlur={(e) => {
            let n = Number(e.currentTarget.value);
            if (Number.isNaN(n)) n = opts.min ?? 0;
            if (typeof opts.min === "number" && n < opts.min) n = opts.min;
            if (typeof opts.max === "number" && n > opts.max) n = opts.max;
            onChange(n);
          }}
        />
      </div>
    );
  };
}

export function numberField(opts: NumberFieldOptions = {}): CustomField<number> {
  return {
    type: "custom",
    label: opts.label,
    render: makeRender(opts),
  };
}
