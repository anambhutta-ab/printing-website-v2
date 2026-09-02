from .models import PrintProduct

def calculate_unit_price(product: PrintProduct) -> float:
    """Calculate unit price based on material and sides."""
    material_factor = 1.3 if product.material.lower() == "premium" else 1.0
    sides_factor = 1.15 if product.sides == 2 else 1.0
    return product.base_price * material_factor * sides_factor


def calculate_total_price(product: PrintProduct, quantity: int) -> float:
    """
    Calculate total price for a given quantity.

    This function intentionally does not handle discounts or taxes yet;
    those can be added as separate, composable functions later.
    """
    if quantity <= 0:
        raise ValueError("Quantity must be positive")

    unit_price = calculate_unit_price(product)
    return unit_price * quantity