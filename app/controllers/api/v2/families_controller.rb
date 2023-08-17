# frozen_string_literal: true

# Main API controller for Families
class Api::V2::FamiliesController < ApplicationApiController
  include Api::V2::Concerns::Pagination
  include Api::V2::Concerns::Record

  def query_scope
    { user: {} }
  end

  def create_case
    authorize! :case_from_family, model_class
    @child = FamilyLinkageService.new_child_for_family_member(
      current_user, create_case_params['family_id'], create_case_params['family_member_id']
    )
    @child.save!
  end

  def create_case_params
    return @create_case_params if @create_case_params.present?

    data = params.require(:data).permit(:family_member_id).to_h
    @create_case_params = data.merge(family_id: params.require(:family_id))
  end
end