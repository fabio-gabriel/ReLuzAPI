const DataAccessor = require("../services/data_accessor.js");

class AuctionItem {
  /**
   * @param id
   * @param name
   * @param highestBid
   * @param conservation
   * @param description
   * @param category
   * @param images
   * @param auctionDetails
   * @param seller
   * @param location
   * @param tags
   */

  constructor(
    name = null,
    highestBid = null,
    conservation = null,
    description = null,
    category = null,
    images = null,
    auctionDetails = null,
    seller = null,
    location = null,
    tags = null,
  ) {
    this.name = name;
    this.highestBid = highestBid;
    this.conservation = conservation;
    this.description = description;
    this.category = category;
    this.images = images;
    this.auctionDetails = auctionDetails;
    this.seller = seller;
    this.location = location;
    this.tags = tags;
  }

  save() {
    if (this.id == null) {
      const data = AuctionItem.create({
        name: this.name,
        highestBid: this.highestBid,
        conservation: this.conservation,
        description: this.description,
        category: this.category,
        images: this.images,
        auctionDetails: this.auctionDetails,
        seller: this.seller,
        location: this.location,
        tags: this.tags,
      });
      this.id = data.id;
    } else {
      return this.update({});
    }
  }

  static create = ({
    name = null,
    highestBid = null,
    conservation = null,
    description = null,
    category = null,
    images = null,
    auctionDetails = null,
    seller = null,
    location = null,
    tags = null,
  }) => {
    const db = new DataAccessor("auctions");
    const json = generate_json(
      name,
      highestBid,
      conservation,
      description,
      category,
      images,
      auctionDetails,
      seller,
      location,
      tags,
    );
    json["deleted"] = false;

    let data = db.create(json);
    let auctionItem = new AuctionItem(
      data["name"],
      data["highestBid"],
      data["conservation"],
      data["description"],
      data["category"],
      data["images"],
      data["auctionDetails"],
      data["seller"],
      data["location"],
      data["tags"],
    );
    auctionItem.id = data["id"];

    return auctionItem;
  };

  update = ({
    name = null,
    highestBid = null,
    conservation = null,
    description = null,
    category = null,
    images = null,
    auctionDetails = null,
    seller = null,
    location = null,
    tags = null,
  }) => {
    const db = new DataAccessor("auctions");

    // Verificar campos nulos e manter os valores atuais
    if (name == null) name = this.name;
    if (highestBid == null) highestBid = this.highestBid;
    if (conservation == null) conservation = this.conservation;
    if (description == null) description = this.description;
    if (category == null) category = this.category;
    if (images == null) images = this.images;
    if (auctionDetails == null) auctionDetails = this.auctionDetails;
    if (seller == null) seller = this.seller;
    if (location == null) location = this.location;
    if (tags == null) tags = this.tags;

    const json = generate_json(
      name,
      highestBid,
      conservation,
      description,
      category,
      images,
      auctionDetails,
      seller,
      location,
      tags,
      this.id,
    );

    json["deleted"] = false;
    let data = db.update(json);

    // Atualizar o objeto com os novos valores
    this.name = data["name"];
    this.highestBid = data["highestBid"];
    this.conservation = data["conservation"];
    this.description = data["description"];
    this.category = data["category"];
    this.images = data["images"];
    this.auctionDetails = data["auctionDetails"];
    this.seller = data["seller"];
    this.location = data["location"];
    this.tags = data["tags"];

    return this;
  };

  delete() {
    const db = new DataAccessor("auctions");
    db.delete(this.id);
    // Limpar os campos após exclusão
    this.name = null;
    this.highestBid = null;
    this.conservation = null;
    this.description = null;
    this.category = null;
    this.images = null;
    this.auctionDetails = null;
    this.seller = null;
    this.location = null;
    this.tags = null;
    this.id = null;
  }

  json() {
    return {
      name: this.name,
      highestBid: this.highestBid,
      conservation: this.conservation,
      description: this.description,
      category: this.category,
      images: this.images,
      auctionDetails: this.auctionDetails,
      seller: this.seller,
      location: this.location,
      tags: this.tags,
      id: this.id,
    };
  }

  static find(id) {
    const db = new DataAccessor("auctions");
    let data = db.find(id);
    let auctionItem = new AuctionItem(
      data["name"],
      data["highestBid"],
      data["conservation"],
      data["description"],
      data["category"],
      data["images"],
      data["auctionDetails"],
      data["seller"],
      data["location"],
      data["tags"],
    );
    auctionItem.id = data["id"];

    return auctionItem;
  }

  static delete(id) {
    const db = new DataAccessor("auctions");
    db.delete(id);
  }

  static where({
    name = null,
    highestBid = null,
    conservation = null,
    description = null,
    category = null,
    images = null,
    auctionDetails = null,
    seller = null,
    location = null,
    tags = null,
    deleted = null,
  }) {
    const db = new DataAccessor("auctions");
    let items_data = db.data; // Get all data

    // Filter the data based on provided parameters
    if (name) {
      items_data = db.where("name", name);
    }
    if (highestBid) {
      items_data = db.where("highestBid", highestBid);
    }
    if (conservation) {
      items_data = db.where("conservation", conservation);
    }
    if (description) {
      items_data = db.where("description", description);
    }
    if (category) {
      items_data = db.where("category", category);
    }
    if (images) {
      items_data = db.where("images", images);
    }
    if (auctionDetails) {
      items_data = db.where("auctionDetails", auctionDetails);
    }
    if (seller) {
      items_data = db.where("seller.username", seller);
    }
    if (location) {
      items_data = db.where("location", location);
    }
    if (tags) {
      items_data = db.where("tags", tags);
    }
    if (deleted) {
      items_data = db.where("deleted", deleted);
    }

    return items_data.map((data) => {
      let instanced_item = new AuctionItem(
        data["name"],
        data["highestBid"],
        data["conservation"],
        data["description"],
        data["category"],
        data["images"],
        data["auctionDetails"],
        data["seller"],
        data["location"],
        data["tags"],
      );
      instanced_item.id = data["id"];
      return instanced_item;
    });
  }

  static all() {
    const db = new DataAccessor("auctions");
    let items_data = db.all();

    return items_data.map((data) => {
      let instanced_item = new AuctionItem(
        data["name"],
        data["highestBid"],
        data["conservation"],
        data["description"],
        data["category"],
        data["images"],
        data["auctionDetails"],
        data["seller"],
        data["location"],
        data["tags"],
      );
      instanced_item.id = data["id"];

      return instanced_item;
    });
  }
}

function generate_json(
  name,
  highestBid,
  conservation,
  description,
  category,
  images,
  auctionDetails,
  seller,
  location,
  tags,
  id = null,
) {
  return {
    id: id,
    name: name,
    highestBid: highestBid,
    conservation: conservation,
    description: description,
    category: category,
    images: images,
    auctionDetails: auctionDetails,
    seller: seller,
    location: location,
    tags: tags,
  };
}

module.exports = AuctionItem;
