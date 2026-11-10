"""upgrade_schema_v2_brand_kits_versions_audio

Revision ID: d68f9afdc554
Revises: 55faec6446b4
Create Date: 2026-11-10 10:11:57.893400

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'd68f9afdc554'
down_revision: Union[str, Sequence[str], None] = '55faec6446b4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema to Version 2 with brand kits, templates, versioning, and audio."""
    # 1. Create brand_kits table
    op.create_table(
        'brand_kits',
        sa.Column('id', sa.String(length=64), nullable=False),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('client_name', sa.String(length=255), nullable=False),
        sa.Column('user_id', sa.String(length=64), nullable=True),
        sa.Column('colors', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column('typography', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column('logo_asset_id', sa.String(length=64), nullable=True),
        sa.Column('tone_of_voice', sa.String(length=128), nullable=True),
        sa.Column('rules_guidelines', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_brand_kits_id'), 'brand_kits', ['id'], unique=False)
    op.create_index(op.f('ix_brand_kits_user_id'), 'brand_kits', ['user_id'], unique=False)

    # 2. Create scene_templates table
    op.create_table(
        'scene_templates',
        sa.Column('id', sa.String(length=64), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('category', sa.String(length=64), nullable=False),
        sa.Column('default_duration', sa.Integer(), nullable=False),
        sa.Column('composition_dsl', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column('preview_video_url', sa.String(length=512), nullable=True),
        sa.Column('is_system_preset', sa.Boolean(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_scene_templates_category'), 'scene_templates', ['category'], unique=False)
    op.create_index(op.f('ix_scene_templates_id'), 'scene_templates', ['id'], unique=False)

    # 3. Create audio_tracks table
    op.create_table(
        'audio_tracks',
        sa.Column('id', sa.String(length=64), nullable=False),
        sa.Column('project_id', sa.String(length=64), nullable=False),
        sa.Column('track_type', sa.String(length=32), nullable=False),
        sa.Column('file_path', sa.String(length=512), nullable=True),
        sa.Column('volume', sa.Float(), nullable=False, server_default='1.0'),
        sa.Column('start_time_seconds', sa.Float(), nullable=False, server_default='0.0'),
        sa.Column('duration_seconds', sa.Float(), nullable=False, server_default='30.0'),
        sa.Column('beat_markers', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column('ducking_config', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(['project_id'], ['projects.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_audio_tracks_id'), 'audio_tracks', ['id'], unique=False)
    op.create_index(op.f('ix_audio_tracks_project_id'), 'audio_tracks', ['project_id'], unique=False)

    # 4. Create asset_versions table
    op.create_table(
        'asset_versions',
        sa.Column('id', sa.String(length=64), nullable=False),
        sa.Column('asset_id', sa.String(length=64), nullable=False),
        sa.Column('version_number', sa.Integer(), nullable=False),
        sa.Column('file_path', sa.String(length=512), nullable=False),
        sa.Column('change_description', sa.String(length=255), nullable=True),
        sa.Column('is_transparent', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('generation_parameters', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column('file_size_bytes', sa.BigInteger(), nullable=False, server_default='0'),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(['asset_id'], ['assets.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_asset_versions_asset_id'), 'asset_versions', ['asset_id'], unique=False)
    op.create_index(op.f('ix_asset_versions_id'), 'asset_versions', ['id'], unique=False)

    # 5. Create scene_versions table
    op.create_table(
        'scene_versions',
        sa.Column('id', sa.String(length=64), nullable=False),
        sa.Column('scene_id', sa.String(length=64), nullable=False),
        sa.Column('version_number', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('visual_prompt', sa.Text(), nullable=True),
        sa.Column('voiceover', sa.Text(), nullable=True),
        sa.Column('camera_movement', sa.String(length=128), nullable=True),
        sa.Column('layers_snapshot', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column('tracks_snapshot', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column('created_by_role', sa.String(length=32), nullable=False, server_default='ai_llm'),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(['scene_id'], ['scenes.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_scene_versions_id'), 'scene_versions', ['id'], unique=False)
    op.create_index(op.f('ix_scene_versions_scene_id'), 'scene_versions', ['scene_id'], unique=False)

    # 6. Alter projects table
    op.add_column('projects', sa.Column('user_id', sa.String(length=64), nullable=True))
    op.add_column('projects', sa.Column('brand_kit_id', sa.String(length=64), nullable=True))
    op.add_column('projects', sa.Column('bgm_mood', sa.String(length=64), nullable=True, server_default='Cinematic Epic'))
    op.add_column('projects', sa.Column('sound_mode', sa.String(length=32), nullable=True, server_default='full'))
    op.add_column('projects', sa.Column('target_resolution', sa.String(length=32), nullable=True, server_default='4K UHD'))
    op.create_index(op.f('ix_projects_brand_kit_id'), 'projects', ['brand_kit_id'], unique=False)
    op.create_index(op.f('ix_projects_user_id'), 'projects', ['user_id'], unique=False)
    op.create_index('ix_projects_created_at_desc', 'projects', [sa.text('created_at DESC')])
    op.create_foreign_key(
        'fk_projects_brand_kit_id_brand_kits',
        'projects',
        'brand_kits',
        ['brand_kit_id'],
        ['id'],
        ondelete='SET NULL'
    )

    # 7. Alter scenes table
    op.add_column('scenes', sa.Column('scene_template_id', sa.String(length=64), nullable=True))
    op.add_column('scenes', sa.Column('voiceover_text', sa.Text(), nullable=True))
    op.add_column('scenes', sa.Column('camera_3d_params', postgresql.JSONB(astext_type=sa.Text()), nullable=True))
    op.add_column('scenes', sa.Column('lighting_rig', postgresql.JSONB(astext_type=sa.Text()), nullable=True))
    op.create_index(op.f('ix_scenes_scene_template_id'), 'scenes', ['scene_template_id'], unique=False)
    op.create_foreign_key(
        'fk_scenes_scene_template_id_scene_templates',
        'scenes',
        'scene_templates',
        ['scene_template_id'],
        ['id'],
        ondelete='SET NULL'
    )
    op.create_unique_constraint('uq_scenes_project_scene_number', 'scenes', ['project_id', 'scene_number'])

    # 8. Alter assets table
    op.add_column('assets', sa.Column('current_version_id', sa.String(length=64), nullable=True))
    op.add_column('assets', sa.Column('storage_type', sa.String(length=32), nullable=False, server_default='local'))
    op.add_column('assets', sa.Column('width', sa.Integer(), nullable=True))
    op.add_column('assets', sa.Column('height', sa.Integer(), nullable=True))
    op.add_column('assets', sa.Column('file_size_bytes', sa.BigInteger(), nullable=False, server_default='0'))

    # 9. Alter workflow_stages table
    op.add_column('workflow_stages', sa.Column('temporal_workflow_id', sa.String(length=128), nullable=True))
    op.add_column('workflow_stages', sa.Column('temporal_run_id', sa.String(length=128), nullable=True))
    op.add_column('workflow_stages', sa.Column('retry_count', sa.Integer(), nullable=False, server_default='0'))
    op.add_column('workflow_stages', sa.Column('stage_outputs', postgresql.JSONB(astext_type=sa.Text()), nullable=True))
    op.add_column('workflow_stages', sa.Column('error_details', postgresql.JSONB(astext_type=sa.Text()), nullable=True))

    # 10. Alter execution_logs table
    op.add_column('execution_logs', sa.Column('level', sa.String(length=16), nullable=False, server_default='INFO'))
    op.add_column('execution_logs', sa.Column('source', sa.String(length=64), nullable=True))
    op.add_column('execution_logs', sa.Column('duration_ms', sa.Integer(), nullable=True))

    # 11. Alter render_jobs table
    op.add_column('render_jobs', sa.Column('hardware_acceleration', sa.String(length=32), nullable=False, server_default='nvenc'))
    op.add_column('render_jobs', sa.Column('bitrate_kbps', sa.Integer(), nullable=False, server_default='50000'))
    op.add_column('render_jobs', sa.Column('color_space', sa.String(length=32), nullable=False, server_default='Rec.709'))
    op.add_column('render_jobs', sa.Column('audio_bitrate', sa.String(length=32), nullable=False, server_default='320k'))
    op.add_column('render_jobs', sa.Column('error_message', sa.Text(), nullable=True))
    op.create_index('ix_render_jobs_project_status', 'render_jobs', ['project_id', 'status'])
    op.create_index('ix_approvals_project_status', 'approvals', ['project_id', 'status'])


def downgrade() -> None:
    """Downgrade schema to Version 1."""
    op.drop_index('ix_approvals_project_status', table_name='approvals')
    op.drop_index('ix_render_jobs_project_status', table_name='render_jobs')
    op.drop_column('render_jobs', 'error_message')
    op.drop_column('render_jobs', 'audio_bitrate')
    op.drop_column('render_jobs', 'color_space')
    op.drop_column('render_jobs', 'bitrate_kbps')
    op.drop_column('render_jobs', 'hardware_acceleration')

    op.drop_column('execution_logs', 'duration_ms')
    op.drop_column('execution_logs', 'source')
    op.drop_column('execution_logs', 'level')

    op.drop_column('workflow_stages', 'error_details')
    op.drop_column('workflow_stages', 'stage_outputs')
    op.drop_column('workflow_stages', 'retry_count')
    op.drop_column('workflow_stages', 'temporal_run_id')
    op.drop_column('workflow_stages', 'temporal_workflow_id')

    op.drop_column('assets', 'file_size_bytes')
    op.drop_column('assets', 'height')
    op.drop_column('assets', 'width')
    op.drop_column('assets', 'storage_type')
    op.drop_column('assets', 'current_version_id')

    op.drop_constraint('fk_scenes_scene_template_id_scene_templates', 'scenes', type_='foreignkey')
    op.drop_constraint('uq_scenes_project_scene_number', 'scenes', type_='unique')
    op.drop_index(op.f('ix_scenes_scene_template_id'), table_name='scenes')
    op.drop_column('scenes', 'lighting_rig')
    op.drop_column('scenes', 'camera_3d_params')
    op.drop_column('scenes', 'voiceover_text')
    op.drop_column('scenes', 'scene_template_id')

    op.drop_constraint('fk_projects_brand_kit_id_brand_kits', 'projects', type_='foreignkey')
    op.drop_index('ix_projects_created_at_desc', table_name='projects')
    op.drop_index(op.f('ix_projects_user_id'), table_name='projects')
    op.drop_index(op.f('ix_projects_brand_kit_id'), table_name='projects')
    op.drop_column('projects', 'target_resolution')
    op.drop_column('projects', 'sound_mode')
    op.drop_column('projects', 'bgm_mood')
    op.drop_column('projects', 'brand_kit_id')
    op.drop_column('projects', 'user_id')

    op.drop_index(op.f('ix_scene_versions_scene_id'), table_name='scene_versions')
    op.drop_index(op.f('ix_scene_versions_id'), table_name='scene_versions')
    op.drop_table('scene_versions')

    op.drop_index(op.f('ix_asset_versions_id'), table_name='asset_versions')
    op.drop_index(op.f('ix_asset_versions_asset_id'), table_name='asset_versions')
    op.drop_table('asset_versions')

    op.drop_index(op.f('ix_audio_tracks_project_id'), table_name='audio_tracks')
    op.drop_index(op.f('ix_audio_tracks_id'), table_name='audio_tracks')
    op.drop_table('audio_tracks')

    op.drop_index(op.f('ix_scene_templates_id'), table_name='scene_templates')
    op.drop_index(op.f('ix_scene_templates_category'), table_name='scene_templates')
    op.drop_table('scene_templates')

    op.drop_index(op.f('ix_brand_kits_user_id'), table_name='brand_kits')
    op.drop_index(op.f('ix_brand_kits_id'), table_name='brand_kits')
    op.drop_table('brand_kits')
