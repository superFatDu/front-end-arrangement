# Network IO Model

> 本文内容涉及到Linux下五种IO模型：1.blocking IO（阻塞IO）; 2.non-blocking IO（非阻塞IO）; 3. IO multiplexing（IO复用; 4.sigal driven IO（信号驱动IO）; 5. asynchronous IO（异步IO）。

## 1. IO涉及的对象和步骤

### 1.1 IO涉及的对象

1. 调用IO者：process(or thread)

2. 系统内核：kernel

### 1.2 步骤

1. 等待数据准备（Waiting for the data to be ready）

2. 将数据从内核拷贝到进程（Copying the data from the kernel to the process）

## 2. IO Model Description

### 2.1 blocking IO

- 在Linux中，默认的情况下所有的socket都是blocking IO。

![blocking IO](./img/blocking.gif)

- 当用户进程调用了recvfrom这个系统调用，kernel就开始了IO的第一个阶段：准备数据。对于network io来说，很多时候数据在一开始还没有到达（比如，还没有收到一个完整的UDP包），这个时候kernel就要等待足够的数据到来。而在用户进程这边，整个进程会被阻塞。当kernel一直等到数据准备好了，它就会将数据从kernel中拷贝到用户内存，然后kernel返回结果，用户进程才解除block的状态，重新运行起来。

- 所以，blocking IO的特点就是在IO执行的两个阶段（wait for data and copy data)都被blocking了。

### 2.2 non-blocking IO

- 在Linux中，通过设置可以使socket变成non-blocking。

![non-blocking](./img/non-blocking.gif)

- 当用户进程发起read()操作时，如果kernel没有准备好数据，那么进程并不会blocking，kernel会返回一个信息告诉进程数据描述符缓冲区还没有准备好。然后用户进程每隔一段时间就来轮询一次，如果此时用户进程发起了system call而且数据也准备好了，那么kernel就会把数据拷贝到用户内存，然后返回。

- 所以，non-blocking就是一个不断轮询的过程。

### 2.3 IO multiplexing

- 有的地方称这种方式为事件驱动IO（event driven IO）。select/poll/epoll的好处就是单个process可以同时处理多个网络连接的IO。

![multiplexing](./img/multiplexing.gif)

#### 2.3.1 IO multiplexing-select

- 当用户进程调用了select，那么整个进程就回被block。kernel会监视所有select负责的文件描述符（socket），select采用轮询的方式扫描文件描述符，如果任何一个socket中的数据准备好了，select就会返回，这个时候用户进程再调用read()，将数据从kernel拷贝到用户内从。

- 单个进程能够监视的文件描述符的数量存在最大限制，通常是1024，当然可以更改数量，但由于select采用轮询的方式扫描文件描述符，文件描述符数量越多，性能越差。

#### 2.3.2 IO multiplexing-poll

- 和select本质上没有区别。

- poll采用的时链表储存，所以监视的文件描述符的个数没有限制。

#### 2.3.3 IO multiplexing-epoll

- epoll支持水平触发和边缘触发，最大的特点在于边缘触发，它只告诉进程哪些fd刚刚变为就绪态，并且只会通知一次。还有一个特点是，epoll使用“事件”的就绪通知方式，通过epoll_ctl注册fd，一旦该fd就绪，内核就会采用类似callback的回调机制来激活该fd，epoll_wait便可以收到通知。

- 没有最大并发连接的限制，能打开的FD的上限远大于1024（1G的内存上能监听约10万个端口）。

- 效率提升，不是轮询的方式，不会随着FD数目的增加效率下降。

- 内存拷贝，利用mmap()文件映射内存加速与内核空间的消息传递；即epoll使用mmap减少复制开销。

### 2.4 sigal driven IO

- 使用得不多。

### 2.5 ayncronous IO

- 在Linux中，使用的不多。

![asynchronous IO](./img/asynchronous.gif)