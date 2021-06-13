from typing import Any, Sequence
import shutil
import sys


def str_to_bool(value: Any) -> bool:
    """Return whether the provided string (or any value really) represents true. Otherwise false.
    Just like plugin server stringToBoolean.
    """
    if not value:
        return False
    return str(value).lower() in ("y", "yes", "t", "true", "on", "1")


def print_warning(warning_lines: Sequence[str]):
    highlight_length = min(max(map(len, warning_lines)) //
                           2, shutil.get_terminal_size().columns)
    print("\n".join(("", "🔻" * highlight_length, *warning_lines,
          "🔺" * highlight_length, "",)), file=sys.stderr)
