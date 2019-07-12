class Manuscript < ApplicationRecord
  belogs_to :user
  belongs_to :group

  mount_uploader :manuscript_file, ManuscriptFileUploader

  validates :title, presence: true
end
