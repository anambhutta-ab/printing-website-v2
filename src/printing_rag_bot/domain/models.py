from pydantic import BaseModel, Field


class PrintProduct(BaseModel):
    """Represents a printable product (e.g., business card, flyer)."""

    name: str = Field(..., description="Human-friendly product name")
    category: str = Field(..., description="Category, e.g., 'cards', 'flyers', 'posters'")
    material: str = Field(..., description="Material type, e.g., 'standard', 'premium'")
    size: str = Field(..., description="Size label, e.g., 'A8', 'A4', 'Custom'")
    sides: int = Field(..., ge=1, le=2, description="Number of printed sides (1 or 2)")
    base_price: float = Field(
        ...,
        gt=0,
        description="Base price per unit before quantity and material adjustments",
    )