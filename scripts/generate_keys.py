from __future__ import annotations

import json
import random
import string
from datetime import datetime, timezone
from pathlib import Path

ALPHABET = string.ascii_uppercase + string.digits
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "generated-keys.json"


def chars(length: int) -> str:
    return "".join(random.choices(ALPHABET, k=length))


def chunk_key(raw: str) -> str:
    return "-".join(raw[i:i + 5] for i in range(0, len(raw), 5))


def make_key(kind: str = "standard") -> str:
    if kind == "extended":
        return chunk_key(chars(25))
    if kind == "special":
        raw = chars(17)
        return f"{raw[:15]} {raw[15:]}"
    return chunk_key(chars(15))


def main() -> None:
    # Fake demo keys only. Do not validate, redeem, or test against any live service.
    keys = []
    for _ in range(350):
        keys.append(make_key("standard"))
    for _ in range(100):
        keys.append(make_key("extended"))
    for _ in range(50):
        keys.append(make_key("special"))

    payload = {
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "notice": "Fake demo keys only. Not valid product keys.",
        "count": len(keys),
        "keys": keys,
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"Wrote {len(keys)} demo keys to {OUT}")


if __name__ == "__main__":
    main()
