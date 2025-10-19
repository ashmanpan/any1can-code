include $(NCS_DIR)/src/ncs/build/include.mk

all:
	$(MAKE) -C src all
	cp src/yang/*.yang load-dir/

clean:
	$(MAKE) -C src clean
	rm -f load-dir/*.yang

.PHONY: all clean