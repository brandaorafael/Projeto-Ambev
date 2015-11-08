CREATE DATABASE `hack-ambev` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
CREATE TABLE `pedidos` (
  `order_id` int(11) NOT NULL,
  `bar_id` int(11) NOT NULL,
  `mesa_id` int(11) NOT NULL,
  `produto_id` int(11) NOT NULL,
  `hora_pedido` datetime NOT NULL,
  `quantidade` int(11) NOT NULL,
  `entregue` int(11) NOT NULL,
  `nome_produto` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;