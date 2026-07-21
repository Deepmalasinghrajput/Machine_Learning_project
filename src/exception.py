import sys


def error_message_detail(error, error_detail=None):
    """
    Returns detailed error message with filename and line number.
    """
    exc_tb = None
    if error_detail is not None:
        _, _, exc_tb = error_detail.exc_info()
    else:
        _, _, exc_tb = sys.exc_info()

    if exc_tb is None:
        return f"Error: {str(error)}"

    file_name = exc_tb.tb_frame.f_code.co_filename
    line_number = exc_tb.tb_lineno
    return f"Error occurred in script [{file_name}] at line [{line_number}]: {str(error)}"


class CustomException(Exception):
    def __init__(self, error, error_detail=None):
        super().__init__(error)
        self.error_message = error_message_detail(error, error_detail)

    def __str__(self):
        return self.error_message
