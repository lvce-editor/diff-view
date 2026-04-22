import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'sample.diff-editor-rails'

export const test: Test = async ({ expect, FileSystem, Locator, Main, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(
    `${tmpDir}/posts_controller_before.rb`,
    `class PostsController < ApplicationController
  before_action :set_post

  def show
    render json: { title: @post.title }
  end

  private

  def set_post
    @post = Post.find(params[:id])
  end
end
`,
  )
  await FileSystem.writeFile(
    `${tmpDir}/posts_controller_after.rb`,
    `class PostsController < ApplicationController
  before_action :set_post, only: [:show]

  def show
    render json: { title: @post.title, published: @post.published? }, status: :ok
  end

  private

  def set_post
    @post = Post.find_by(id: params[:id])
  end
end
`,
  )
  await Workspace.setPath(tmpDir)

  await Main.openUri(`diff://${tmpDir}/posts_controller_before.rb<->${tmpDir}/posts_controller_after.rb`)

  const contentLeft = Locator('.DiffEditorContentLeft .DiffEditorRows')
  const contentRight = Locator('.DiffEditorContentRight .DiffEditorRows')

  await expect(contentLeft).toContainText('class PostsController < ApplicationController')
  await expect(contentLeft).toContainText('before_action :set_post')
  await expect(contentLeft).toContainText('render json: { title: @post.title }')
  await expect(contentRight).toContainText('before_action :set_post, only: [:show]')
  await expect(contentRight).toContainText('render json: { title: @post.title, published: @post.published? }, status: :ok')
  await expect(contentRight).toContainText('@post = Post.find_by(id: params[:id])')
}
