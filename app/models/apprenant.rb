class Apprenant < ApplicationRecord
  belongs_to :entreprise
  has_many :inscriptions, dependent: :destroy
end
