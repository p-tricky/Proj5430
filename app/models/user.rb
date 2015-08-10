class User < ActiveRecord::Base
  validates(:name, presence: true, length: {maximum: 50})
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, format: {with: VALID_EMAIL_REGEX},
    uniqueness: { case_sensitive: false }
  before_save { |user| user.email = email.downcase }
  has_secure_password
  validates :password, presence: true, length: { minimum: 6 }
end
