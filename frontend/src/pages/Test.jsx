import React from "react";
import OpenAI from "openai";
import axios from "axios";

const Test = () => {
  function parseBlogPost(text) {
    // Tách tiêu đề
    const titleMatch = text.match(/^## (.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : "";

    // Tách giới thiệu
    const introductionMatch = text.match(
      /\*\*Giới thiệu:\*\*\n([\s\S]*?)(?=\n\n\*\*\d+\.\s|\n\n\*\*Kết Luận\*\*|$)/
    );
    const introduction = introductionMatch
      ? introductionMatch[1].trim().replace(/\*\*/g, "")
      : "";

    // Tách nội dung chính
    const mainContentMatches = text.match(
      /\*\*\d+\.\s(.+?)\*\*\n([\s\S]*?)(?=\n\n\*\*\d+\.\s|$)/g
    );
    const mainContent = mainContentMatches
      ? mainContentMatches.map((section) => {
          const headingMatch = section.match(/\*\*\d+\.\s(.+?)\*\*/);
          const contentMatch = section.match(/\*\*\d+\.\s.+?\*\*\n([\s\S]*)/);
          return {
            heading: headingMatch ? headingMatch[1].trim() : "",
            content: contentMatch
              ? contentMatch[1].replace(/\*\*/g, "").trim()
              : "",
          };
        })
      : [];

    // Tách kết luận
    const conclusionMatch = text.match(/\*\*Kết luận:\*\*\n([\s\S]*)$/);
    const conclusion = conclusionMatch
      ? conclusionMatch[1].trim().replace(/\*\*/g, "")
      : "";

    return {
      title: title,
      introduction: introduction,
      mainContent: mainContent,
      conclusion: conclusion,
    };
  }

  const testApi = async () => {
    try {
      const result = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCMHrle1Rw6tWycrHVYn-AKThDZI_CZDnI",
        {
          contents: [
            {
              parts: [
                {
                  text: "Create a blog post for my fruit and vegetable store website in Vietnamese with the following detailed structure: Title: Create an engaging title for the post. Giới thiệu: Write a captivating introduction that briefly summarizes the main topic. Main Content: Develop the main content for the blog with a structure of 5-6 sections. Each section should include:Heading: Create a heading for sections related to the main topic. Content: Write a paragraph of 8-10 sentences for the content of the heading. Kết luận: Summarize the main points and emphasize why the reader should care about the topic. Call for action, such as buying organic products or changing to healthier eating habits. The blog should be written in an easy-to-understand manner, providing valuable information with high applicability for readers. Ensure that the blog is persuasive and closely connected to the topic. Main Topic: Rau cải xanh Oganic",
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(result);
      console.log(result.data.candidates[0].content.parts[0].text);
      const jsonData = parseBlogPost(
        result.data.candidates[0].content.parts[0].text
      );
      console.log(JSON.stringify(jsonData, null, 2));
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data from OpenAI API:", error);
    }
  };

  return (
    <div>
      <button onClick={testApi}>click me</button>
    </div>
  );
};

export default Test;
