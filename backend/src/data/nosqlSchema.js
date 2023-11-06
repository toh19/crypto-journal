// users collection
{
  "_id": ObjectId(),
  "username": "unique_username",
  "email": "user@example.com",
  "password": "hashed_password",
  "first_name": "First",
  "last_name": "Last",
  "is_active": true,
  "is_verified": false,
  "role": "user",
  "created_at": ISODate(),
  "updated_at": ISODate()
}
// cryptocurrencies collection
{
  "_id": ObjectId(),
  "name": "Bitcoin",
  "symbol": "BTC",
  "current_price": 20000.00,
  "market_cap": 600000000000.00,
  "volume": 350000000.00,
  "description": "A decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.",
  "logo_url": "http://example.com/bitcoin.png"
}
// user_portfolio collection
{
  "_id": ObjectId(),
  "user_id": ObjectId(), // Reference to users collection
  "crypto_id": ObjectId(), // Reference to cryptocurrencies collection
  "amount": 1.5,
  "purchase_price": 15000.00,
  "purchase_date": ISODate("2020-01-01T00:00:00Z")
}