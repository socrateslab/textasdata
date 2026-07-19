这是一份对全篇进行润色和标准化排版后的版本，重点优化了数学符号（全部升级为标准的 $\LaTeX$ 学术排版），并将一些不自然的直译调整为更符合中文社会科学及计算语言学表达习惯的学术用语（例如将 nuisance 参数润色为“**干扰参数/琐碎参数**”，将 in sample/out of sample 润色为更严谨的“**样本内/样本外**”）。

---

# Preface | 前言

在过去的十年里，文本作为数据（text as data）的方法在社会科学、数字人文和工业界中迅速流行开来。海量的数据、崭新的方法，以及不断下降的计算成本共同作用，使得发掘文档中蕴含的宝贵信息变得越来越可行。这些指向更多数据、更优方法和更快计算机的趋势只会愈演愈烈。然而，这些工具必须经过调整，才能在社会科学中做出有效的推断（inferences）。本书正是关于如何利用这些进展，对当下及未来的人类行为做出科学推断的一本指南。

## Prerequisites and Notation | 基础准备与符号体系

读者的技术背景和研究兴趣各不相同。为了面向尽可能广泛的读者群体，我们仅假设读者熟悉线性回归（linear regression）。为了凸显那些表面上差异极大的技术之间的共性，我们尽可能遵循一套统一的符号体系，其概要见下列清单。

## List of Notation | 符号清单

* $N$：文档的总数
* $i$：文档的索引
* $M$：一篇文档中词元（token）的数量
* $m$：文档中词元的索引
* $J$：特征（feature）的总数
* $j$：特征的索引
* $K$：成分（component）的总数
* $k$：成分的索引
* $D_i$：文档 $i$ 的一种抽象表征，包括其文本、格式，或任何感兴趣的其他信息
* $\mathbf{W}$：$N \times J$ 的“文档—特征矩阵”（document-feature matrix）
* $\mathbf{W}_{i,\cdot}$：文档—特征矩阵中，文档 $i$ 所在的行
* $\mathbf{W}_{\cdot,j}$：文档—特征矩阵的第 $j$ 列
* $W_{ij}$：矩阵 $\mathbf{W}$ 中第 $i$ 行、第 $j$ 列的单元格
* $Z$：词元层面（token-level）对潜在变量（latent variable）的指派
* $\boldsymbol{\pi}$：$N \times K$ 矩阵，描述文档在潜在变量上的权重/载荷（weight/loading）
* $\pi_{ik}$：文档 $i$ 在特征 $k$ 上的权重/载荷
* $\mu$：估计出的中心、因子（factor），或其他集中趋势的度量
* $g$：一个映射函数，将文本空间映射到表征空间（通常是一个长度为 $K$ 的向量）。若文本为结果变量，则记为 $y_i$；若文本为处理/干预变量，则记为 $t_i$
* $y_i$：目标标签（label）/ 维度 / 类别
* $\mathbf{X}$：$N \times P$ 的矩阵，包含非文本元数据（metadata）与一般协变量（covariates）
* $\mathbf{X}_i$：文档 $i$ 的一般协变量向量，维度为 $P$（此处省略逗号，因为我们从不单独引用 $\mathbf{X}$ 的列）
* $\hat{y}_i$：$y_i$ 的预测值或拟合值
* $\beta$：后续分析中的回归系数
* $\lambda$：正则化（regularization）参数或率（rate）参数，视具体语境而定
* $\sigma^2$：方差
* $p(\cdot)$：一个未具体指明的通用概率分布
* $\phi$：所有其他干扰参数 / 琐碎参数（nuisance parameters）
* $\mathcal{I}$：样本内（in-sample / 训练集）文档的索引
* $\mathcal{O}$：样本外（out-of-sample / 测试集）文档的索引

## Uses for This Book | 本书的用途

这主要是一本关于研究设计（research design）、以及在将文本作为数据加以利用时需要考虑哪些因素的书。我们设想了三种广泛的用途：

* **教学课程（In a Course）**：我们在自己的高阶本科与研究生课程中使用过本书的早期草稿。这些学生中的许多人此前很少接触机器学习方法或计算技术。对于这些读者，我们的书既提供了使用文本作为数据之技术的入门，也展现了如何应用这些技术做出社会科学推断。这样一门课程天然地可以按照我们的研究脉络来组织：表征、发现、测量与推断。在每一部分中，我们仅用少数几个示例方法加以说明，但我们预期授课教师会根据自选的编程语言，用更深入的方法细节或最新的软件实现来补充本书。
* **统一认识文本数据的能力（A Unifying View of What Text as Data Can Do）**：一些读者可能通过他们自己的工作或阅读相关文献，对部分“文本作为数据”的技术已经有所了解。我们的书概述了文本数据方法能够应对的诸多任务，并为介入这一令人兴奋的领域提供了起点。对于那些只想探究单一任务的读者，我们建议阅读第 2 章以了解我们的核心世界观，并阅读每一部分的引言，以把握各个具体任务内部各章是如何有机组合在一起的。
* **研究原则的宣言（Statement of Research Principles）**：也许最为重要的是，我们将本书视为关于机器学习方法在社会科学中之运用的一份宣言。对于熟悉机器学习和文本数据方法的研究者，本书提供了一种关于如何组织社会科学任务、以及如何评估这些任务的独特视角。即便是在机器学习方面背景深厚的研究者，在思考如何将这些工具与研究设计相整合时，也可能发现新的最佳实践。我们关于研究设计的多数思考集中在第 2 章以及关于原则的若干章节（第 3、10、15 和 22 章）中。

## What This Book Is Not | 本书不包含什么

文本作为数据是一个快速变化的领域，其前沿技术很容易在六个月之内就发生更迭。因此，**本书关注的是如何使用文本来回答基于社会数据的问题的研究设计，而非最新方法的技术细节或其具体的软件代码实现。** 我们理解，这可能会让那些渴望获得“立即运行的代码块”或想深入探究某一特定技术之数学特性的读者感到沮丧。

对于那些寻求深度覆盖额外技术材料的教科书，我们推荐阅读 Murphy (2021) 与 Bishop (2006)[^1] 以了解机器学习；阅读 Eisenstein (2019)[^2]、Aggarwal (2018)[^3] 与 Jursfsky and Martin (2009)[^4] 以了解自然语言处理（NLP）及基于文本的机器学习；以及阅读 Silge and Robinson (2017)[^5] 以了解基于 R 语言的文本挖掘。

---

## References | 参考文献

[^1]: Bishop, Christopher. 2006. Pattern Recognition and Machine Learning. Springer.
[^2]: Eisenstein, Jacob. 2019. Introduction to Natural Language Processing. MIT press.
[^3]: Aggarwal, Charu C. 2018. Machine Learning for Text. Springer.
[^4]: Jursfsky, Dan and James Martin. 2009. Speech and Natural Language Processing: An Introduction to Natural Language Processing, Computational Linguistics, and Speech Recognition. Upper Saddle River: Prentice Hall.
[^5]: Silge, Julia and David Robinson. 2017. Text Mining with R: A Tidy Approach. O’Reilly Media, Inc.
