package com.example.form;

/**
 * 記事投稿用フォーム
 */
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class ArticlePostForm {

	private Integer userInfoId;
	@NotBlank
	@Size(min = 1, max = 50)
	private String title;
	@NotBlank
	private String content;
	private List<Integer> tags;

	public Integer getUserInfoId() {
		return userInfoId;
	}

	public void setUserInfoId(Integer userInfoId) {
		this.userInfoId = userInfoId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public List<Integer> getTags() {
		return tags;
	}

	public void setTags(List<Integer> tags) {
		this.tags = tags;
	}

	@Override
	public String toString() {
		return "ArticlePostForm [userInfoId=" + userInfoId + ", title=" + title + ", content=" + content + ", tags="
				+ tags + "]";
	}
}
