from printing_rag_bot.domain.models import PrintProduct
from printing_rag_bot.domain.pricing import calculate_unit_price, calculate_total_price


def test_calculate_unit_price_standard_single_sided():
    product = PrintProduct(
        name="Business Card",
        category="cards",
        material="standard",
        size="A8",
        sides=1,
        base_price=2.0,
    )
    unit_price = calculate_unit_price(product)
    assert unit_price == 2.0  # no premium, no double-sided


def test_calculate_unit_price_premium_double_sided():
    product = PrintProduct(
        name="Premium Flyer",
        category="flyers",
        material="premium",
        size="A5",
        sides=2,
        base_price=5.0,
    )
    unit_price = calculate_unit_price(product)
    expected = 5.0 * 1.3 * 1.15
    assert unit_price == expected


def test_calculate_total_price_valid_quantity():
    product = PrintProduct(
        name="Poster",
        category="posters",
        material="standard",
        size="A3",
        sides=1,
        base_price=10.0,
    )
    total = calculate_total_price(product, quantity=10)
    assert total == 10 * 10.0


def test_calculate_total_price_invalid_quantity():
    product = PrintProduct(
        name="Poster",
        category="posters",
        material="standard",
        size="A3",
        sides=1,
        base_price=10.0,
    )
    try:
        calculate_total_price(product, quantity=0)
    except ValueError as exc:
        assert "Quantity must be positive" in str(exc)
    else:
        assert False, "Expected ValueError for non-positive quantity"