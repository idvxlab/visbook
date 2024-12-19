import React, { useState } from 'react';
import { Button, Modal, message, Spin } from 'antd';
import { RightOutlined, DownOutlined, CaretRightOutlined, DownloadOutlined, VideoCameraOutlined, FileTextOutlined, ProfileOutlined } from '@ant-design/icons';
import './index.scss';

const ChapterSection = ({ title, duration, desc, lessonCount }) => (
  <div className="chapter-info">
    <div className="chapter-count">{lessonCount}个视频</div>
    <div className="chapter-desc">{desc}</div>
    {/* <div className="chapter-duration">{duration}</div> */}
  </div>
);

const CourseSection = ({ section, isExpanded, onClickDetails }) => {
  const [loading, setLoading] = useState(false);

  const handleVideoClick = async (lesson) => {
    setLoading(true);
    try {
      // 在新标签页打开视频
      const videoPageUrl = `/video-player?url=${encodeURIComponent(lesson.videoUrl)}&title=${encodeURIComponent(lesson.title)}`;
      window.open(videoPageUrl, '_blank');
    } catch (error) {
      message.error('视频加载失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (type) => {
    const fileUrl = type === 'slides' ? section.materials?.slidesUrl : section.materials?.exerciseUrl;
    const fileName = type === 'slides' ? 'slides.pdf' : 'exercise.docx';
    
    try {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `${section.title}-${fileName}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      message.success(`${type === 'slides' ? '课件' : '习题'}下载开始`);
    } catch (error) {
      message.error('下载失败，请稍后重试');
    }
  };

  return (
    <Spin spinning={loading}>
      <div className={`course-section ${isExpanded ? 'expanded' : ''}`}>
        <div className="section-main" onClick={() => onClickDetails(section.id)}>
          <div className="section-left">
            <div className="section-title">{section.title}</div>
            <ChapterSection 
              title={section.title}
              duration={section.totalDuration}
              desc={section.description}
              lessonCount={section.lessonCount}
            />
          </div>
          <Button 
            type="link" 
            className="detail-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClickDetails(section.id);
            }}
          >
            单元详情 {isExpanded ? <DownOutlined className="icon"/> : <RightOutlined className="icon"/>}
          </Button>
        </div>
        
        {isExpanded && (
          <div className="lesson-list">
            <div className="lesson-header">
              <div className="video-icon">
              <VideoCameraOutlined />
                {/* <span>{section.lessonCount}个视频 · 总计{section.totalDuration}分钟</span> */}
                <span>{section.lessonCount}个视频</span>
              </div>
            </div>
            
            {section.lessons?.map((lesson, index) => (
              <div 
                key={index} 
                className="lesson-item"
                // onClick={() => handleVideoClick(lesson)}
              >
                <div className="lesson-title">
                  <CaretRightOutlined className="play-icon" />
                  <span>{lesson.title}</span>
                </div>
                <div className="lesson-duration">{lesson.duration}</div>
              </div>
            ))}
            
            {section.materials && (
              <div className="materials-section">
                <div className="material-buttons">
                {section.materials.slidesUrl && (
                  <Button 
                    type="text" 
                    icon={<ProfileOutlined />}
                    onClick={() => handleDownload('slides')}
                  >
                    课件下载
                  </Button>
                )}
                {section.materials.exerciseUrl && (
                  <Button 
                    type="text" 
                    icon={ <FileTextOutlined />}
                    onClick={() => handleDownload('exercise')}
                  >
                    习题下载
                  </Button>
                )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Spin>
  );
};

const CourseOutline = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const courseData = [
    {
        id: 1,
        title: "第一课 信息可视化简介",
        lessonCount: 8,
        description: "介绍信息可视化的基本概念、重要性及其应用领域。学生将了解如何利用可视化技术有效地传达复杂信息，理解可视化的基本原则和方法。",
        totalDuration: "45",
        lessons: [
          { 
            title: "什么是可视化?",
            duration: "01:59",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson1/第一讲：信息可视化简介-什么是可视化-曹楠2023.9.11.mp4`
          },
          { 
            title: "怎样学习可视化?",
            duration: "04:09",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson1/第一讲：信息可视化简介-怎样学习可视化-曹楠2023.9.11.mp4`
          },
          {
            title: "为什么要可视化?",
            duration: "11:58",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson1/第一讲：信息可视化简介-为什么要可视化-曹楠2023.9.11.mp4`
          },
          {
            title: "可视化的实践与发展趋势（1）",
            duration: "35:57",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson1/第一讲：信息可视化简介-可视化的类型与发展趋势(1)-曹楠2023.9.11.mp4`
          },
          {
            title: "可视化的实践与发展趋势（2）",
            duration: "09:17",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson1/第一讲：信息可视化简介-可视化的类型与发展趋势(2)-曹楠2023.9.11.mp4`
          },
          {
            title: "怎样对数据进行可视化?",
            duration: "20:52",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson1/第一讲：信息可视化简介-怎样对数据进行可视化-曹楠2023.9.11.mp4`
          },
          {
            title: "如何对可视化进行评估?",
            duration: "03:47",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson1/第一讲：信息可视化简介-如何对可视化进行评估-曹楠2023.9.11.mp4`
          },
          {
            title: "可视化应用案例",
            duration: "26:10",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson1/第一讲：信息可视化简介-可视化应用案例-曹楠2023.9.11.mp4`
          }
        ],
        materials: {
          slidesUrl: `${process.env.PUBLIC_URL}/materials/lesson1/slide1.pdf`,
          exerciseUrl: `${process.env.PUBLIC_URL}/materials/lesson1/exercise1.docx`
        }
      },
      {
        id: 2,
        title: "第二课 数据及数据分析基础",
        lessonCount: 7,
        description: "讲解数据分析的基本概念与方法，涵盖数据的收集、整理以及初步分析。课程还将深入探讨数据分析的方法与技术，重点讲解如何将分析结果转化为有效的可视化设计，并通过实例进行实践操作，全面提升学生的数据处理和分析能力。",
        totalDuration: "83",
        lessons: [
          { 
            title: "数据元素及元素的属性", 
            duration: "06:42",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson2/第二讲：数据及数据分析基础-数据元素及元素的属性-曹楠2023.9.13.mp4`
          },
          {
            title: "数据元素之间的差异与关联",
            duration: "19:39",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson2/第二讲：数据及数据分析基础-数据元素之间的差异与关联-曹楠2023.9.13.mp4`
          },
          {  
            title: "有监督学习与无监督学习",
            duration: "07:44",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson2/第二讲：数据及数据分析基础-有监督学习与无监督学习-曹楠2023.9.13.mp4`
          },
          {
            title: "有监督学习：回归与分类(1)",
            duration: "10:33",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson2/第二讲：数据及数据分析基础-有监督学习：回归与分类(1)-曹楠2023.9.13.mp4`
          },
          {
            title: "有监督学习：回归与分类(2)",
            duration: "16:16",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson2/第二讲：数据及数据分析基础-有监督学习：回归与分类 (2)-曹楠2023.9.13.mp4`
          },
          {
            title: "有监督学习：回归与分类(3)",
            duration: "34:31",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson2/第二讲：数据及数据分析基础-有监督学习：回归与分类(3)-曹楠2023.9.13.mp4`
          },
          {
            title: "无监督学习：聚类分析",
            duration: "23:38",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson2/第二讲：数据及数据分析基础-无监督学习：聚类分析-曹楠2023.9.13.mp4`
          }
        ],
        materials: {
          slidesUrl: `${process.env.PUBLIC_URL}/materials/lesson2/slide2.pdf`,
          exerciseUrl: `${process.env.PUBLIC_URL}/materials/lesson2/exercise2.docx`
        }
      },
      {
        id: 3,
        title: "第三课 可视化的基本设计准则",
        lessonCount: 5,
        description: "讲解信息可视化设计的基本原则，包括色彩使用、布局设计、图形选择等。学生将掌握如何通过设计准则提升可视化作品的可读性和美观度。",
        totalDuration: "83",
        lessons: [
          { 
            title: "可视化的基本设计准则", 
            duration: "07:52",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson3/第三讲：可视化的基本设计准则-可视化的基本设计准则-曹楠2023.9.18.mp4`
          },
          { 
            title: "信：设计能够正确表达信息的可视化", 
            duration: "10:08",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson3/第三讲：可视化的基本设计准则-信：设计能够正确表达信息的可视化-曹楠2023.9.18.mp4`
          },
          { 
            title: "达：设计能够高效传递信息的可视化(1)", 
            duration: "36:26",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson3/第三讲：可视化的基本设计准则-达：设计能够高效传达信息的可视化(1)-曹楠2023.9.18.mp4`
          },
          { 
            title: "达：设计能够高效传递信息的可视化(2)", 
            duration: "10:11",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson3/第三讲：可视化的基本设计准则-达：设计能够高效传达信息的可视化(2)-曹楠2023.9.18.mp4`
          },
          { 
            title: "雅：设计能够让人赏心悦目的可视化", 
            duration: "01:35",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson3/第三讲：可视化的基本设计准则-雅：设计能够让人赏心悦目的可视化-曹楠2023.9.18.mp4`
          }
        ],
        materials: {
          slidesUrl: `${process.env.PUBLIC_URL}/materials/lesson3/slide3.pdf`,
          exerciseUrl: `${process.env.PUBLIC_URL}/materials/lesson3/exercise3.docx`
        }
      },
      {
        id: 4,
        title: "第四课 交互设计及动画",
        lessonCount: 6,
        description: "讲解如何在信息可视化中融入交互设计和动画效果，学习利用交互和动态元素增强用户体验和信息传递效果。学生将进行相关的实践操作，设计具有互动性的可视化作品。",
        totalDuration: "83",
        lessons: [
          { 
            title: "常见交互类型", 
            duration: "25:13",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson4/第四讲：交互技术与动画-常见交互类型-曹楠2023.9.18.mp4`
          },
          { 
            title: "交互范式1：概览+细节", 
            duration: "02:50",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson4/第四讲：交互技术与动画-交互范式1：概览+细节-曹楠2023.9.18.mp4`
          },
          { 
            title: "交互范式2：焦点+上下文", 
            duration: "17:27",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson4/第四讲：交互技术与动画-交互范式2：焦点+上下文-曹楠2023.9.18.mp4`
          },
          { 
            title: "可视化帧中的动画", 
            duration: "02:52",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson4/第四讲：交互技术与动画-可视化帧中的动画-曹楠2023.9.18.mp4`
          },
          { 
            title: "动画的设计原则", 
            duration: "13:32",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson4/第四讲：交互技术与动画-动画的设计原则-曹楠2023.9.18.mp4`
          },
          { 
            title: "动画的实现方式", 
            duration: "11:30",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson4/第四讲：交互技术与动画-动画的实现方式-曹楠2023.9.18.mp4`
          }
        ],
        materials: {
          slidesUrl: `${process.env.PUBLIC_URL}/materials/lesson4/slide4.pdf`,
          exerciseUrl: `${process.env.PUBLIC_URL}/materials/lesson4/exercise4.docx`
        }
      },
      {
        id: 5,
        title: "第五课 树和图的可视化",
        lessonCount: 2,
        description: "讲解如何通过树形结构和图形结构有效地展示层级关系和网络关系。学生将掌握树和图的可视化技术，了解其在数据组织和展示中的优势和局限性。",
        totalDuration: "83",
        lessons: [
          { 
            title: "树的可视化", 
            duration: "13:30",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson5/第五讲：针对不同数据类型的可视化技术-树的可视化-曹楠9.20.mp4`
          },
          { 
            title: "图的可视化", 
            duration: "28:40",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson5/第五讲：针对不同数据类型的可视化技术-图的可视化-曹楠9.20.mp4`
          }
        ],
        materials: {
          slidesUrl: `${process.env.PUBLIC_URL}/materials/lesson5/slide5.pdf`,
          exerciseUrl: `${process.env.PUBLIC_URL}/materials/lesson5/exercise6.docx`
        }
      },
      {
        id: 6,
        title: "第六课 多维度数据可视化",
        lessonCount: 3,
        description: "讲解多维度数据的可视化方法和工具，学习如何在可视化中展示和处理多维度数据。学生将掌握处理复杂数据集的技巧，并进行相关的可视化实践。",
        totalDuration: "83",
        lessons: [
          { 
            title: "多维度数据的可视化(1)", 
            duration: "31:03",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson6/第五讲：针对不同数据类型的可视化技术-多维度数据的可视化(1)-曹楠9.20.mp4`
          },
          { 
            title: "多维度数据的可视化(2)", 
            duration: "08:39",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson6/第五讲：针对不同数据类型的可视化技术-多维度数据的可视化(2)-曹楠9.20.mp4`
          },
          { 
            title: "多维度数据的可视化(3)", 
            duration: "17:30",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson6/第五讲：针对不同数据类型的可视化技术-多维度数据的可视化(3)-曹楠9.20.mp4`
          }
        ],
        materials: {
          slidesUrl: `${process.env.PUBLIC_URL}/materials/lesson6/slide6.pdf`,
          exerciseUrl: `${process.env.PUBLIC_URL}/materials/lesson6/exercise5.docx`
        }
      },
      {
        id: 7,
        title: "第七课 可视化叙事",
        lessonCount: 3,
        description: "讲解如何通过可视化技术进行有效的叙事。学生将学习叙事的基本结构、故事线的构建以及如何通过视觉元素传达故事内容。",
        totalDuration: "83",
        lessons: [
          { 
            title: "为什么用数据来讲故事", 
            duration: "15:27",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson7/第六讲：可视化叙事-为什么用数据来讲故事-石洋9.25.mp4`
          },
          { 
            title: "什么是数据故事", 
            duration: "33:55",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson7/第六讲：可视化叙事-什么是数据故事-石洋9.25.mp4`
          },
          { 
            title: "数据：数据故事的基础", 
            duration: "12:51",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson7/第六讲：可视化叙事-数据：数据故事的基础-石洋9.25.mp4`
          }
        ],
        materials: {
          slidesUrl: `${process.env.PUBLIC_URL}/materials/lesson7/slide7.pdf`,
          exerciseUrl: ""
        }
      },
      {
        id: 8,
        title: "第八课 可视化叙事中的叙事结构",
        lessonCount: 3,
        description: "讲解可视化叙事的结构，包括时间线、因果关系等，帮助学生理解如何构建清晰的叙事逻辑，并在设计中有效应用这些结构。",
        totalDuration: "83",
        lessons: [
          { 
            title: "可视化叙事-叙事：数据故事的结构(1)", 
            duration: "08:13",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson8/第六讲：可视化叙事-叙事：数据故事的结构(1)-石洋9.25.mp4`
          },
          { 
            title: "可视化叙事-叙事：数据故事的结构(2)", 
            duration: "17:31",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson8/第六讲：可视化叙事-叙事：数据故事的结构(2)-石洋9.25.mp4`
          },
          { 
            title: "可视化叙事-叙事：数据故事的结构(3)", 
            duration: "22:48",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson8/第六讲：可视化叙事-叙事：数据故事的结构(3)-石洋9.25.mp4`
          }
        ],
        materials: {
          slidesUrl: `${process.env.PUBLIC_URL}/materials/lesson8/slide8.pdf`,
          exerciseUrl: ""
        }
      },
      {
        id: 9,
        title: "第九课 可视化叙事中的动画与交互",
        lessonCount: 5,
        description: "讲解如何结合动画和交互设计强化可视化叙事的效果。学生将掌握在动态展示中保持叙事连续性的方法，并进行相关的设计实践。",
        totalDuration: "83",
        lessons: [
          { 
            title: "动画以及数据视频中的动画", 
            duration: "03:22",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson9/第七讲：可视化叙事中的动画与交互-动画以及数据视频中的动画-石洋2023.9.27.mp4`
          },
          { 
            title: "经典案例赏析", 
            duration: "13:39",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson9/第七讲：可视化叙事中的动画与交互-经典案例赏析-石洋2023.9.27.mp4`
          },
          { 
            title: "动画叙事的设计空间", 
            duration: "29:34",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson9/第七讲：可视化叙事中的动画与交互-动画叙事的设计空间-石洋2023.9.27.mp4`
          },
          { 
            title: "数据视频浏览工具", 
            duration: "01:32",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson9/第七讲：可视化叙事中的动画与交互-数据视频浏览工具-石洋2023.9.27.mp4`
          },
          { 
            title: "打破第四面墙的交互技术", 
            duration: "22:41",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson9/第七讲：可视化叙事中的动画与交互-打破第四面墙的交互技术-石洋2023.9.27.mp4`
          }
        ],
        materials: {
          slidesUrl: `${process.env.PUBLIC_URL}/materials/lesson9/slide9.pdf`,
          exerciseUrl: ""
        }
      },
      {
        id: 10,
        title: "第十课 可视化的评估方法",
        lessonCount: 3,
        description: "讲解如何评估和验证可视化作品的有效性，包括用户测试、定量和定性分析方法。学生将学习如何收集和分析反馈，改进可视化设计的质量。",
        totalDuration: "83",
        lessons: [
          { 
            title: "可视化设计的评估方法", 
            duration: "03:20",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson10/第八讲：可视化的评估方法-可视化设计的评估方法-石洋2023.9.27.mp4`
          },
          { 
            title: "受控用户调研", 
            duration: "28:29",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson10/第八讲：可视化的评估方法-受控用户调研-石洋2023.9.27.mp4`
          },
          { 
            title: "工作坊", 
            duration: "16:08",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson10/第八讲：可视化的评估方法-工作坊-石洋2023.9.27.mp4`
          }
        ],
        materials: {
          slidesUrl: `${process.env.PUBLIC_URL}/materials/lesson10/slide10.pdf`,
          exerciseUrl: `${process.env.PUBLIC_URL}/materials/lesson10/exercise10.docx`
        }
      },
      {
        id: 11,
        title: "第十一课 文本数据可视化",
        lessonCount: 7,
        description: "讲解如何将文本数据转化为可视化图形，介绍文本分析的基本方法和可视化工具。学生将学习如何通过文本数据的可视化，揭示数据中的模式和趋势。",
        totalDuration: "83",
        lessons: [
          { 
            title: "什么是文本数据", 
            duration: "03:00",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson11/第九讲：文本数据可视化-什么是文本数据-陈晴2023.10.9.mp4`
          },
          { 
            title: "为什么要对文本数据可视化", 
            duration: "03:42",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson11/第九讲：文本数据可视化-为什么要对文本数据可视化-陈晴2023.10.9.mp4`
          },
          { 
            title: "文本数据分析技术", 
            duration: "13:47",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson11/第九讲：文本数据可视化-文本数据分析技术-陈晴2023.10.9.mp4`
          },
          { 
            title: "文本数据可视化技术(1)", 
            duration: "17:24",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson11/第九讲：文本数据可视化-文本数据可视化技术(1)-陈晴2023.10.9.mp4`
          },
          { 
            title: "文本数据可视化技术(2)", 
            duration: "28:40",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson11/第九讲：文本数据可视化-文本数据可视化技术(2)-陈晴2023.10.9.mp4`
          },
          { 
            title: "文本数据可视化技术(3)", 
            duration: "26:03",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson11/第九讲：文本数据可视化-文本数据可视化技术(3)-陈晴2023.10.9.mp4`
          },
          { 
            title: "文本数据可视分析案例", 
            duration: "10:50",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson11/第九讲：文本数据可视化-文本数据可视分析案例-陈晴2023.10.9.mp4`
          }
        ],
        materials: {
          slidesUrl: `${process.env.PUBLIC_URL}/materials/lesson11/slide11.pdf`,
          exerciseUrl: `${process.env.PUBLIC_URL}/materials/lesson11/exercise8.docx`
        }
      },
      {
        id: 12,
        title: "第十二课 地理信息数据可视化",
        lessonCount: 7,
        description: "讲解地理信息数据的可视化技术，学习如何利用地图和空间数据展示地理信息。学生将进行相关的实践操作，设计具有地理信息的可视化作品。",
        totalDuration: "83",
        lessons: [
          { 
            title: "什么是地理数据", 
            duration: "02:47",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson12/第十讲：地理数据可视化-什么是地理数据-陈晴2023.10.11.mp4`
          },
          { 
            title: "地图投影", 
            duration: "10:08",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson12/第十讲：地理数据可视化-地图投影-陈晴2023.10.11.mp4`
          },
          { 
            title: "点数据可视化", 
            duration: "07:15",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson12/第十讲：地理数据可视化-点数据可视化-陈晴2023.10.11.mp4`
          },
          { 
            title: "线数据可视化", 
            duration: "06:04",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson12/第十讲：地理数据可视化-线数据可视化-陈晴2023.10.11.mp4`
          },
          { 
            title: "区域数据可视化", 
            duration: "09:25",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson12/第十讲：地理数据可视化-区域数据可视化-陈晴2023.10.11.mp4`
          },
          { 
            title: "地理数据集", 
            duration: "00:46",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson12/第十讲：地理数据可视化-地理数据集-陈晴2023.10.11.mp4`
          },
          { 
            title: "地理数据可视化案例", 
            duration: "12:43",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson12/第十讲：地理数据可视化-地理数据可视化案例-陈晴2023.10.11.mp4`
          }
        ],
        materials: {
          slidesUrl: `${process.env.PUBLIC_URL}/materials/lesson12/slide12.pdf`,
          exerciseUrl: `${process.env.PUBLIC_URL}/materials/lesson12/exercise9.docx`
        }
      },
      {
        id: 13,
        title: "第十三课 时间序列数据可视化",
        lessonCount: 5,
        description: "讲解如何可视化时间序列数据，理解时间维度在数据展示中的作用。学生将掌握时间序列数据的展示技术，并进行相关的设计实践。",
        totalDuration: "83",
        lessons: [
          { 
            title: "什么是时序数据", 
            duration: "02:02",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson13/第十一讲：时序数据可视化-什么是时序数据-陈晴2023.10.11.mp4`
          },
          { 
            title: "时序数据可视化", 
            duration: "09:37",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson13/第十一讲：时序数据可视化-时序数据可视化-陈晴2023.10.11.mp4`
          },
          { 
            title: "多变量时序数据可视化", 
            duration: "06:01",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson13/第十一讲：时序数据可视化-多变量时序数据可视化-陈晴2023.10.11.mp4`
          },
          { 
            title: "流数据可视化", 
            duration: "04:51",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson13/第十一讲：时序数据可视化-流数据可视化-陈晴2023.10.11.mp4`
          },
          { 
            title: "时空数据可视化", 
            duration: "06:18",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson13/第十一讲：时序数据可视化-时空数据可视化-陈晴2023.10.11.mp4`
          }
        ],
        materials: {
          slidesUrl: `${process.env.PUBLIC_URL}/materials/lesson13/slide13.pdf`,
          exerciseUrl: `${process.env.PUBLIC_URL}/materials/lesson13/exercise10.docx`
        }
      },
      {
        id: 14,
        title: "第十四课 可视化与人文艺术",
        lessonCount: 2,
        description: "讲解可视化在艺术和人文领域的应用，学习如何通过视觉表现来传达复杂的文化和艺术信息。学生将结合实际案例进行创意设计实践。",
        totalDuration: "83",
        lessons: [
          { 
            title: "实物可视化", 
            duration: "09:30:",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson14/第十二讲：可视化艺术与人文-实物可视化-陈晴2023.10.11.mp4`
          },
          { 
            title: "可视化艺术与人文案例", 
            duration: "17.10:",
            videoUrl: `${process.env.PUBLIC_URL}/videos/lesson14/第十二讲：可视化艺术与人文-可视化艺术与人文案例-陈晴2023.10.11.mp4`
          }
        ],
        materials: {
          slidesUrl: "",
          exerciseUrl: ""
        }
      }
  ];

  const handleDetailClick = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="course-outline">
      {courseData.map(section => (
        <div 
        key={section.id} 
        className={`course-section ${expandedSection === section.id ? 'expanded' : ''}`}
      >
        <CourseSection 
          key={section.id}
          section={section}
          isExpanded={expandedSection === section.id}
          onClickDetails={handleDetailClick}
        />
        </div>
      ))}
    </div>
  );
};

export default CourseOutline; 
 