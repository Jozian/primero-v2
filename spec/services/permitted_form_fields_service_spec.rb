# frozen_string_literal: true

# Copyright (c) 2014 - 2023 UNICEF. All rights reserved.

require 'rails_helper'

describe PermittedFormFieldsService do
  before :each do
    clean_data(Field, FormSection, FormPermission, Role, PrimeroModule)
  end

  let!(:form_section1) do
    family_details = FormSection.create!(
      unique_id: 'family_details', parent_form: 'case', name_en: 'family_details', is_nested: true,
      fields: [
        Field.new(name: 'relation_name', type: Field::TEXT_FIELD, display_name_en: 'A'),
        Field.new(name: 'relation_type', type: Field::SELECT_BOX, display_name_en: 'A')
      ]
    )
    FormSection.create!(
      unique_id: 'form_section1', parent_form: 'case', name_en: 'form_section1',
      fields: [
        Field.new(name: 'name', type: Field::TEXT_FIELD, display_name_en: 'A'),
        Field.new(name: 'age', type: Field::NUMERIC_FIELD, display_name_en: 'A'),
        Field.new(name: 'sex', type: Field::SELECT_BOX, display_name_en: 'A'),
        Field.new(name: 'national_id_no', type: Field::TEXT_FIELD, display_name_en: 'A'),
        Field.new(name: 'consent_for_services', type: Field::TICK_BOX, display_name_en: 'A'),
        Field.new(name: 'current_address', type: Field::TEXT_AREA, display_name_en: 'A', visible: false),
        Field.new(name: 'protection_concerns', type: Field::SELECT_BOX, multi_select: true, display_name_en: 'A'),
        Field.new(name: 'registration_date', type: Field::DATE_FIELD, display_name_en: 'A'),
        Field.new(name: 'created_on', type: Field::DATE_FIELD, date_include_time: true, display_name_en: 'A'),
        Field.new(name: 'separator1', type: Field::SEPARATOR, display_name_en: 'A'),
        Field.new(name: 'other_documents', type: Field::DOCUMENT_UPLOAD_BOX, display_name_en: 'A'),
        Field.new(
          name: 'family_details',
          display_name_en: 'A',
          type: Field::SUBFORM,
          subform: family_details
        )
      ]
    )
  end

  let!(:form_section2) do
    FormSection.create!(
      unique_id: 'form_section2', parent_form: 'case', name_en: 'form_section2', is_nested: true,
      fields: [
        Field.new(name: 'interview_date', type: Field::DATE_FIELD, display_name_en: 'A'),
        Field.new(name: 'consent_for_referral', type: Field::TICK_BOX, display_name_en: 'A')
      ]
    )
  end

  let!(:form_section3) do
    FormSection.create!(
      unique_id: 'form_section3', parent_form: 'case', name_en: 'form_section3',
      fields: [
        Field.new(name: 'interview_date3', type: Field::DATE_FIELD, display_name_en: 'A'),
        Field.new(name: 'consent_for_referral3', type: Field::TICK_BOX, display_name_en: 'A')
      ]
    )
  end

  let!(:form_section4) do
    notes_section = FormSection.create!(
      unique_id: 'notes_section', parent_form: 'case', name_en: 'notes_section', is_nested: true,
      fields: [
        Field.new(name: 'note_field', type: Field::TEXT_FIELD, display_name_en: 'A'),
        Field.new(name: 'separator2', type: Field::SEPARATOR, display_name_en: 'A'),
      ]
    )
    FormSection.create!(
      unique_id: 'form_section4', parent_form: 'case', name_en: 'form_section4',
      fields: [
        Field.new(
          name: 'notes_section',
          display_name_en: 'A',
          type: Field::SUBFORM,
          subform: notes_section
        )
      ]
    )
  end

  let!(:form_section5) do
    services_section = FormSection.create!(
      unique_id: 'services_section', parent_form: 'case', name_en: 'services_section', is_nested: true,
      fields: [
        Field.new(name: 'service_description', type: Field::TEXT_FIELD, display_name_en: 'A'),
        Field.new(name: 'separator3', type: Field::SEPARATOR, display_name_en: 'A'),
      ]
    )
    FormSection.create(
      unique_id: 'form_section5', parent_form: 'case', name_en: 'form_section5',
      fields: [
        Field.new(
          name: 'services_section',
          display_name_en: 'A',
          type: Field::SUBFORM,
          subform: services_section
        )
      ]
    )
  end

  let!(:primero_module) do
    PrimeroModule.create!(
      unique_id: 'primeromodule-cp-a', name: 'CPA', description: 'Child Protection A',
      associated_record_types: %w[case tracing_request incident],
      primero_program: PrimeroProgram.new(name: 'program'),
      form_sections: [form_section1, form_section2, form_section3, form_section4, form_section5]
    )
  end

  let!(:role) do
    Role.create(
      unique_id: 'role_test_01',
      name: 'name_test_01',
      description: 'description_test_01',
      group_permission: 'all',
      permissions: [
        Permission.new(resource: Permission::CASE, actions: [Permission::READ, Permission::WRITE, Permission::CREATE])
      ],
      form_permissions: [
        FormPermission.new(form_section: form_section1, permission: FormPermission::PERMISSIONS[:read_write]),
        FormPermission.new(form_section: form_section2, permission: FormPermission::PERMISSIONS[:read])
      ],
      modules: [primero_module]
    )
  end

  let!(:role_with_actions) do
    Role.create(
      unique_id: 'role_test_02',
      name: 'name_test_02',
      description: 'description_test_02',
      group_permission: 'all',
      permissions: [
        Permission.new(
          resource: Permission::CASE,
          actions: [
            Permission::READ, Permission::WRITE, Permission::CREATE, Permission::ADD_NOTE, Permission::SERVICES_SECTION_FROM_CASE
          ]
        )
      ],
      form_permissions: [
        FormPermission.new(form_section: form_section1, permission: FormPermission::PERMISSIONS[:read_write]),
        FormPermission.new(form_section: form_section2, permission: FormPermission::PERMISSIONS[:read])
      ],
      modules: [primero_module]
    )
  end

  let(:service) { PermittedFormFieldsService.new }

  describe '#permitted_fields' do
    it 'lists all writeable fields' do
      permitted_fields = service.permitted_fields(role, 'case', true)
      expect(permitted_fields.size).to eq(11)
      expect(permitted_fields.map(&:name)).to match_array(
        %w[name age sex national_id_no consent_for_services current_address protection_concerns
           registration_date created_on family_details other_documents]
      )
    end

    it 'lists all readable fields' do
      permitted_fields = service.permitted_fields(role, 'case', false)
      expect(permitted_fields.size).to eq(14)
      expect(permitted_fields.map(&:name)).to match_array(
        %w[name age sex national_id_no consent_for_services current_address protection_concerns
           registration_date created_on separator1 other_documents family_details interview_date consent_for_referral]
      )
    end

    it 'includes action subforms when writeable' do
      permitted_fields = service.permitted_fields(role_with_actions, 'case', true)
      expect(permitted_fields.size).to eq(13)
      expect(permitted_fields.map(&:name)).to match_array(
        %w[name age sex national_id_no consent_for_services current_address protection_concerns other_documents
           registration_date created_on family_details notes_section services_section]
      )
    end

    it 'excludes action subforms when readable' do
      permitted_fields = service.permitted_fields(role_with_actions, 'case', false)
      expect(permitted_fields.size).to eq(14)
      expect(permitted_fields.map(&:name)).to_not include(:notes_section, :services_section)
    end
  end

  describe '#permitted_field_names' do
    it 'lists all writeable field names' do
      permitted_field_names = service.permitted_field_names(role, 'case', true)
      expect(permitted_field_names.size).to eq(11)
      expect(permitted_field_names).to match_array(
        %w[name age sex national_id_no consent_for_services current_address protection_concerns
           registration_date created_on family_details other_documents]
      )
    end
  end
end
