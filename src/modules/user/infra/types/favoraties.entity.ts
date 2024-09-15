class FavoritesEntity {
  text: string

  constructor(text: string) {
    this.text = text
  }
}

class UserFavoritesEntity {
  id: string
  name: string
  favorites: FavoritesEntity[]

  constructor(id:string, name: string, favorites: FavoritesEntity[]) {
    this.id = id
    this.name = name
    this.favorites = favorites
  }
}

export {
  UserFavoritesEntity,
  FavoritesEntity
}