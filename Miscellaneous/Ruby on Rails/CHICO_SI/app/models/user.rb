class User < ApplicationRecord

  has_many :user_groups
  has_many :groups, through: :user_groups

  has_many :pagamentos

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, uniqueness: {case_sensitive: false}, format: {with: VALID_EMAIL_REGEX}
  validates :authority, presence: true
  has_secure_password

end