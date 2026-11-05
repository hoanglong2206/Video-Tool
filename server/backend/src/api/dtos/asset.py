from pydantic import BaseModel, ConfigDict


class CategoryCountDTO(BaseModel):
    id: str
    label: str
    count: int

    model_config = ConfigDict(from_attributes=True)


class AssetItemDTO(BaseModel):
    id: str
    name: str
    category: str
    sourceType: str
    resolution: str
    format: str
    scenesUsed: list[int]
    version: int
    totalVersions: int
    isTransparent: bool = False

    model_config = ConfigDict(from_attributes=True)


class AssetStudioResponseDTO(BaseModel):
    projectName: str
    categories: list[CategoryCountDTO]
    assets: list[AssetItemDTO]

    model_config = ConfigDict(from_attributes=True)
