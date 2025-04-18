"""empty message

Revision ID: 52ea47f0f2c0
Revises: ad724d271ffc
Create Date: 2025-03-31 02:40:56.603830

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '52ea47f0f2c0'
down_revision = 'ad724d271ffc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('characters',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('height', sa.String(), nullable=True),
    sa.Column('mass', sa.String(), nullable=True),
    sa.Column('hair_color', sa.String(), nullable=True),
    sa.Column('skin_color', sa.String(), nullable=True),
    sa.Column('eye_color', sa.String(), nullable=True),
    sa.Column('birth_year', sa.String(), nullable=True),
    sa.Column('gender', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('planets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('diameter', sa.String(), nullable=True),
    sa.Column('rotation_period', sa.String(), nullable=True),
    sa.Column('orbital_period', sa.String(), nullable=True),
    sa.Column('gravity', sa.String(), nullable=True),
    sa.Column('population', sa.String(), nullable=True),
    sa.Column('climate', sa.String(), nullable=True),
    sa.Column('terrain', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('favorites_characters',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('character_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['character_id'], ['characters.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('favorites_planets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('planet_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['planet_id'], ['planets.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('favorites_characters', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('favorites_planets', sa.String(), nullable=True))
        batch_op.drop_column('phone')
        batch_op.drop_column('first_name')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('first_name', sa.VARCHAR(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('phone', sa.VARCHAR(), autoincrement=False, nullable=True))
        batch_op.drop_column('favorites_planets')
        batch_op.drop_column('favorites_characters')
        batch_op.drop_column('username')

    op.drop_table('favorites_planets')
    op.drop_table('favorites_characters')
    op.drop_table('planets')
    op.drop_table('characters')
    # ### end Alembic commands ###
