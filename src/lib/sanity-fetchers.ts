import { client } from '@/sanity/lib/client'
import type { Post, Project } from '@/types/sanity'

export async function getAllPosts(): Promise<Post[]> {
  return client.fetch(`*[_type == "post"] | order(publishedAt desc)`)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug })
}

export async function getAllProjects(): Promise<Project[]> {
  return client.fetch(`*[_type == "project"] | order(_createdAt desc)`)
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return client.fetch(`*[_type == "project" && slug.current == $slug][0]`, { slug })
}

export async function getFeaturedPosts(): Promise<Post[]> {
  return client.fetch(`*[_type == "post" && defined(publishedAt)] | order(publishedAt desc)[0...3]`)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return client.fetch(`*[_type == "project" && status == "completed"] | order(_createdAt desc)[0...6]`)
}