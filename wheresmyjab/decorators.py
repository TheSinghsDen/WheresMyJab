
def str_to_list(func):
    """
        This wrapper converts the string to a list of that string
    """
    def wrapper(*args, **kwargs):
        args = [args]
        return func(*args, **kwargs)
    return wrapper

# Just for testing
